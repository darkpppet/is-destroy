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

    //확률 테이블 가공; 마르코프 체인 전이행렬로 사용
    let matrix = [];

    //D행; [1, 0, ..., 0]
    let row = [1];
    for (let i = 1; i <= endStar; i++) {
        row.push(0);
    }
    matrix.push(row);

    //나머지행; 그대로 가져온 후 파괴방지 적용
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
    row = [0];
    for (let i = 1; i < endStar; i++) {
        row.push(0);
    }
    row.push(1);
    matrix.push(row);

    //마르코프 체인 초기상태행렬
    let startMatrix = [];
    row = [0]
    for (let i = 1; i <= endStar; i++) {
        if (i == startStar) {
            row.push(1);
        } else {
            row.push(0);
        }
    }
    startMatrix.push(row);

    //마르코프 체인 진행
    let beforeMatrix = matrix;
    let result;
    const size = endStar + 1;

    while (true) {
        let isContinue = false;

        beforeMatrix = multiply(beforeMatrix, beforeMatrix, size, size, size, size);
        result = multiply(startMatrix, beforeMatrix, 1, size, size, size);

        //안정 상태 판정; 파괴와 목표 상태를 제외한 나머지 상태가 모두 0인지 확인
        for (let i = 1; i < endStar; i++) {
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