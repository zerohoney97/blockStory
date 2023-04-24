let coins = JSON.parse(localStorage.getItem("coinInformation"));
let priceRange = JSON.parse(localStorage.getItem("priceRangeInfo"));
let intervalId2;
let timer;
let average;
let randomPrice;
let randomPrices;
//--------------------------------------------------------------------------------------------------------

// 코인 및 심볼 검색 함수

//--------------------------------------------------------------------------------------------------------

const findCoin = document.querySelector(".findCoin");
const searchButton = document.querySelector(".searchCoinBtn");
const coinSection = document.querySelector(".coinSection");

function searchCoin(query) {
  const lists = coinSection.querySelectorAll(".wonCoinList, .dollarCoinList");
  const isKoreanConsonant = /^[ㄱ-ㅎ]$/;

  lists.forEach((list) => {
    const nameElement = list.querySelector(".language");

    if (isKoreanConsonant.test(query)) {
      // 검색어가 한글 자음인 경우
      const regExp = new RegExp("[" + query + "]", "gi");
      if (regExp.test(nameElement.textContent)) {
        list.style.display = "flex";
      } else {
        list.style.display = "none";
      }
    } else {
      // 검색어가 일반 텍스트인 경우
      if (nameElement.textContent.toLowerCase().includes(query.toLowerCase())) {
        list.style.display = "flex";
      } else {
        list.style.display = "none";
      }
    }
  });
}

function handleSearch() {
  const query = findCoin.value;
  searchCoin(query);
}

findCoin.addEventListener("input", handleSearch);

//------------------------------------------------------------------------------------------------

// 탭 함수(원화/USDT/보유/관심)

// 탭 전환 및 선택된 탭 배경색 적용

//-----------------------------------------------------------------------------------------------

let wonTab = document.querySelector(".won");
let dollarTab = document.querySelector(".dollar");
let haveTab = document.querySelector(".have");
let bookmarkTab = document.querySelector(".bookmark");

let wonBox = document.querySelector(".won-tab");
let dollarBox = document.querySelector(".dollar-tab");
let haveBox = document.querySelector(".have-tab");
let bookmarkBox = document.querySelector(".bookmark-tab");

let wonLabel = document.getElementById("won");
let dollarLabel = document.getElementById("dollar");
let haveLabel = document.getElementById("have");
let bookmarkLabel = document.getElementById("bookmark");

wonBox.style.display = "block";
dollarBox.style.display = "none";
haveBox.style.display = "none";
bookmarkBox.style.display = "none";
wonLabel.style.backgroundColor = "rgb(241, 236, 236)";

function switchTabs(activeTab) {
  wonBox.style.display = "none";
  dollarBox.style.display = "none";
  haveBox.style.display = "none";
  bookmarkBox.style.display = "none";

  wonLabel.style.backgroundColor = "";
  dollarLabel.style.backgroundColor = "";
  haveLabel.style.backgroundColor = "";
  bookmarkLabel.style.backgroundColor = "";

  if (activeTab === "won") {
    wonBox.style.display = "block";
    wonLabel.style.backgroundColor = "rgb(241, 236, 236)";
  } else if (activeTab === "dollar") {
    dollarBox.style.display = "block";
    dollarLabel.style.backgroundColor = "rgb(241, 236, 236)";
  } else if (activeTab === "have") {
    haveBox.style.display = "block";
    haveLabel.style.backgroundColor = "rgb(241, 236, 236)";
  } else if (activeTab === "bookmark") {
    bookmarkBox.style.display = "block";
    bookmarkLabel.style.backgroundColor = "rgb(241, 236, 236)";
  }
}

wonTab.onclick = function () {
  switchTabs("won");
};

dollarTab.onclick = function () {
  switchTabs("dollar");
};

haveTab.onclick = function () {
  switchTabs("have");
};

bookmarkTab.onclick = function () {
  switchTabs("bookmark");
};

//----------------------------------------------------------------------------

// 각 탭마다 코인 리스트를 보여주는 함수

//----------------------------------------------------------------------------

const viewCoin = coins.slice(1);

