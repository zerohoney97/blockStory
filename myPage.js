let nickName = document.querySelector('.accessInfo span');
let changNicBtn = document.querySelector('.changeNic');
let checkBtn = document.querySelector('.nickName button');

let nickPopup = document.querySelector('.nickName');


// changNicBtn.addEventListener('click', () => {
//     nickPopup.classList.add('active');
// })

// 닉네임 변경 팝업창 활성화
function popup() {
    document.body.classList.toggle('active');
    nickPopup.classList.toggle('active');
}



function isNickname(input) {
    const regex = /^[A-Za-z0-9]{2,12}$/;
    return regex.test(input);
}

checkBtn.onclick = function () {
    let userNic = document.querySelector('.userNic').value;
    console.log(userNic);
    if (!isNickname(userNic)) {
        document.querySelector('.cautionText').innerHTML = '닉네임 형식이 올바르지 않습니다.<br>(최소 2자 최대 12자 및 특수문자/띄어쓰기 불가)'
    }
}