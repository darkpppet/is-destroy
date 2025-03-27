 import { probabilityMatrix, probabilityMatrixWithStarcatch } from "./data.js";

//계산 후 [성공비율, 실패비율]로 리턴하는 함수; 입력 조건은 체크하지 않음
export const calc = (startStar, endStar, isStarcatch,
                     isPreventDestroy1516, isPreventDestroy1617, isPreventDestroy1718, isSunday) => {
    //15성부터 파괴 확률이 있고, 그 밑으로 하락하지 않으므로 시작을 최소 15로 조정
    startStar = Math.max(15, startStar);

    //스타캐치 여부에 따른 확률 테이블 가져오기
    let table = isStarcatch ? probabilityMatrixWithStarcatch : probabilityMatrix;
    
    //파괴방지 테이블 생성
    let preventDestroy = new Array(30).fill(false);
    preventDestroy[15] = isPreventDestroy1516;
    preventDestroy[16] = isPreventDestroy1617;
    preventDestroy[17] = isPreventDestroy1718;

    //결과로 리턴할 값
    let result = 100.0;
    
    //선데이 적용중이면 2번 인덱스, 아니면 1번 인덱스로 실패확률 사용 (data.js 참고)
    const failIndex = isSunday ? 2 : 1;

    // PI [SIGMA(f^i * s)] = PI [s / (1 - f)]
    for (let nowStar = startStar; nowStar < endStar; nowStar++) {
        if (preventDestroy[nowStar] === false) {
            result *= table[nowStar][0];
            result /= (1 - table[nowStar][failIndex]);
        }
    }

    return [result, 100.0 - result];
}