function createSubElements(priceContent) {
  let bookmark = document.createElement("div");
  let language = document.createElement("div");
  let price = document.createElement("div");
  let ratio = document.createElement("div");
  let nameGroup = document.createElement("div");
  let coinName = document.createElement("p");
  let unit = document.createElement("span");
  let priceGroup = document.createElement("p");
  let img = document.createElement("img");

  // 아래와 같은 순서대로 태그가 구성되어 있음(coinSection의 하위 태그)
  bookmark.classList.add("star");

  language.classList.add("language");
  nameGroup.classList.add("nameGroup");

  price.classList.add("currentPrice");
  priceGroup.classList.add("priceGroup");

  ratio.classList.add("ratio");
  img.src = "./grayStar.png";

  bookmark.appendChild(img);
  language.append(nameGroup);
  nameGroup.append(coinName, unit);
  price.append(priceGroup);
  priceGroup.append(priceContent);

  return { bookmark, language, price, ratio, coinName, unit };
}

function createCoinList(coin, index, priceContent) {
  let wonCoinList = document.createElement("div");
  let dollarCoinList = document.createElement("div");
  wonCoinList.classList.add("wonCoinList");
  dollarCoinList.classList.add("dollarCoinList");

  const wonSubElements = createSubElements(priceContent);
  const dollarSubElements = createSubElements(priceContent);

  wonCoinList.append(
    wonSubElements.bookmark,
    wonSubElements.language,
    wonSubElements.price,
    wonSubElements.ratio
  );
  dollarCoinList.append(
    dollarSubElements.bookmark,
    dollarSubElements.language,
    dollarSubElements.price,
    dollarSubElements.ratio
  );

  wonSubElements.bookmark
    .querySelector("img")
    .addEventListener("click", clickedImg);
  dollarSubElements.bookmark
    .querySelector("img")
    .addEventListener("click", clickedImg);

  wonSubElements.coinName.innerHTML = coin.name;
  dollarSubElements.coinName.innerHTML = coin.name;

  // 각 코인의 단위를 설정  코인 단위/화폐 단위
  wonSubElements.unit.innerHTML = `${coin.symbol}/${priceContent.dataset.currency}`;
  dollarSubElements.unit.innerHTML = `${coin.symbol}/${priceContent.dataset.currency}`;

  // 각 코인 목록에 대한 인덱스를 설정
  wonCoinList.setAttribute("data-id", index);
  dollarCoinList.setAttribute("data-id", index);

  // console.log(wonSubElements, dollarSubElements);
  return { wonCoinList, dollarCoinList };
}

//----------- 여기까지 태그 추가하는 코드

//---------- 아래부터는 가격과 단위 표현하는 코드
// let wonBox = document.querySelector(".won-tab");
// let dollarBox = document.querySelector(".dollar-tab");
// let wonCoinList = document.createElement("div");

function coinWonList() {
  viewCoin.forEach((coin, index) => {
    let won = document.createElement("p");
    won.dataset.currency = "KRW";
    let coinListObj = createCoinList(coin, index, won);
    let wonCoinList = coinListObj.wonCoinList;
    wonBox.append(wonCoinList);

    setInterval(() => {
      // 현재가 실시간 반영
      //   스코프를 이용해 주어진 함수내에서만 생존하는 변수 생성
      const wonCoinList = wonBox.querySelectorAll(".wonCoinList");

      won.innerHTML = `${randomPrice} KRW`;
      //   모든 코인의 현재가(원)를 바꿔주는 함수이다. 생성된 코인 리스트의 현재가를 1초마다 바꿔준다.

      wonCoinList.forEach((a, idx) => {
        wonBox.children[idx].querySelector(".currentPrice p").innerHTML =
          coinCurrentArray[idx] + "KRW";
      });
    }, 1000);
  });
}

let val10 = 0;

function coinUSDList() {
  viewCoin.forEach((coin, index) => {
    let dollar = document.createElement("p");
    let won = document.createElement("span");
    dollar.dataset.currency = "USDT";
    won.dataset.currency = "KRW";
    let coinListObj = createCoinList(coin, index, dollar, won);
    let dollarCoinList = coinListObj.dollarCoinList;
    dollar.append(won);
    dollarBox.append(dollarCoinList);

    int10 = setInterval(() => {
      // 현재가 실시간 반영
      // dollar.innerHTML = (randomPrice / 1320).toFixed(3);
      // won.innerHTML = `${randomPrice} KRW`;
      //   스코프를 이용해 주어진 함수내에서만 생존하는 변수 생성

      const dollarCoinList = dollarBox.querySelectorAll(".dollarCoinList");

      if (val10 == 0) {
        val10 = 0;
      } else {
        val10 = val10;
      }
      document.querySelector(
        `.won-tab [data-id='${val10}'] .currentPrice .priceGroup`
      ).innerHTML = `${randomPrice} KRW`;
      document.querySelector(
        `.dollar-tab [data-id='${val10}'] .currentPrice .priceGroup`
      ).innerHTML = `${(randomPrice / 1320).toFixed(3)} USDT`;
      //   모든 코인의 현재가(달려)를 바꿔주는 함수이다. 생성된 코인 리스트의 현재가를 1초마다 바꿔준다.
      dollarCoinList.forEach((a, idx) => {
        dollarBox.children[idx].querySelector(
          ".currentPrice p"
        ).innerHTML = `${(coinCurrentArray[idx] / 1320).toFixed(3)} USDT`;
      });
    }, 1000);
  });
}

