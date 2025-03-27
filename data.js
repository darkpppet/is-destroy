//
// 배열로 데이터 저장
// 각 인덱스는 해당 별을 나타냄.
// 원소도 배열; 0번은 성공확률, 1번은 실패(유지)확률, 2번은 썬데이 반영 실패(유지)확률
//

const probabilityMatrix = [];
probabilityMatrix[15] = [0.3, 0.679, 0.6853];
probabilityMatrix[16] = [0.3, 0.679, 0.6853];
probabilityMatrix[17] = [0.15, 0.782, 0.8024];
probabilityMatrix[18] = [0.15, 0.782, 0.8024];
probabilityMatrix[19] = [0.15, 0.765, 0.7905];
probabilityMatrix[20] = [0.3, 0.595, 0.6265];
probabilityMatrix[21] = [0.15, 0.7225, 0.76075];
probabilityMatrix[22] = [0.15, 0.68, 0.68];
probabilityMatrix[23] = [0.1, 0.72, 0.72];
probabilityMatrix[24] = [0.1, 0.72, 0.72];
probabilityMatrix[25] = [0.1, 0.72, 0.72];
probabilityMatrix[26] = [0.07, 0.744, 0.744];
probabilityMatrix[27] = [0.05, 0.76, 0.744];
probabilityMatrix[28] = [0.03, 0.776, 0.776];
probabilityMatrix[29] = [0.01, 0.792, 0.792];

const probabilityMatrixWithStarcatch = [];
probabilityMatrixWithStarcatch[15] = [0.315, 0.66445, 0.670615];
probabilityMatrixWithStarcatch[16] = [0.315, 0.66445, 0.670615];
probabilityMatrixWithStarcatch[17] = [0.1575, 0.7751, 0.79532];
probabilityMatrixWithStarcatch[18] = [0.1575, 0.7751, 0.79532];
probabilityMatrixWithStarcatch[19] = [0.1575, 0.75825, 0.783525];
probabilityMatrixWithStarcatch[20] = [0.315, 0.58225, 0.613075];
probabilityMatrixWithStarcatch[21] = [0.1575, 0.716125, 0.7540375];
probabilityMatrixWithStarcatch[22] = [0.1575, 0.674, 0.674];
probabilityMatrixWithStarcatch[23] = [0.105, 0.716, 0.716];
probabilityMatrixWithStarcatch[24] = [0.105, 0.716, 0.716];
probabilityMatrixWithStarcatch[25] = [0.105, 0.716, 0.716];
probabilityMatrixWithStarcatch[26] = [0.0735, 0.7412, 0.7412];
probabilityMatrixWithStarcatch[27] = [0.0525, 0.758, 0.758];
probabilityMatrixWithStarcatch[28] = [0.0315, 0.7748, 0.7748];
probabilityMatrixWithStarcatch[29] = [0.0105, 0.7916, 0.7916];

export {probabilityMatrix, probabilityMatrixWithStarcatch};
