let coinsInTradeJS = getLocalStorage("coinInformation");
let coinStystems = getLocalStorage("priceRangeInfo");
let coinCurrentArray = [
  // 코인의 현재가를 map으로 반환하고 slice로 원화를 잘라줌
  ...coinsInTradeJS
    .map((a, i) => {
      return a.currentPrice;
    })
    .slice(1),
];

coinStystems.forEach((a, i) => {

  if (i != 0) {
    // console.log(i,a)
    setInterval(() => {
        // 1초마다 코인의 현재 가격들을 변경
      coinCurrentArray[i - 1] = getRandomPrice(
        coinsInTradeJS[i],
        coinStystems[i]
      );

    }, 1000);
  }
});

// 1chori.js에서 매개변수만 바꾸고 로직은 그대로.
const getRandomPrice = (coin, coinStystem) => {
  const min = coinStystem.min;
  const max = coinStystem.max;

  if (iff == 0) {
    cp = Number(coinStystem.currentPrice);
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
  cp = randomPrice;

  return randomPrice;
};
