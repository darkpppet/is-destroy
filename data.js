//
// Map을 이용한 희소행렬 저장 방식으로 데이터 저장
// Map.get(시작 별).get(종료 별) = 확률
// 각 인덱스는 해당 별을 나타냄. 단, 파괴 상태의 인덱스는 -1
//

const probabilityMatrix = new Map();
probabilityMatrix.set(-1, new Map()).get(-1).set(-1, 1.000);
probabilityMatrix.set(15, new Map()).get(15).set(-1, 0.021).set(15, 0.679).set(16, 0.300);
probabilityMatrix.set(16, new Map()).get(16).set(-1, 0.021).set(15, 0.679).set(17, 0.300);
probabilityMatrix.set(17, new Map()).get(17).set(-1, 0.021).set(16, 0.679).set(18, 0.300);
probabilityMatrix.set(18, new Map()).get(18).set(-1, 0.028).set(17, 0.672).set(19, 0.300);
probabilityMatrix.set(19, new Map()).get(19).set(-1, 0.028).set(18, 0.672).set(20, 0.300);
probabilityMatrix.set(20, new Map()).get(20).set(-1, 0.070).set(20, 0.630).set(21, 0.300);
probabilityMatrix.set(21, new Map()).get(21).set(-1, 0.070).set(20, 0.630).set(22, 0.300);
probabilityMatrix.set(22, new Map()).get(22).set(-1, 0.194).set(21, 0.776).set(23, 0.030);
probabilityMatrix.set(23, new Map()).get(23).set(-1, 0.294).set(22, 0.686).set(24, 0.020);
probabilityMatrix.set(24, new Map()).get(24).set(-1, 0.396).set(23, 0.594).set(25, 0.010);
probabilityMatrix.set(25, new Map()).get(25).set(25, 1.000);

const probabilityMatrixWithStarcatch = new Map();
probabilityMatrixWithStarcatch.set(-1, new Map()).get(-1).set(-1, 1.00000);
probabilityMatrixWithStarcatch.set(15, new Map()).get(15).set(-1, 0.02055).set(15, 0.66445).set(16, 0.31500);
probabilityMatrixWithStarcatch.set(16, new Map()).get(16).set(-1, 0.02055).set(15, 0.66445).set(17, 0.31500);
probabilityMatrixWithStarcatch.set(17, new Map()).get(17).set(-1, 0.02055).set(16, 0.66445).set(18, 0.31500);
probabilityMatrixWithStarcatch.set(18, new Map()).get(18).set(-1, 0.02740).set(17, 0.65760).set(19, 0.31500);
probabilityMatrixWithStarcatch.set(19, new Map()).get(19).set(-1, 0.02740).set(18, 0.65760).set(20, 0.31500);
probabilityMatrixWithStarcatch.set(20, new Map()).get(20).set(-1, 0.06850).set(20, 0.61650).set(21, 0.31500);
probabilityMatrixWithStarcatch.set(21, new Map()).get(21).set(-1, 0.06850).set(20, 0.61650).set(22, 0.31500);
probabilityMatrixWithStarcatch.set(22, new Map()).get(22).set(-1, 0.19370).set(21, 0.77480).set(23, 0.03150);
probabilityMatrixWithStarcatch.set(23, new Map()).get(23).set(-1, 0.29370).set(22, 0.68530).set(24, 0.02100);
probabilityMatrixWithStarcatch.set(24, new Map()).get(24).set(-1, 0.39580).set(23, 0.59370).set(25, 0.01050);
probabilityMatrixWithStarcatch.set(25, new Map()).get(25).set(25, 1.00000);


export {probabilityMatrix, probabilityMatrixWithStarcatch};
