
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
//1.특정한 태그를 클릭했을 때  그 태그에 맞는 이미지를 띄워주면돼
//우리가 배운게 있었나??? 이미지를 띄워준다는건 어떤속성을 건드려야 햘까?
//주소를 건드리면된다
//태그 네게가 있고 이미지도 네게가 있고
//태그를 바꿔주면 되겠네=> 그렇다면 4개의 태그가 존재하겠지...
//이 때 내가 클릭한 태그만 보여져야 하고. 나머지 3개는 보여주면 안되겠네?
//그러면 보여줬다 안 보여줬다..어떤 속성이 있었지?
// display:none을 주면 3개가 안 보이겠네?
// 정리하면 내가 눌러준 태그는 display:block을 주고 나머지 3개는 display:none을 주면 되겠다!
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
    image.src='../img/dot.png';
    image2.src='./img/arrow.png';
    image3.src='./img/dot.png';
    image4.src='./img/dot.png';
    appimg.style.display='none';
    appimg2.style.display='block';
    imageSub.style.display='none';
}
function dot3() {
    image.src='../img/dot.png';
    image2.src='./img/dot.png';
    image3.src='./img/bell.png';
    image4.src='./img/dot.png';
    appimg.style.display='none';
    appimg2.style.display='none';
    imageSub.style.display='block';
}
function dot4() {
    image.src='../img/dot.png';
    image2.src='./img/dot.png';
    image3.src='./img/dot.png';
    image4.src='./img/coin.png';
    appimg.style.display='none';
    appimg2.style.display='none';
    imageSub.style.display='none';
}
