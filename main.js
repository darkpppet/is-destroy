import { isInt } from "./util.js";
import { calc } from "./calc.js";

const startStarBox = document.getElementById("start-star");
const endStarBox = document.getElementById("end-star");

const isStarcatchCheckbox = document.getElementById("is-starcatch");
const isPreventDestroy1516Checkbox = document.getElementById("is-prevent-destroy-1516");
const isPreventDestroy1617Checkbox = document.getElementById("is-prevent-destroy-1617");

const startButton = document.getElementById("start");
const alertAreaDiv = document.getElementById("alert-area");

let chart = new Chart(document.getElementById("chart"), {});

//html 아래 부분(div)에 내용을 적는 함수
const printAlert = (message) => {
    alertAreaDiv.innerText = message;
}

//시작 버튼 누를 때 발생하는 이벤트; 계산 후 표시해줌
const startButtonClickEvent = () => {
    let startStar = startStarBox.value;
    let endStar = endStarBox.value;
    const isStarcatch = isStarcatchCheckbox.checked;
    const isPreventDestroy1516 = isPreventDestroy1516Checkbox.checked;
    const isPreventDestroy1617 = isPreventDestroy1617Checkbox.checked;

    if (!isInt(startStar) || !isInt(endStar)) {
        chart.destroy();
        printAlert('숫자(자연수)만 입력해주세요.');
        return;
    }
    
    startStar = parseInt(startStar);
    endStar = parseInt(endStar);

    if (startStar < 0 || startStar > 25 || endStar < 0 || endStar > 25) {
        chart.destroy();
        printAlert('0부터 25 사이의 숫자만 입력해주세요.');
        return;
    } else if (startStar > endStar) {
        chart.destroy();
        printAlert('시작 별이 종료 별보다 클 수 없어요.');
        return;
    }

    const result = calc(parseInt(startStar), parseInt(endStar), isStarcatch, isPreventDestroy1516, isPreventDestroy1617);

    printAlert(`성공 확률: ${result[0].toFixed(6)}%
                    실패 확률: ${result[1].toFixed(6)}%`);

    chart.destroy();
    chart = new Chart(document.getElementById("chart"), {
        type: 'bar',
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                }
            }
        },
        data: {
            labels: [''],
            datasets: [{
                label: '성공',
                backgroundColor: 'blue',
                data: [result[0]]
            }, {
                label: '실패',
                backgroundColor: 'red',
                data: [result[1]]
            }]
        },
        plugins: {
            datalabels: {
                display: false
            }
        }
    });
}
startButton.addEventListener("click", startButtonClickEvent);
