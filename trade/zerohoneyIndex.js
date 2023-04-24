// 코인의 순서, 코인을 클릭했을 때 해당 코인의 정보를 불러오기 위한 변수
let coinIndex = 1;
let tabItem = document.querySelectorAll(".tab-item");
let tabToggle = [true, false, false, false];
let loginUser = JSON.parse(localStorage.getItem("nowLogin"));
let userInformation = JSON.parse(localStorage.getItem("userInformation"));
// 가격을 빼는 - 버튼
let priceSubtract = document.querySelector(".price-subtract");
// 가격을 더하는 + 버튼
let priceAdd = document.querySelector(".price-add");
// 임시 코인
let coin = JSON.parse(localStorage.getItem("coinInformation"))[coinIndex];
let coinPrice = coin.currentPrice;
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
  // 매수 가격에 임시코인의 현재가를 넣는다.
  document.querySelector("#buyPrice").placeholder = coinPrice;

  console.log(loginUser);
  if (tabToggle[0]) {
    document.querySelector(".buy-price-container > span").innerHTML =
      "매수 가격";
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
  } else if (tabToggle[1]) {
    document.querySelector(".buy-price-container > span").innerHTML =
      "매도 가격";
    document.querySelector(".currency-units").innerHTML = coin.symbol;
    document.querySelector(".account").childNodes[0].nodeValue =
      loginUser.coinVolume[`${coin.symbol}`];
    document.querySelector(".btn-container").innerHTML =
      '<a class="sell-btn">매도</a>';
  }
};

//매수가격 변경 버튼
priceAdd.addEventListener("click", () => {
  // 임시코인의 현재가격+1
  coinPrice++;
  document.querySelector("#buyPrice").placeholder = coinPrice;
});

//매수가격 변경 버튼
priceSubtract.addEventListener("click", () => {
  // **warning** placrholder는 string이기 때문에 약한 비교로 비교해줌 강한 비교로 하면 자료구조도 비고해서 false가 나옴
  if (coinPrice == 0) {
    alert("이미 0개 입니다.");
    return;
  }
  coinPrice--;
  document.querySelector("#buyPrice").placeholder = coinPrice;
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
  orderSum.placeholder = (parseFloat(value) / 100) * parseInt(coinPrice);
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
        parseInt(coinPrice);
    });
}
//입력이 가능해진 input에 숫자를 입력 할 때마다 실행
tradeVolume.addEventListener("input", () => {
  let input = document.getElementById("tradeVolume").value;

  orderSum.placeholder = parseInt(coinPrice) * parseFloat(input);
});

//매수 함수
const buyFunction = () => {
  console.log(loginUser.account);
  loginUser.account -= parseInt(orderSum.placeholder);
  console.log(loginUser.account);
  setLoginUser(loginUser);
  let tempUser = getLocalStorage("userInformation").map((a) => {
    if (loginUser.id == a.id) {
      return loginUser;
    } else {
      return a;
    }
  });
  console.log(tempUser);
  //   setLocalStorage("userInformation", []);
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
setInterval(() => {
  if (randomPrices.length == 6) {
    // 평균가가 6초때 나오므로 length가 6일때
    console.log(coins[coinIndex].currentPrice);
    // 해당하는 인덱스의 현재가를 평균가로 바꿔줌
    coins[coinIndex].currentPrice = getAveragePrice(randomPrices);
    // html에 나타내기 위하여 coinPrice또한 바꿔줌
    coinPrice = coins[coinIndex].currentPrice;
    // html수정
    document.querySelector("#buyPrice").placeholder = coinPrice;

    setLocalStorage("coinInformation", coins);
  }
}, 1000);

allCoinList.forEach((a, index) => {
  a.addEventListener("click", (i) => {
    coinIndex = index + 1;
    // 해당하는 인덱스의 현재가를 평균가로 바꿔줌
    console.log(coins[coinIndex].currentPrice);
    // 만약 평균가가 나오지 않았다면(6초전에) 무효
    if (getAveragePrice(randomPrices)) {
    } else {
      coins[coinIndex].currentPrice = getAveragePrice(randomPrices);
      // html에 나타내기 위하여 coinPrice또한 바꿔줌
      coinPrice = coins[coinIndex].currentPrice;
      // html수정
      document.querySelector("#buyPrice").placeholder = coinPrice;
    }
  });
});
