let coins = JSON.parse(localStorage.getItem('coinInformation'));
let priceRange = JSON.parse(localStorage.getItem("priceRangeInfo"));


// 코인 및 심볼 검색 함수

const findCoin = document.querySelector('.findCoin');
const searchButton = document.querySelector('.searchCoinBtn');
const coinSection = document.querySelector('.coinSection');

function searchCoin(query) {
    const lists = coinSection.querySelectorAll('.coinList');
    lists.forEach((list) => {
        const nameElement = list.querySelector('.language');
        const isKoreanConsonant = /^[ㄱ-ㅎ]$/;

        if (isKoreanConsonant.test(query)) {
            // 검색어가 한글 자음인 경우
            const regExp = new RegExp('[' + query + ']', 'gi');
            if (regExp.test(nameElement.textContent)) {
                list.style.display = 'flex';
            } else {
                list.style.display = 'none';
            }
        } else {
            // 검색어가 일반 텍스트인 경우
            if (nameElement.textContent.toLowerCase().includes(query.toLowerCase())) {
                list.style.display = 'flex';
            } else {
                list.style.display = 'none';
            }
        }
    });
}

function handleSearch() {
    const query = findCoin.value;
    searchCoin(query);
}

findCoin.addEventListener('input', handleSearch);





// 탭 함수

let wonTab = document.querySelector('.won');
let dollarTab = document.querySelector('.dollar');
let haveTab = document.querySelector('.have');
let bookmarkTab = document.querySelector('.bookmark');

let wonBox = document.querySelector('.won-tab');
let dollarBox = document.querySelector('.dollar-tab');
let haveBox = document.querySelector('.have-tab');
let bookmarkBox = document.querySelector('.bookmark-tab');

let wonLabel = document.getElementById('won');
let dollarLabel = document.getElementById('dollar');
let haveLabel = document.getElementById('have');
let bookmarkLabel = document.getElementById('bookmark');


wonBox.style.display = 'block';
dollarBox.style.display = 'none';
haveBox.style.display = 'none';
bookmarkBox.style.display = 'none';
wonLabel.style.backgroundColor = 'rgb(241, 236, 236)';

function switchTabs(activeTab) {
    wonBox.style.display = 'none';
    dollarBox.style.display = 'none';
    haveBox.style.display = 'none';
    bookmarkBox.style.display = 'none';

    wonLabel.style.backgroundColor = '';
    dollarLabel.style.backgroundColor = '';
    haveLabel.style.backgroundColor = '';
    bookmarkLabel.style.backgroundColor = '';

    if (activeTab === 'won') {
        wonBox.style.display = 'block';
        wonLabel.style.backgroundColor = 'rgb(241, 236, 236)';
    } else if (activeTab === 'dollar') {
        dollarBox.style.display = 'block';
        dollarLabel.style.backgroundColor = 'rgb(241, 236, 236)';
    } else if (activeTab === 'have') {
        haveBox.style.display = 'block';
        haveLabel.style.backgroundColor = 'rgb(241, 236, 236)';
    } else if (activeTab === 'bookmark') {
        bookmarkBox.style.display = 'block';
        bookmarkLabel.style.backgroundColor = 'rgb(241, 236, 236)';
    }
}

wonTab.onclick = function () {
    switchTabs('won');
};

dollarTab.onclick = function () {
    switchTabs('dollar');
};

haveTab.onclick = function () {
    switchTabs('have');
};

bookmarkTab.onclick = function () {
    switchTabs('bookmark');
};





// 코인 리스트를 보여주는 함수

const viewCoin = coins.slice(1);

function createCoinList(coin, index, priceContent) {
    let coinList = document.createElement('div');
    let bookmark = document.createElement('div');
    let language = document.createElement('div');
    let price = document.createElement('div');
    let ratio = document.createElement('div');
    let nameGroup = document.createElement('div');
    let coinName = document.createElement('p');
    let unit = document.createElement('span');
    let priceGroup = document.createElement('p');
    let img = document.createElement('img');
    coinList.classList.add('coinList');
    bookmark.classList.add('star');
    language.classList.add('language');
    nameGroup.classList.add('nameGroup');
    price.classList.add('currentPrice');
    priceGroup.classList.add('priceGroup');
    ratio.classList.add('ratio');
    img.src = "./grayStar.png";

    coinList.append(bookmark, language, price, ratio);
    language.append(nameGroup);
    nameGroup.append(coinName, unit);
    bookmark.appendChild(img);
    price.append(priceGroup);
    priceGroup.append(priceContent);

    coinName.innerHTML = coin.name;
    unit.innerHTML = `${coin.symbol}/${priceContent.dataset.currency}`;
    img.addEventListener('click', clickedImg);
    coinList.setAttribute('data-id', index);

    return coinList;
}

function coinWonList() {
    viewCoin.forEach((coin, index) => {
        let won = document.createElement('p');
        won.innerHTML = coin.currentPrice;
        won.dataset.currency = 'KRW';
        let coinList = createCoinList(coin, index, won);
        wonBox.append(coinList);
    });
}

