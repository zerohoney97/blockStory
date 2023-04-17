// 매수/매도 가격, 이는 현재가의 평균값이면 5초마다 갱신된다. 연수한테 받아 와야함
let averagePrice = 2000;
//현재 로그인한 유저를 가져오는 함수
let loginUser = JSON.parse(localStorage.getItem("nowLogin"));

function checkLoginUSer() {
  alert("이름은" + loginUser.name+'계좌잔액은'+localStorage.account);
}

checkLoginUSer();
