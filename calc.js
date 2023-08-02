import { probabilityMatrix, probabilityMatrixWithStarcatch } from "./data.js";
import { multiply } from "./util.js";

//계산 후 [성공비율, 실패비율]로 리턴하는 함수
export const calc = (startStar, endStar, isStarcatch, isPreventDestroy1516, isPreventDestroy1617) => {
    //15성부터 파괴 확률 있어서, 시작을 15로 조정
    if (startStar < 15) {
        startStar = 15;
    }

    //즉시 종료 조건 (성공확률 100%)
    /* 시작과 끝이 같을 때
     * 끝이 15 이하일때
     * 15->16 파방 키고 끝이 16 이하일 때
     * 15->16, 16->17 파방 키고 끝이 17 이하일 때
     */
    if ((startStar === endStar) || (endStar <= 15) || (isPreventDestroy1516 === true && endStar <= 16) || (isPreventDestroy1516 === true && isPreventDestroy1617 === true && endStar <= 17)) {
        return [100, 0];
    }

    //16성 이하에서 종료 시 1617 파방 비활성화; 15성 이하는 위에서 리턴해서 여기까지 못옴
    if (endStar <= 16 && isPreventDestroy1617 == true) {
        isPreventDestroy1617 = false;
    }

    //스타캐치 여부에 따른 확률 테이블 가져오기
    let originMatrix;
    if (isStarcatch == true) {
        originMatrix = probabilityMatrixWithStarcatch;
    } else {
        originMatrix = probabilityMatrix;
    }

    //15성 이상만 고려할거라, 인덱스 조정; D: 0번, 15:1번, ...
    startStar -= 14;
    endStar -= 14;
    let size = endStar + 1;

    //확률 테이블 가공; 마르코프 체인 전이행렬로 사용
    let matrix = [];

    //D행; [1, 0, ..., 0]
    let row = Array(endStar).fill(0);
    row.unshift(1);
    matrix.push(row);

    //나머지행; 일단 그대로 가져옴
    for (let i = 1; i < endStar; i++) {
        row = [];
        row.push(originMatrix[i][0]);
        for (let j = 1; j <= endStar; j++) {
            row.push(originMatrix[i][j]);
        }
        matrix.push(row);
    }

    //1516 파방
    if (isPreventDestroy1516 === true) {
        matrix[1][1] += matrix[1][0];
        matrix[1][0] = 0;
    }

    //1617 파방
    if (isPreventDestroy1617 === true) {
        matrix[2][1] += matrix[2][0];
        matrix[2][0] = 0;
    }

    //종료행; [0, 0, ..., 1]
    row = Array(endStar).fill(0);
    row.push(1);
    matrix.push(row);

    //찬스타임; 찬스타임이 적용 가능한 상태들에 대해, 2번 하락 상태, 1번 하락 상태를 새롭게 전이행렬에 추가 후 원래 상태를 변경; 높은 상태부터 차례로 추가
    for (let i = endStar; i >= 4; i--) { //(최대)25성 종료시의부터 ~ 18성 종료시의까지의 찬스타임
        if (i == 7 || i == 8) { //21, 22성 종료의 경우 추가되는 찬스타임 없음
            continue;
        }

        //각 행에 열 두개씩 추가 (해당 별에서 2번 하락, 1번 하락)
        for (let i = 0; i < size; i++) {
            matrix[i].push(0);
            matrix[i].push(0);
        }

        //추가된만큼 size 증가
        size += 2;

        //행 두개 추가 (해당 별에서 2번 하락, 1번 하락)
        matrix.push(Array(size).fill(0));
        matrix.push(Array(size).fill(0));

        //2번 하락 행
        matrix[size - 2][i - 2] = 1; //무조건 성공

        //1번 하락 행
        matrix[size - 1][0] = matrix[i - 2][0]; //파괴 (변경x)
        matrix[size - 1][i - 1] = matrix[i - 2][i - 1]; //성공 (변경x)
        matrix[size - 1][size - 2] = matrix[i - 2][i - 3]; //실패 시 2번 하락 상태로 감

        //찬스타임 적용 전 원래 행
        matrix[i - 1][size - 1] = matrix[i - 1][i - 2]; //실패 시 1번 하락 상태로 감
        matrix[i - 1][i - 2] = 0; //원래 실패시 상태로 가지 않음
    }

    //마르코프 체인 초기상태행렬
    let startMatrix = [Array(size).fill(0)];
    startMatrix[0][startStar] = 1;

    //마르코프 체인 진행
    let beforeMatrix = matrix;
    let result;

    while (true) {
        let isContinue = false;

        beforeMatrix = multiply(beforeMatrix, beforeMatrix, size, size, size, size);
        result = multiply(startMatrix, beforeMatrix, 1, size, size, size);

        //안정 상태 판정; 파괴와 목표 상태를 제외한 나머지 상태가 모두 0인지 확인
        for (let i = 1; i < size; i++) {
            if (i == endStar) {
                continue;
            }

            if (result[0][i] != 0) {
                isContinue = true;
                break;
            }
        }

        if (isContinue != true) {
            return [result[0][endStar] * 100, result[0][0] * 100]
        }
    }
}
