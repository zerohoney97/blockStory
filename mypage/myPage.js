

let nickName = document.querySelector('.accessInfo span');
let changNicBtn = document.querySelector('.changeNic');
let subBtn = document.querySelector('.submit');
let closeBtn = document.querySelector('.close');
let nickPopup = document.querySelector('.nickName');

// 닉네임 변경 팝업창 활성화하는 함수
function popup() {
    document.body.classList.toggle('active');
    nickPopup.classList.toggle('active');
}

// 닉네임 팝업창 close
closeBtn.addEventListener('click', () => {
    document.body.classList.remove('active');
    nickPopup.classList.remove('active');
})

// 닉네임 변경 진행하는 함수
function isNickname(input) {
    const regex = /^[\uAC00-\uD7A3A-Za-z0-9]{2,12}$/;
    return regex.test(input);
}


subBtn.onclick = function () {
    let inputNic = document.querySelector('.inputNic').value;

    if (!isNickname(inputNic)) {
        document.querySelector('.cautionText').innerHTML = '닉네임 형식이 올바르지 않습니다.<br>(최소 2자 최대 12자 및 특수문자/띄어쓰기 불가)';
    } else {
        document.body.classList.remove('active');
        nickPopup.classList.remove('active');
        nickName.innerHTML = inputNic;
        localStorage.setItem('nickname', inputNic);
    }
}

let storageNic = localStorage.getItem('nickname');
if (storageNic) {
    nickName.innerHTML = storageNic;
}

//------------test----------------

let totalMoney = document.querySelector('.moneyNum');
let accountNum = document.querySelectorAll('.thisBank');
let Peter = JSON.parse(localStorage.getItem('link'));

accountNum.forEach(function (element) {
    element.innerHTML = Peter.accountNumber;
});
// console.log(accountNum);
console.log(Peter);
console.log(Peter.name);
console.log(Peter.coin.gyunil.name);

if (Peter) {
    nickName.innerHTML = Peter.name;
    totalMoney.innerHTML = Peter.account;
}

//--------------------------------

let accountPopup = document.querySelector('.bankAccount');
let closeAccount = document.querySelector('.close_account');
let coins = JSON.parse(localStorage.getItem('coinInformation'));


// 계좌관리 팝업창 활성화 함수
function bankPopup() {
    document.body.classList.toggle('active');
    accountPopup.classList.toggle('active');
    accountPopup.style.display = 'flex';
}



// 계좌관리 팝업창 close
closeAccount.addEventListener('click', () => {
    document.body.classList.remove('active');
    accountPopup.classList.remove('active');
    accountPopup.style.display = 'none';
})


// 코인 검색 기능


// 계좌관리 내 코인소유량 표시

let coinName = document.querySelector('.list-descrip .name');
let coinPercentage = document.querySelector('.list-descrip .percent');
let coinQuantity = document.querySelector('.list-descrip .haveNum');
let listDescrip = document.querySelectorAll('.list-descrip');


listDescrip.forEach((a, i) => {
    listDescrip[0].style.backgroundColor = 'rgb(241, 236, 236)';
    a.addEventListener('click', () => {

        // 선택되지 않은 인덱스의 배경섹 제거
        listDescrip.forEach((element, index) => {
            if (index !== i) {
                listDescrip[index].style.backgroundColor = '';
            }
        });

        listDescrip[i].style.backgroundColor = 'rgb(241, 236, 236)';
        document.querySelector('.tradeName span').innerHTML = coins[i].symbol;
        document.querySelector('.haveCoin span').innerHTML = coins[i].symbol;
        document.querySelector('.tradeContent span').innerHTML = coins[i].symbol;
        document.querySelector('.inputMoney span').innerHTML = coins[i].symbol;
        document.querySelector('.out-money span').innerHTML = coins[i].symbol;

    })
})

function MyCoin(coin, unit, percentage, quantity) {
    this.coin = coin;
    this.unit = unit;
    this.percentage = percentage;
    this.quantity = quantity;
}

let link3 = window.localStorage.getItem("link3");
console.log(JSON.parse(link3)[0]);
// console.log(link3[0]);

console.log(JSON.parse(link3)[0].name);

// let KRW = new MyCoin('원화', 'KRW', '0.00%', '0 KRW');
// let BTC = new MyCoin('비트코인', 'BTC', '100.00%', '0.000567 BTC');
// let coins = [KRW, BTC];

let coins = JSON.parse(link3);

coins.forEach((coin, index) => {
    if (listDescrip[index]) {
        listDescrip[index].querySelector('.name').innerHTML = coin.name;

    }
});


// 계좌관리 내 입출금 섹터

let chargeTab = document.querySelector('.charge');
let withdrawTab = document.querySelector('.withdraw');
let historyTab = document.querySelector('.history');

let chargeBox = document.querySelector('.charge-tab');
let withdrawBox = document.querySelector('.withdraw-tab');
let historyBox = document.querySelector('.history-tab');

let chargeLabel = document.getElementById('charge');
let withdrawLabel = document.getElementById('withdraw');
let historyLabel = document.getElementById('history');


chargeBox.style.display = 'block';
withdrawBox.style.display = 'none';
historyBox.style.display = 'none';
chargeLabel.style.backgroundColor = 'rgb(241, 236, 236)';
chargeLabel.style.fontWeight = 'bold';

function switchTabs(activeTab) {
    chargeBox.style.display = 'none';
    withdrawBox.style.display = 'none';
    historyBox.style.display = 'none';

    chargeLabel.style.backgroundColor = '';
    withdrawLabel.style.backgroundColor = '';
    historyLabel.style.backgroundColor = '';

    chargeLabel.style.fontWeight = '';
    withdrawLabel.style.fontWeight = '';
    historyLabel.style.fontWeight = '';

    if (activeTab === 'charge') {
        chargeBox.style.display = 'block';
        chargeLabel.style.backgroundColor = 'rgb(241, 236, 236)';
        chargeLabel.style.fontWeight = 'bold';
    } else if (activeTab === 'withdraw') {
        withdrawBox.style.display = 'block';
        withdrawLabel.style.backgroundColor = 'rgb(241, 236, 236)';
        withdrawLabel.style.fontWeight = 'bold';
    } else if (activeTab === 'history') {
        historyBox.style.display = 'block';
        historyLabel.style.backgroundColor = 'rgb(241, 236, 236)';
        historyLabel.style.fontWeight = 'bold';
    }
}

chargeTab.onclick = function () {
    switchTabs('charge');
};

withdrawTab.onclick = function () {
    switchTabs('withdraw');
};

historyTab.onclick = function () {
    switchTabs('history');
};


const dummyDataAccount = [
    {
        name: '입금',
        price: '1,000,000 KRW',
        state: '입금완료',
        date: '2023.04.13 10:02'
    },
    {
        name: '출금',
        price: '50,000 KRW',
        state: '출금완료',
        date: '2023.04.13 10:30'
    }
];

localStorage.setItem('userAccountInformation', JSON.stringify(dummyDataAccount));

let historyList = document.querySelectorAll('.history-tab ul');
let accounts = JSON.parse(localStorage.getItem('userAccountInformation'));

accounts.forEach((account, index) => {
    if (historyList[index]) {
        historyList[index].querySelector('.Name').innerHTML = account.name;
        historyList[index].querySelector('.Money').innerHTML = account.price;
        historyList[index].querySelector('.state').innerHTML = account.state;
        historyList[index].querySelector('.Date').innerHTML = account.date;

    }
})


