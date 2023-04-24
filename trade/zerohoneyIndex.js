// 코인의 순서, 코인을 클릭했을 때 해당 코인의 정보를 불러오기 위한 변수
let coinIndex = 1;
let tabItem = document.querySelectorAll(".tab-item");
let tabToggle = [true, false, false, false];
let loginUser = JSON.parse(localStorage.getItem("nowLogin"));
let userInformation = JSON.parse(localStorage.getItem("userInformation"));
// 매도시 코인의 개수를 나타냄
let sellVolume = 0;

// 가격을 빼는 - 버튼
let priceSubtract = document.querySelector(".price-subtract");
// 가격을 더하는 + 버튼
let priceAdd = document.querySelector(".price-add");
// 임시 코인
let coin = JSON.parse(localStorage.getItem("coinInformation"))[coinIndex];
// 매수시 직접 입력 버튼
let selfInput = document.querySelector(".self-input");
// 직접입력 슬라이더
const slider = document.querySelector("#progress");
// 슬라이더의 퍼센트 값
const output = document.querySelector(".self-input-percent");
//주문 수량 input
let tradeVolume = document.querySelector("#tradeVolume");
//주문 총액 input
let orderSum = document.querySelector("#orderSum");
console.log(loginUser.account);
slider.addEventListener("input", () => {
  const value = slider.value;
  output.textContent = `Progress: ${value}%`;
});

if (loginUser) {
  console.log("sad");
  document.querySelector(".btn-container").innerHTML =
    '<a href="" class="buy-sell-btn">매수</a>';
}

tabItem[0].style.borderBottom = "2px solid red";
tabItem.forEach((a, i) => {
  a.addEventListener("click", () => {
    tabItem.forEach((a, i) => {
      a.style.borderBottom = "";
      tabToggle[i] = false;
    });
    a.style.borderBottom = "2px solid red";
    tabToggle[i] = true;
    changeTabContent();
  });
});

// 매수/메도 탭을 바꿔주는 함수
const changeTabContent = (a, i) => {
  console.log(loginUser);
  if (tabToggle[0]) {
    // 매수 가격에 임시코인의 현재가를 넣는다.

    // 매수시 여기
    document.querySelector(".buy-price-container > span").innerHTML =
      "매수 가격";
    document.querySelector(".buy-price-container input").id = "buyPrice";
    document.querySelector(".currency-units").innerHTML = "krw";
    document.querySelector(".account").childNodes[0].nodeValue =
      loginUser.account;
    document.querySelector(".btn-container").innerHTML =
      '<a  class="buy-btn">매수</a>';
    let buyBtn = document.querySelector(".buy-btn");
    // 매수시 실행 메소드
    buyBtn.addEventListener("click", () => {
      buyFunction();
    });
    document.querySelector("#buyPrice").placeholder = coin.currentPrice;
  } else if (tabToggle[1]) {
    // 매도시 파는곳의 placeholder는 0고정이다

    // 매도시 여기
    document.querySelector(".buy-price-container > span").innerHTML =
      "매도 가격";
    document.querySelector(".buy-price-container input").id = "sellPrice";
    document.querySelector(".currency-units").innerHTML = coin.symbol;
    document.querySelector(".account").childNodes[0].nodeValue =
      loginUser.coinVolume[`${coin.symbol}`];
    document.querySelector(".btn-container").innerHTML =
      '<a class="sell-btn">매도</a>';
    let sellBtn = document.querySelector(".sell-btn");
    // 매수시 실행 메소드
    sellBtn.addEventListener("click", () => {
      sellFunction();
    });
    document.querySelector("#sellPrice").placeholder = 0;
  }
};

//매수가격 변경 버튼
priceAdd.addEventListener("click", () => {
  // 임시코인의 현재가격+1
  // 매도시
  if (tabToggle[1]) {
    sellVolume++;
    document.querySelector("#sellPrice").placeholder = sellVolume;
  } else {
    let coinPrice = parseInt(document.querySelector("#buyPrice").placeholder);

    coinPrice++;
    document.querySelector("#buyPrice").placeholder = coinPrice;
  }
});

//매수가격 변경 버튼
priceSubtract.addEventListener("click", () => {
  // **warning** placrholder는 string이기 때문에 약한 비교로 비교해줌 강한 비교로 하면 자료구조도 비고해서 false가 나옴

  // 매도시
  if (tabToggle[1]) {
    if (sellVolume == 0) {
      alert("이미 0개입니다.");
      return;
    }
    sellVolume--;

    document.querySelector("#sellPrice").placeholder = sellVolume;
  } else {
    let coinPrice = parseInt(document.querySelector("#buyPrice").placeholder);
    if (coinPrice == 0) {
      alert("이미 0개 입니다.");
      return;
    }
    coinPrice--;
    document.querySelector("#buyPrice").placeholder = coinPrice;
  }
});

// 매수탭에서 직접 입력을 누를시
selfInput.addEventListener("click", () => {
  document.querySelectorAll(".percent-container span").forEach((a) => {
    a.style.display = "none";
  });
  document.querySelector(".self-input-bar").style.display = "flex";
  document.querySelector(".self-input-percent").style.display = "flex";

  tradeVolume.removeAttribute("onfocus");
  tradeVolume.removeAttribute("readonly");
});

