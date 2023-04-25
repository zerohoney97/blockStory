"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var coinsInTradeJS = getLocalStorage("coinInformation");
var coinStystems = getLocalStorage("priceRangeInfo");
var realRandomPrice;
var iff = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cp; //현재 보고있는 코인의 인덱스, 다른코인이 상폐돼도 간섭 받지 않기 위헤 만듦 1chori에서 1부터시작,원화가 없음

var nowCoin = 1;

var coinCurrentArray = _toConsumableArray(coinsInTradeJS.map(function (a, i) {
  return a.currentPrice;
}).slice(1));

coinStystems.forEach(function (a, i) {
  if (i != 0) {
    // console.log(i,a)
    setInterval(function () {
      // 1초마다 코인의 현재 가격들을 변경 배열에 저장한다.
      coinCurrentArray[i - 1] = getRandomPrice(coins[i], coinStystems[i], i - 1);
      coinsInTradeJS[i].currentPrice = coinCurrentArray[i - 1]; // 코인의 현재가를 미국감으로 바꿔주는 구문.이를 통해 iff와 randomprice를 if문에서 폐지로 바꿔줄 수 있다.

      coins[i].currentPrice = coinCurrentArray[i - 1];
      console.log(coins);
      setLocalStorage("coinInformation", coinsInTradeJS);
    }, 1000);
  }
}); // 1chori.js에서 매개변수만 바꾸고 로직은 그대로.
// i는 1부터 시작함

var getRandomPrice = function getRandomPrice(coin, coinStystem, i) {
  var min = coinStystem.min;
  var max = coinStystem.max;
  console.log(nowCoin); // 코인에 따른 변화폭 조절 조건문

  if (coinsInTradeJS[i].symbol == "DSC" || coinsInTradeJS[i].symbol == "HGC" || coinsInTradeJS[i].symbol == "GBC" || coinsInTradeJS[i].symbol == "DGC") {
    if (iff[i] == 0) {
      cp = Number(coin.currentPrice);
    } else {
      cp = iff[i];
    } // 1부터 10까지의 랜덤 숫자


    var ten_chance = Math.floor(Math.random() * 20 + 1);

    if (ten_chance == 10) {
      // 10%      500기준 min~200 and 10000~max
      var two = Math.floor(Math.random() * 2 + 1);

      if (two == 1) {
        // randomPrice = min;
        // min ~ 10% 까지의 값
        randomPrice = Math.floor(Math.random() * (max * 0.1) + min);
      } else {
        // randomPrice = max;
        // max ~ max밑의 10% 값
        randomPrice = 0;
      } // console.log("결과값: ", randomPrice);

    } else {
      // 90%      500기준 300 ~ 700
      var half = cp / 2; // ???

      randomPrice = Math.floor(Math.random() * (cp + half - (cp - half) + 1) + (cp - half));

      if (randomPrice > max) {
        // randomPrice = max;
        // max값보다 큰 값이 나와버리면 max밑20% ~ max 값까지 랜덤값 출력
        randomPrice = Math.floor(Math.random() * (max * 0.2 + 1) + max * 0.8);
      } // 만약 보고 있다면 강제 뒤로가기


      if (coins[i] == "미국감" && nowCoin == i) {
        // 상장폐지를 코인 리스트에서 표시해주기
        iff[i] = "폐지";
        randomPrice = "폐지";
        alert("너희 코인 망했다며?ㅋㅋㅋㅋ");
        window.location.href = "../main/main.html";
      }
    }

    iff[i] = randomPrice; // 일단 0이하면 상페를 시킴 보든 안보든 유저의 정보를 바꿈,코인의 정보를 바꿈

    if (randomPrice <= 0) {
      console.log(coin[i], "위쪽");
      coins[i] = "미국감";
      loginUser.coinVolume[coins[i]["symbol"]] = 0;
      var tempUser = JSON.parse(localStorage.getItem("userInformation")).map(function (a) {
        if (a.id == loginUser.id) {
          a = loginUser;
          return a;
        } else {
          return a;
        }
      });
      localStorage.setItem("userInformation", JSON.stringify(tempUser));
      localStorage.setItem("coinInformation", JSON.stringify(coins));
    }

    return randomPrice;
  } else {
    /*********************************************************************
    여기서 부터는 떡상,한강,국뽕,다이진 코인 의외의 확률을 정하는 곳입니다.
    *********************************************************************/
    if (iff[i] == 0) {
      cp = Number(coin.currentPrice);
    } else {
      cp = iff[i];
    } // 1부터 10까지의 랜덤 숫자


    var _ten_chance = Math.floor(Math.random() * 20 + 1); // 전 가격이 최대라면 1/3 띵 시켜버리고 통과 ㅎㅎ


    if (randomPrice == max) {
      randomPrice = randomPrice * (7 / 10);
      iff[i] = randomPrice;
      return randomPrice;
    }

    if (_ten_chance == 10) {
      // 10%      500기준 min~200 and 10000~max
      var _two = Math.floor(Math.random() * 2 + 1);

      if (_two == 1) {
        // randomPrice = min;
        // min ~ 10% 까지의 값
        randomPrice = Math.floor(cp * 2);
      } else {
        // randomPrice = max;
        // max ~ max밑의 10% 값
        randomPrice = Math.floor(cp * 0.2);
      } // console.log("결과값: ", randomPrice);

    } else {
      // 90%      500기준 300 ~ 700
      var _half = cp / 2; // 밸런스패치, 올라갈 확률이 좀 더 많음


      randomPrice = Math.floor(cp + _half + _half / 8 - (Math.random() * cp + 1));

      if (randomPrice >= max) {
        // randomPrice = max;
        // max값보다 큰 값이 나와버리면 max밑20% ~ max 값까지 랜덤값 출력
        randomPrice = max;
      }

      if (coins[i] == "미국감" && nowCoin == i) {
        // 상장폐지를 코인 리스트에서 표시해주기
        iff[i] = "폐지";
        randomPrice = "폐지";
        alert("너희 코인 망했다며?ㅋㅋㅋㅋ");
        window.location.href = "../main/main.html";
      }
    }

    iff[i] = randomPrice; // 일단 0이하면 상페를 시킴 보든 안보든 유저의 정보를 바꿈,코인의 정보를 바꿈

    if (randomPrice <= 0) {
      console.log(coin[i], "아래쪽");
      coins[i] = "미국감";
      loginUser.coinVolume[coins[i]["symbol"]] = 0;

      var _tempUser = JSON.parse(localStorage.getItem("userInformation")).map(function (a) {
        if (a.id == loginUser.id) {
          a = loginUser;
          return a;
        } else {
          return a;
        }
      });

      localStorage.setItem("userInformation", JSON.stringify(_tempUser));
      localStorage.setItem("coinInformation", JSON.stringify(coins));
    }

    return randomPrice;
  }
};