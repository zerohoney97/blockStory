// --------임시 데이터----------------
let tempCurrentPrice = 1000;
let tradingVolume = 8;
//임시 데이터인 이재용을 가져와 nowLogin 변경
localStorage.setItem(
  "nowLogin",
  JSON.stringify(JSON.parse(localStorage.getItem("userInformation"))[21])
);
// nowLogin을 가져온다. 실제 페이지에선 실제 데이터를 가져오지만, 현재는 임시데이터를 가져오게 된다.
let loginUser = JSON.parse(localStorage.getItem("nowLogin"));

// 유저가 거래했다는 임의의 코인
let tradeCoin = new Coin(SZC, 5, loginUser.id);

// --------임시 데이터----------------

// 매수/매도 가격, 이는 현재가의 평균값이면 5초마다 갱신된다. 연수한테 받아 와야함
let averagePrice = 2000;
//현재 로그인한 유저를 가져오는 함수

// 로그인한 유저 확인
function checkLoginUSer() {
  alert("이름은" + loginUser.name + "계좌잔액은" + loginUser.account);
}

// 현재 로그인한 유저의 정보를 구조분해 할당으로 가져옴
function getUserInformation() {
  let name = loginUser.name;
  let account = loginUser.account;
  let coin = loginUser.coin;
  let email = loginUser.email;
  let id = loginUser.id;
  let isAdmin = loginUser.isAdmin;
  let tradeSum = loginUser.tradeSum;
  return { name, account, coin, email, id, isAdmin, tradeSum };
}

// 구조분해 할당으로 변수에 할당

let { name, account, coin, email, id, isAdmin, tradeSum } =
  getUserInformation();

//   매수하는 함수 tradeCoinReal은 실제 코인
const calculateBuy = (userId, userAccount,tradeCoinReal ) => {
  let newUserData = JSON.parse(localStorage.getItem("userInformation")).map(
    (a) => {
      if (a.id === userId) {
        // 계좌 계산
        a.account =
          userAccount -
          tradeCoin.quantity * parseInt(tradeCoin.coinObj["currentPrice"]);
        //   코인 userInformation에 추가
        a.coin = [...a.coin, tradeCoin];
        // 거래 횃수 +1
        a.tradeSum += 1;
      }
      return a;
    }
  );
  localStorage.setItem("userInformation", JSON.stringify(newUserData));

  console.log(newUserData);
};

// 매도하는 함수
const calculateSell = (userId, userAccount, tradeCoinReal) => {
    let coinVolume=0;
    loginUser[coin].forEach(a => {
        if (a[coinObj][symbol]===tradeCoin.coinObj[symbol]) {
            coinVolume+=a[quantity];
        }
    });
  let newUserData = JSON.parse(localStorage.getItem("userInformation")).map(
    (a) => {
      if (a.id === userId) {

      }
      return a;
    }
  );
//   histories하나 만들자
//   localStorage.setItem("userInformation", JSON.stringify(newUserData));

  console.log(newUserData);
};
calculateBuy(id, account);
checkLoginUSer();