// 슬라이더값이 변경될 때 퍼센트를 바꿔줌
slider.addEventListener("input", () => {
  const value = slider.value;
  output.textContent = `현재 수량: ${value}%`;
  orderSum.placeholder =
    (parseFloat(value) / 100) *
    parseInt(document.querySelector("#buyPrice").placeholder);
});

for (let i = 0; i < 4; i++) {
  document
    .querySelectorAll(".percent-container span")
    [i].addEventListener("click", () => {
      document.querySelector("#tradeVolume").placeholder = document
        .querySelectorAll(".percent-container span")
        [i].getAttribute("value");
      orderSum.placeholder =
        (parseFloat(
          document
            .querySelectorAll(".percent-container span")
            [i].getAttribute("value")
        ) /
          100) *
        parseInt(document.querySelector("#buyPrice").placeholder);
    });
}
//입력이 가능해진 input에 숫자를 입력 할 때마다 실행
tradeVolume.addEventListener("input", () => {
  let input = document.getElementById("tradeVolume").value;

  orderSum.placeholder =
    parseInt(document.querySelector("#buyPrice").placeholder) *
    parseFloat(input);
});

//매수 함수
const buyFunction = () => {
  //소비자가 산 코인의 양
  let buyCoinVolume = parseInt(
    parseInt(orderSum.placeholder) /
      parseFloat(document.querySelector("#buyPrice").placeholder)
  );
  // 소비자가 산 코인을 Coin 생성자로 만들어 push해야함
  let { coinObj, quantity, userId } = new Coin(
    dummyDataCoin[coinIndex],
    buyCoinVolume,
    loginUser.id
  );
  loginUser.coin.push({ coinObj: coinObj, quantity: quantity, userId: userId });

  // 소비자가 이미 갖고있는 코인, 새로산 코인을 여기에 더해야함
  let alreadyHaveCoin = loginUser["coinVolume"][coin.symbol];
  loginUser.coinVolume = {
    ...loginUser.coinVolume,
    [coin.symbol]: alreadyHaveCoin + buyCoinVolume,
  };
  console.log(alreadyHaveCoin);
  loginUser.account -= parseInt(orderSum.placeholder);
  console.log(loginUser);
  setLoginUser(loginUser);
  let tempUser = getLocalStorage("userInformation").map((a) => {
    if (loginUser.id == a.id) {
      a = loginUser;
      return a;
    } else {
      return a;
    }
  });
  console.log(tempUser);
  setLocalStorage("userInformation", tempUser);
  // 매수후에 사용자의 계좌를 업데이트함
  document.querySelector(".account").childNodes[0].nodeValue =
    loginUser.account;
};
// 매도 함수
const sellFunction = () => {
  console.log(loginUser.account);
  loginUser.account += parseInt(orderSum.placeholder);
  console.log(loginUser.account);
  setLoginUser(loginUser);
  let tempUser = getLocalStorage("userInformation").map((a) => {
    if (loginUser.id == a.id) {
      a.account = loginUser.account;
      return a;
    } else {
      return a;
    }
  });
  console.log(tempUser);
  setLocalStorage("userInformation", tempUser);
  document.querySelector(".account").childNodes[0].nodeValue =
    loginUser.coinVolume[`${coin.symbol}`];
};

changeTabContent();

// 콜백 함수 정의
function getAveragePrice(array) {
  if (array.length >= 6) {
    const start = 1;
    const end = 5;

    // 1~5번 인덱스의 합을 계산
    const sum = array.slice(start, end + 1).reduce((acc, cur) => acc + cur, 0);

    // 1~5번 인덱스의 개수로 나누어 평균 계산
    const average = sum / (end - start + 1);

    return average;
  }
}
// setInterval(() => {
//   if (randomPrices.length == 6) {
//     // 평균가가 6초때 나오므로 length가 6일때
//     console.log(coins[coinIndex].currentPrice);
//     // 해당하는 인덱스의 현재가를 평균가로 바꿔줌
//     coins[coinIndex].currentPrice = getAveragePrice(randomPrices);
//     // html에 나타내기 위하여 coinPrice또한 바꿔줌
//     coinPrice = coins[coinIndex].currentPrice;
//     // html수정

//     setLocalStorage("coinInformation", coins);
//   }
// }, 1000);

// 범인 찾았다!!
// 오류 1. 6초 전에 다른 코인을 누를시 평균가가 존재 x=>버그남
allCoinList.forEach((a, index) => {
  a.addEventListener("click", (i) => {
    coinIndex = index + 1;
    coin = JSON.parse(localStorage.getItem("coinInformation"))[coinIndex];
    // 해당하는 인덱스의 현재가를 평균가로 바꿔줌
    // console.log(coins[coinIndex].currentPrice);
    // html수정
    //1chori에 있는 6초후에 계산되는 평균가를 가져옴
    if (average == undefined) {
      document.querySelector("#buyPrice").placeholder = "종가를 기다리세요";
    }
  });
});
