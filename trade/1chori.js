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