coinWonList();
coinUSDList();

//---------------------------------------------------------------------

// 관심 코인 리스트에 추가하는 함수(북마크)

//--------------------------------------------------------------------

function clickedImg(event) {
  const img = event.target;
  const coinList =
    img.closest(".wonCoinList") || img.closest(".dollarCoinList");
  const pTag = document.querySelector(".noBookmark");
  const listId = coinList.getAttribute("data-id");
  // console.log(img, coinList, pTag, listId);

  if (img.src.endsWith("grayStar.png")) {
    img.src = "./yellowStar.png";
    pTag.style.display = "none";

    // 코인탭에 있는 코인요소를 복제하여 북마크탭에 추가
    const clonedList = coinList.cloneNode(true);
    clonedList.setAttribute("data-id", listId);
    bookmarkBox.appendChild(clonedList);

    // 복제된 코인리스트의 이미지 이벤트 업데이트
    const clonedImg = clonedList.querySelector("img");
    clonedImg.addEventListener("click", clickedImg);
  } else {
    img.src = "./grayStar.png";

    // 북마크탭에서 코인 목록 제거
    const listItemToRemove = bookmarkBox.querySelector(`[data-id="${listId}"]`);
    // console.log(listItemToRemove);
    if (listItemToRemove) {
      bookmarkBox.removeChild(listItemToRemove);
    }

    const wonTabImg = document.querySelector(
      `.wonCoinList[data-id="${listId}"] img`
    );
    // console.log(wonTabImg);
    if (wonTabImg) {
      wonTabImg.src = "./grayStar.png";
    }

    // 북마크탭에 코인이 없으면 p태그 다시 표시
    const bookmarkBoxItems = bookmarkBox.querySelectorAll(
      ".wonCoinList, .dollarCoinList"
    );
    if (bookmarkBoxItems.length === 0) {
      pTag.style.display = "block";
    }

    const dollarTabImg = dollarBox.querySelector(
      `.dollarCoinList[data-id="${listId}"] img`
    );
    if (dollarTabImg) {
      dollarTabImg.src = "./grayStar.png";
    }
  }
}

//-----------------------------------------------------------------------------

// 선택된 코인 목록에 배경색 적용

//-----------------------------------------------------------------------------

function setBackgroundColor(coinList, box) {
  coinList.forEach((item, index) => {
    box.children[0].style.backgroundColor = "rgb(241, 236, 236)";
    item.addEventListener("click", () => {
      coinList.forEach((element, idx) => {
        if (idx !== index) {
          box.children[idx].style.backgroundColor = "";
          // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
          // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
          // 무헌아 이거 생각하고 랜덤값 넣어야 해~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
          // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        } else {
          val10 = index;
        }
        item.style.backgroundColor = "rgb(241, 236, 236)";
      });
    });
  });
}
const wonCoinList = wonBox.querySelectorAll(".wonCoinList");

const dollarCoinList = dollarBox.querySelectorAll(".dollarCoinList");

setBackgroundColor(wonCoinList, wonBox);
setBackgroundColor(dollarCoinList, dollarBox);

//-------------------------------------------------------------------------

//                      체                      결

//--------------------------------------------------------------------------

const dealContent = document.querySelector(".deal-content");

function addDealContent(time, price, volume, amount) {
  const ul = document.createElement("ul");
  const timeList = document.createElement("li");
  const priceList = document.createElement("li");
  const volumeList = document.createElement("li");
  const amountList = document.createElement("li");

  timeList.classList.add("dealTime");
  priceList.classList.add("dealPrice");
  volumeList.classList.add("dealVolume");
  amountList.classList.add("dealAmount");

  timeList.textContent = time;
  priceList.textContent = price;
  volumeList.textContent = volume;
  amountList.textContent = amount;

  dealContent.append(ul);
  ul.append(timeList, priceList, volumeList, amountList);
}

