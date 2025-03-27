import { probabilityMatrix, probabilityMatrixWithStarcatch } from "./data.js";
import { multiply } from "./util.js";

//계산 후 [성공비율, 실패비율]로 리턴하는 함수; 입력 조건은 체크하지 않음
export const calc = (startStar, endStar, isStarcatch, isPreventDestroy1516, isPreventDestroy1617) => {
    //15성부터 파괴 확률이 있고, 그 밑으로 하락하지 않으므로 시작을 최소 15로 조정
    startStar = Math.max(15, startStar);

    //즉시 종료 조건 (성공확률 100%)
    /* 시작과 끝이 같을 때
     * 끝이 15 이하일때
     * 15->16 파방 키고 끝이 16 이하일 때
     * 15->16, 16->17 파방 키고 끝이 17 이하일 때
     */
    if ((startStar === endStar)
        || (endStar <= 15)
        || (isPreventDestroy1516 === true && endStar <= 16)
        || (isPreventDestroy1516 === true && isPreventDestroy1617 === true && endStar <= 17)) {
        return [100, 0];
    }

    //16성 이하에서 종료 시 1617 파방 비활성화; 15성 이하는 위에서 리턴해서 여기까지 못옴
    if (endStar <= 16 && isPreventDestroy1617 === true) {
        isPreventDestroy1617 = false;
    }

    //스타캐치 여부에 따른 확률 테이블 가져오기
    let originMatrix = isStarcatch ? probabilityMatrixWithStarcatch : probabilityMatrix;
    let matrix = new Map();

    //파괴 행
    matrix.set(-1, new Map()).get(-1).set(-1, 1.0);

    if (startStar < 20) { //시작이 20성 미만일 경우, 15부터 가져오고 파방 적용
        //나머지행; 일단 그대로 가져옴
        for (let i = 15; i < endStar; i++) {
            matrix.set(i, new Map(originMatrix.get(i).entries()));
        }

        //1516 파방
        if (isPreventDestroy1516 === true) {
            matrix.get(15).set(15, matrix.get(15).get(15) + matrix.get(15).get(-1));
            matrix.get(15).delete(-1);
        }

        //1617 파방
        if (isPreventDestroy1617 === true) {
            matrix.get(16).set(15, matrix.get(16).get(15) + matrix.get(16).get(-1));
            matrix.get(16).delete(-1);
        }
    }
    else { //시작이 20성 이상일 경우, 20성부터 가져옴; 20성 밑은 없으므로 파방도 적용 x
        for (let i = 20; i < endStar; i++) {
            matrix.set(i, new Map(originMatrix.get(i).entries()));
        }
    }

    //종료행
    matrix.set(endStar, new Map()).get(endStar).set(endStar, 1.0);

    //찬스타임; 찬스타임이 적용 가능한 상태들에 대해, 1번 하락 상태, 2번 하락 상태를 새롭게 전이행렬에 추가 후 원래 상태를 변경; 인덱스는 1번 하락 상태는 100, 2번 하락 상태는 200을 더한 것으로 함
    //각 i에 대해, [i-1 => 1{i-2} => 2{i-3} => i-2] 경로의 상태를 추가 및 원래 상태 변경
    for (let i = endStar; i >= 23; i--) { //20성 위의 찬스타임; i가 21, 22일 경우 위 경로 불가 (20 밑으로 하락하지 않음)
        //원래 행; 실패 시 대신 1번 하락 상태로 감 (i-1 => 1{i-2})
        matrix.get(i - 1).set(100 + i - 2, matrix.get(i - 1).get(i - 2));
        matrix.get(i - 1).delete(i - 2);

        //1번 하락 행; 실패 시 대신 2번 하락 상태로 감 (1{i-2} => 2{i-3})
        matrix.set(100 + i - 2, new Map(matrix.get(i - 2).entries()));
        matrix.get(100 + i - 2).set(200 + i - 3, matrix.get(i - 2).get(i - 3));
        matrix.get(100 + i - 2).delete(i - 3);

        //2번 하락 행; 무조건 성공 (2{i-3} => i-2)
        matrix.set(200 + i - 3, new Map());
        matrix.get(200 + i - 3).set(i - 2, 1.0)
    }

    if (startStar < 20) { //시작이 20성 미만일 경우에만, 20성 밑의 찬스타임 고려
        for (let i = Math.min(20, endStar); i >= 18; i--) { //15 밑으로 하락하지 않으므로 i는 18 이상
            //원래 행; 실패 시 대신 1번 하락 상태로 감 (i-1 => 1{i-2})
            matrix.get(i - 1).set(100 + i - 2, matrix.get(i - 1).get(i - 2));
            matrix.get(i - 1).delete(i - 2);

            //1번 하락 행; 실패 시 대신 2번 하락 상태로 감 (1{i-2} => 2{i-3})
            matrix.set(100 + i - 2, new Map(matrix.get(i - 2).entries()));
            matrix.get(100 + i - 2).set(200 + i - 3, matrix.get(i - 2).get(i - 3));
            matrix.get(100 + i - 2).delete(i - 3);

            //2번 하락 행; 무조건 성공 (2{i-3} => i-2)
            matrix.set(200 + i - 3, new Map());
            matrix.get(200 + i - 3).set(i - 2, 1.0)
        }
    }

    //마르코프 체인 초기상태행렬; 1행 크기의 행렬; 해당 행 인덱스는 -2로 함
    let startMatrix = new Map();
    startMatrix.set(-2, new Map()).get(-2).set(startStar, 1.0);

    //마르코프 체인 진행
    let beforeMatrix = matrix;
    let result;

    while (true) {
        beforeMatrix = multiply(beforeMatrix, beforeMatrix);
        result = multiply(startMatrix, beforeMatrix);

        //안정 상태 판정; 파괴와 목표 상태만 존재하는지 확인
        if (result.get(-2).has(-1) && result.get(-2).has(endStar) && result.get(-2).size === 2) {
            return [result.get(-2).get(endStar) * 100, result.get(-2).get(-1) * 100];
        }
    }
}