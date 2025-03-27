//문자열이 자연수인지 판정하는 함수
export const isInt = (str) => {
    return /^\d+$/.test(str) ? true : false;
}
