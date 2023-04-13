
let image = document.getElementById('dotIcon');
let image2 = document.getElementById('arrowIcon');
let image3 = document.getElementById('bellIcon');
let image4 = document.getElementById('coinIcon');
let appimg = document.getElementById('appImg');
let appimg2 = document.getElementById('appImg2');
let imageSub = document.getElementById('danTa');

appimg.style.display='none';
appimg2.style.display='none';
imageSub.style.display='none';

function dot() {
    image.src='./img/lock.png';
    image2.src='./img/dot.png';
    image3.src='./img/dot.png';
    image4.src='./img/dot.png';
    appimg.style.display='block';
    appimg2.style.display='none';
    imageSub.style.display='none';
}
function dot2() {
    image.src='./img/dot.png';
    image2.src='./img/arrow.png';
    image3.src='./img/dot.png';
    image4.src='./img/dot.png';
    appimg.style.display='none';
    appimg2.style.display='block';
    imageSub.style.display='none';
}
function dot3() {
    image.src='./img/dot.png';
    image2.src='./img/dot.png';
    image3.src='./img/bell.png';
    image4.src='./img/dot.png';
    appimg.style.display='none';
    appimg2.style.display='none';
    imageSub.style.display='block';
}
function dot4() {
    image.src='./img/dot.png';
    image2.src='./img/dot.png';
    image3.src='./img/dot.png';
    image4.src='./img/coin.png';
    appimg.style.display='none';
    appimg2.style.display='none';
    imageSub.style.display='none';
}