function coinUSDList() {
    viewCoin.forEach((coin, index) => {
        let dollar = document.createElement('p');
        let won = document.createElement('span');
        dollar.innerHTML = (coin.currentPrice / 1320).toFixed(3);
        won.innerHTML = `${coin.currentPrice} KRW`;
        dollar.dataset.currency = 'USDT';
        let coinList = createCoinList(coin, index, dollar);
        dollar.append(won);
        dollarBox.append(coinList);
    });
}

coinWonList();
coinUSDList();




// 관심 코인 리스트에 추가하는 함수

function clickedImg(event) {
    const img = event.target;
    const coinList = img.closest('.coinList');
    const pTag = document.querySelector('.noBookmark');
    const listId = coinList.getAttribute('data-id');
    console.log(img, coinList, pTag, listId);

    if (img.src.endsWith("grayStar.png")) {
        img.src = "./yellowStar.png";
        pTag.style.display = 'none';

        // Clone the list element and append it to the bookmark box
        const clonedList = coinList.cloneNode(true);
        clonedList.setAttribute('data-id', listId);
        bookmarkBox.appendChild(clonedList);

        // Update the cloned list's star image event listener
        const clonedImg = clonedList.querySelector('img');
        clonedImg.addEventListener('click', clickedImg);

    } else {
        img.src = "./grayStar.png";

        // Remove the list element from the bookmark box
        const listItemToRemove = bookmarkBox.querySelector(`[data-id="${listId}"]`);
        console.log(listItemToRemove);
        if (listItemToRemove) {
            bookmarkBox.removeChild(listItemToRemove);
        }

        const otherTabImg = document.querySelector(`.coinList[data-id="${listId}"] img`);
        console.log(otherTabImg);
        if (otherTabImg) {
            otherTabImg.src = "./grayStar.png";
        }

        // Show the p tag if there are no more items in the bookmark box
        const bookmarkBoxItems = bookmarkBox.querySelectorAll('.coinList');
        if (bookmarkBoxItems.length === 0) {
            pTag.style.display = 'block';
        }

        const dollarTabImg = dollarBox.querySelector(`.coinList[data-id="${listId}"] img`);
        if (dollarTabImg) {
            dollarTabImg.src = "./grayStar.png";
        }
    }
}




// 선택된 코인 목록에 배경색 적용

let coinList = document.querySelectorAll('.coinList');

coinList.forEach((item, index) => {
    wonBox.children[0].style.backgroundColor = 'rgb(241, 236, 236)';
    dollarBox.children[0].style.backgroundColor = 'rgb(241, 236, 236)';
    item.addEventListener('click', () => {
        // 선택되지 않은 인덱스의 배경색 제거
        viewCoin.forEach((element, idx) => {
            if (idx !== index) {
                wonBox.children[idx].style.backgroundColor = '';
                dollarBox.children[idx].style.backgroundColor = '';
            }
            item.style.backgroundColor = 'rgb(241, 236, 236)';
        });
    });
});


//--------------------------------------------------------------------------------------


//                          아 래 부 터    차 트     함 수


//--------------------------------------------------------------------------------------



let randomPrice;
let randomPrices;

function YaxisRange(coin) {
    // const currentPrice = parseFloat(coin.currentPrice);
    // 코인 가격 범위
    const min = coin.min; // y축 최솟값
    const max = coin.max; // y축 최댓값
    const lowRateMin = coin.lowRateMin;
    const lowRateMax = coin.lowRateMax;
    let randomPrice = Math.floor(Math.random() * (max - min + 1) + min);
    // console.log(min, max, lowRateMin, lowRateMax);

    // 특정 범위의 값 10%확률로 출력
    const tenPercent = Math.random();
    if (tenPercent <= 0.1) {
        // 10% 확률(필요시 확률 조정할 것)
        const zeroTohundred = Math.random(); // 0에서 1 사이의 랜덤한 확률 값을 생성
        if (Math.random() < zeroTohundred) {
            randomPrice =
                Math.floor(Math.random() * (lowRateMin - min + 1)) + min; // 특정 범위 이하의 값 생성
        } else {
            randomPrice =
                Math.floor(Math.random() * (max - lowRateMax + 1)) + lowRateMax; // 특정 범위 이상의 값 생성
        }
    } else {
        // 90% 확률로 특정 범위 외의 값 생성
        randomPrice =
            Math.floor(Math.random() * (lowRateMax - lowRateMin + 1)) +
            lowRateMin;
    }

    return randomPrice;
}
function printRandomValue(startPrice) {
    const interval = 1000; // 1초 간격
    const duration = 5000; // 5초 동안

    let elapsed = 0;
    randomPrices = [startPrice]; // 랜덤 가격을 저장할 배열 생성

    const timer = setInterval(() => {
        randomPrice = YaxisRange(coinPriceRange[2]);
        randomPrices.push(randomPrice); // 생성된 랜덤 가격을 배열에 추가
        console.log("Random Price: ", randomPrice);

        elapsed += interval;
        if (elapsed >= duration) {
            clearInterval(timer);
            console.log("All Random Prices: ", randomPrices); // 5초가 지난 후 모든 랜덤 가격 출력
            // printRandomValue(randomPrices[randomPrices.length - 1]); // 마지막 랜덤 가격을 시작 가격으로 사용하여 함수를 다시 실행
        }
    }, interval);
}

