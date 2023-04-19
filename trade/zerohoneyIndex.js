let tabItem = document.querySelectorAll(".tab-item");
let tabToggle = [false, false, false, false];
let loginUser=
tabItem.forEach((a, i) => {
  a.addEventListener("click", () => {
    tabItem.forEach((a, i) => {
      a.style.borderBottom = "";
      tabToggle[i] = false;
    });
    a.style.borderBottom = "2px solid red";
    tabToggle[i] = true;
    changeTabContent()
  });
});

const changeTabContent = (a, i) => {
  if (tabToggle[0]) {
    document.querySelector(".buy-price-container > span").innerHTML =
      "매수 가격";
    document.querySelector(".currency-units").innerHTML =
      "krw";
  }else if(tabToggle[1]){
    document.querySelector(".buy-price-container > span").innerHTML =
      "매도 가격";
      document.querySelector(".currency-units").innerHTML =
      "steem";
  }
};