// 코인리스트에 있는 코인 클릭시 체결량의 Symbol이 클릭된 해당 코인의 Symbol로 변경

function changeSymbol(coinList) {
  coinList.forEach((a, i) => {
    a.addEventListener("click", () => {
      document.querySelector(".deal-volume span").innerHTML =
        coins[i + 1].symbol;
    });
  });
}

changeSymbol(wonCoinList);
changeSymbol(dollarCoinList);

//--------------------------------------------------------------------------------------

//                          아 래 부 터    차 트     함 수

//--------------------------------------------------------------------------------------

let num; // 코인 클릭시 코인의 값 가져오기
// let coinNumber = coins[num];
// let c_title = coinNumber.name;

// let max0 = priceRange[num].max;
// console.log(max0);

// 종가에 따라 바뀐 현재 기준가이다. 즉,100원에서 200원이 됐다면 iff는 200원이 되며,YaxisRange에서 cp를 이 iff로 바꿔주는 역할을 하는 부분이 있다.
let allCoinList = document.querySelectorAll(".wonCoinList, .dollarCoinList");
// console.log(allCoinList);
let time = new Date();
let minutes = time.getMinutes();
let seconds = time.getSeconds();
let c_title;

function displayChart(index) {
  if (index >= 10) {
    index = index % 10;
  }
  let num = coins[index + 1];
  c_title = num.name;

  function YaxisRange(coin) {
    const min = coin.min;
    const max = coin.max;

    if (iff == 0) {
      cp = Number(num.currentPrice);
    } else {
      cp = iff;
    }

    // 1부터 10까지의 랜덤 숫자
    let ten_chance = Math.floor(Math.random() * 20 + 1);

    if (ten_chance == 10) {
      // 10%      500기준 min~200 and 10000~max
      let two = Math.floor(Math.random() * 2 + 1);
      if (two == 1) {
        // randomPrice = min;

        // min ~ 10% 까지의 값
        randomPrice = Math.floor(Math.random() * (max * 0.1) + min);
      } else {
        // randomPrice = max;

        // max ~ max밑의 10% 값
        randomPrice = Math.floor(Math.random() * (max * 0.1 + 1) + max * 0.9);
      }
      // console.log("결과값: ", randomPrice);
    } else {
      // 90%      500기준 300 ~ 700
      let half = cp / 2;
      // ???
      randomPrice = Math.floor(
        Math.random() * (cp + half - (cp - half) + 1) + (cp - half)
      );

      if (randomPrice < min) {
        randomPrice = min;
      } else if (randomPrice > max) {
        // randomPrice = max;
        // max값보다 큰 값이 나와버리면 max밑20% ~ max 값까지 랜덤값 출력
        randomPrice = Math.floor(Math.random() * (max * 0.2 + 1) + max * 0.8);
      }
    }
    iff = randomPrice;

    return randomPrice;
  }

  function printRandomValue(startPrice) {
    const interval = 1000; // 1초 간격
    const duration = 5000; // 5초 동안

    let elapsed = 0;
    randomPrices = [startPrice]; // 랜덤 가격을 저장할 배열 생성

    timer = setInterval(() => {
      //   console.log(coinCurrentArray);

      //liveTrading에서 계속 갱신되는 coinCurrentArray를 갖고와 randomPrice에 삽입
      //   다른 코인으로 변경해도 coinCurrentArray는 계속 갱신되고 있기 때문에 최신값을 가져올 수 있다.
      randomPrice = coinCurrentArray[index];
      console.log(randomPrice);
      randomPrices.push(randomPrice); // 생성된 랜덤 가격을 배열에 추가
      // console.log("Random Price: ", randomPrice);
      // console.log("Random title: ", c_title);

      elapsed += interval;
      if (elapsed >= duration) {
        clearInterval(timer);
        // console.log("All Random Prices: ", randomPrices); // 5초가 지난 후 모든 랜덤 가격 출력
        // printRandomValue(randomPrices[randomPrices.length - 1]); // 마지막 랜덤 가격을 시작 가격으로 사용하여 함수를 다시 실행
      }
    }, interval);
  }

  printRandomValue(parseFloat(num.currentPrice));

  //----------------------------------------------------------------

  // 페이지에서 코인을 누를때마다 c_title 이름 바뀌게 만들기

  var options = {
    // options 객체는 차트의 구성을 저장
    series: [
      {
        name: "candle",
        type: "candlestick",
        data: [],
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
      max: priceRange[index + 1].max,
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
  let chart = new ApexCharts(document.querySelector("#chart"), options);

  // let time9 = 0;
  let time0 = 1000;
  // let count = 0;

  turn1(0);
  let start;

  function turn1(val) {
    // 각 캔들스틱의 정보를 생성하고, 이를 차트 데이터에 추가한 다음 차트를 업데이트
    // alert(val);
    time0 = 1000;

    if (val > 0) {
      start = randomPrices[5];
      printRandomValue(randomPrices[randomPrices.length - 1]); // 마지막 랜덤 가격을 시작 가격으로 사용하여 함수를 다시 실행
    }

    intervalId2 = setInterval(() => {
      let time = new Date();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();

      if (val == 0) {
        options.series[0].data[0] = {
          x: minutes + ":" + seconds,
          y: [num.currentPrice, randomPrice, randomPrice, randomPrice],
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
        // console.log("매수할 배열: ", randomPrices2);

        let element1 = 0;
        randomPrices2.forEach((element) => {
          element1 += element;
        });
        // console.log(randomPrices2.length);
        average = element1 / randomPrices2.length;
        // 평균가로 매수가격을 바꿔줍니다.
        if (document.querySelector("#buyPrice")) {
          document.querySelector("#buyPrice").placeholder = average;
        } 
        // console.log("평균가: ", average);
        // 이 값을 나중에 매수할때 가져가기
        // 무헌이꺼랑 합치기~~~~~~~~~~~~

        // console.log("고가", max1);
        // console.log("저가", min1);
        // console.log("시가", randomPrices[0]);
        // console.log("종가", randomPrices[5]);

        options.series[0].data[val] = {
          x: minutes + ":" + seconds,
          y: [randomPrices[0], max1, min1, randomPrices[5]],
          // 시가 고가 저가 종가
        };
        chart.updateOptions(options);
        val++;

        turn1(val);
        return;
      }
      time0 += 1000;
    }, time0);
  }

  chart.render();
}

allCoinList.forEach((item, index) => {
  item.addEventListener("click", () => {
    // csh 하던거 -------------------------------------------
    // let arr10 = document.querySelectorAll(".language");
    // arr10.forEach(function(el){
    //   console.log(el);
    //   el.addEventListener("click", function(){
    //     clearInterval(intervalId2);
    //     clearInterval(timer);
    //     displayChart(index+1);
    //   });
    // })
    // csh 하던거 -------------------------------------------

    // let parent1 = document.querySelector(".wonCoinList");
    // let class1 = [".language", ".currentPrice", ".ratio"];
    // class1.forEach(function (cl) {
    //   parent1.querySelectorAll(cl).forEach(function (element) {
    //     element.addEventListener("click", function () {

    //       // clearInterval(intervalId2);
    //       // clearInterval(timer);
    //       // displayChart(index);
    //     });
    //   });
    // });

    // ********************************************************************************************
    // *** BUG FIX!: 다른 코인을 클릭시 새로운 차트가 덧붙혀지는 버그가 있었음.
    //             1. intervalId2,timer를 사용하여 해당 코인에 대한 새로운 값을 갱신하였음
    //             2. 이 때 위의 두 변수는 !!해당 함수 내에서 선언된 지역 변수임!! 즉 새로운 차트가 그려졌을 때, intervalId2,timer에
    //                새로운 값을 넣어도 이는 바로 전 차트를 그릴 때 사용한 intervalId2,timer 와는 이름만 같지 서로 다른 주소값을 참조함
    //             3. 결론 적으로 새로운 차트를 그리면 두쌍의 intervalId2,timer 가 1초마다 돌아가는 거임.
    //             4. 해결 방법은 저 두 변수를 전역변수로 선언하면 됨. 그렇게 되면 차트가 바뀔 때 마다 전역변수에 새로운 setInterval이 들어가므로 새로운  intervalId2,timer
    //                가 생성되지 않음
    //             5. 혹시 몰라서 clearInterval로 삭제까지 함***
    // ********************************************************************************************
    clearInterval(intervalId2);
    clearInterval(timer);
    displayChart(index);
  });
});

// 브라우저를 키거나 reload시 첫 번째 코인의 차트 표시
displayChart(0);
