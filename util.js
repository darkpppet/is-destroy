//문자열이 자연수인지 판정하는 함수
export const isInt = (str) => {
    return /^\d+$/.test(str) ? true : false;
}

//두 행렬을 곱하는 함수
export const multiply = (mat1, mat2, mat1Row, mat1Col, mat2Row, mat2Col) => {
    let result = [];

    for (let i = 0; i < mat1Row; i++) {
        let row = [];
        for (let j = 0; j < mat2Col; j++) {
            let sum = 0;
            for (let k = 0; k < mat1Col; k++) {
                sum += mat1[i][k] * mat2[k][j]; 
            }
            row.push(sum)
        }
        result.push(row);
    }
    
    return result;
}