let num = 8; // 코인 클릭시 코인의 값 가져오기
let coinNumber = coins[num];
printRandomValue(parseFloat(coinNumber.currentPrice));

//----------------------------------------------------------------

let time = new Date();
let minutes = time.getMinutes();
let seconds = time.getSeconds();

let c_title = coinNumber.name;
// 페이지에서 코인을 누를때마다 c_title 이름 바뀌게 만들기

var options = {
    series: [
        // {
        //   name: "line",
        //   type: "line",
        //   data: [
        //     {
        //       x: 1,
        //       y: 1000,
        //     },
        //     {
        //       x: 2,
        //       y: 2000,
        //     },
        //     {
        //       x: 3,
        //       y: 3000,
        //     },
        //   ],
        // },
        {
            name: "candle",
            type: "candlestick",
            data: [
                // {
                //   x: minutes + ":" + seconds,
                //   y: [1000, 1200, 800, 1100],
                //   // 시가 고가 저가 종가
                // },
                // {
                //   x: seconds,
                //   y: [2000, 1500, 2200, 1500],
                // },
            ],
        },
    ],
    chart: {
        height: 350,
        type: "line",
    },
    title: {
        text: c_title,
        align: "left",
    },
    stroke: {
        width: [3, 1],
    },
    tooltip: {
        shared: true,
        custom: [
            function ({ seriesIndex, dataPointIndex, w }) {
                return w.globals.series[seriesIndex][dataPointIndex];
            },
            function ({ seriesIndex, dataPointIndex, w }) {
                var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
                return (
                    '<div class="apexcharts-tooltip-candlestick">' +
                    '<div>Open: <span class="value">' +
                    o +
                    "</span></div>" +
                    '<div>High: <span class="value">' +
                    h +
                    "</span></div>" +
                    '<div>Low: <span class="value">' +
                    l +
                    "</span></div>" +
                    '<div>Close: <span class="value">' +
                    c +
                    "</span></div>" +
                    "</div>"
                );
            },
        ],
    },
    yaxis: {
        min: 0,
        max: 12000,
        // type: "string",
        // label: {
        //   format: "dd MMM yyyy",
        // },
    },
    plotOptions: {
        candlestick: {
            colors: {
                upward: "#3339FF",
                // downward: "#DF7D46",
            },
        },
    },
};

let time9 = 0;
let time0 = 1000;
let count = 0;

turn1(0);
let start;

function turn1(val) {
    // alert(val);
    time0 = 1000;

    if (val > 0) {
        start = randomPrices[5];
        printRandomValue(randomPrices[randomPrices.length - 1]); // 마지막 랜덤 가격을 시작 가격으로 사용하여 함수를 다시 실행
    }

    const intervalId2 = setInterval(() => {
        let time = new Date();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        if (val == 0) {
            options.series[0].data[0] = {
                x: minutes + ":" + seconds,
                y: [
                    coinNumber.currentPrice,
                    randomPrice,
                    randomPrice,
                    randomPrice,
                ],
                // 시가 고가 저가 종가
            };
        } else {
            options.series[0].data[val] = {
                x: minutes + ":" + seconds,
                y: [start, randomPrice, randomPrice, randomPrice],
                // 시가 고가 저가 종가
            };
        }

        chart.updateOptions(options);
        if (time0 == 6000) {
            time0 = 1000;
            clearInterval(intervalId2);

            let randomPrices2 = randomPrices.slice(1);
            // console.log("얌", randomPrices2);
            let max1 = Math.max(...randomPrices2);
            let min1 = Math.min(...randomPrices2);

            // ★★★★★
            console.log("매수할 배열: ", randomPrices2);

            let element1 = 0;
            randomPrices2.forEach((element) => {
                element1 += element;
            });
            // console.log(randomPrices2.length);
            let average = element1 / randomPrices2.length;
            console.log("평균가: ", average);
            // 이 값을 나중에 매수할때 가져가기

            // ★★★★★★★★★★★★★★

            console.log("고가", max1);
            console.log("저가", min1);
            console.log("시가", randomPrices[0]);
            console.log("종가", randomPrices[5]);

            options.series[0].data[val] = {
                x: minutes + ":" + seconds,
                y: [randomPrices[0], max1, min1, randomPrices[5]],
                // 시가 고가 저가 종가
            };
            chart.updateOptions(options);
            val++;
            // ★★★★★
            if (val == 20) {
                // 보여주고 싶은 차트의 개수만큼 숫자를 넣으면 됨
                // ★★★★★

                turn2(val);
                return;
            }
            turn1(val);
            return;
        }
        time0 += 1000;
    }, time0);
}

function turn2(val) {
    options.series[0].data.splice(0, 1);
    val = val - 1;
    turn1(val);
}

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
