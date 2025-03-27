//문자열이 자연수인지 판정하는 함수
export const isInt = (str) => {
    return /^\d+$/.test(str) ? true : false;
}

//두 희소행렬을 곱하는 함수
export const multiply = (mat1, mat2) => {
    let result = new Map();

    for (let i of mat1.keys()) {
        for (let j of mat1.get(i).keys()) {
            let jRow = mat2.get(j);

            if (jRow !== undefined){
                for (let k of jRow.keys())
                {
                    let value = mat1.get(i).get(j) * mat2.get(j).get(k);

                    if (!result.has(i)) {
                        result.set(i, new Map());
                    }

                    if (!result.get(i).has(k)) {
                        result.get(i).set(k, 0);
                    }

                    result.get(i).set(k, result.get(i).get(k) + value);

                    //희소행렬이므로 값이 0이면 삭제
                    if (result.get(i).get(k) === 0){
                        result.get(i).delete(k);
                    }

                    if (result.get(i).size === 0) {
                        result.delete(i);
                    }
                }
            }
        }
    }

    return result;
}
