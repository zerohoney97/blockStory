let divBtn = document.getElementById("btn");
let modal = document.getElementById("modal");
let addBtn = document.getElementById("add-btn");
let closeBtn = document.getElementById("close-btn");
let input = document.getElementById("text");
let subContainer = document.querySelector(".sub-container");
let list = document.querySelector(".list");
let textarea = document.getElementById("text2");
let board = getLocalStorage("board");
let tit = document.getElementById("tit");
let titClass = document.querySelectorAll(".tit");
let titleCon = document.getElementById("title-con");
let conClose = document.getElementById("con-close");
let conText = document.querySelector(".content-text");
let delBtn = document.getElementById("delBtn");
let deleteIndex=0;

//---페이지 네이션
let currentPage = 1;
let totalCount = 50;
let listCount = 12;
let limit = 3;
//------

// document.querySelectorAll(".current-page").forEach((a) => {
//   a.addEventListener("click", (e) => {
//     currentPage = parseInt(e.target.getAttribute("value"));
//     document.querySelector(".active").classList.remove("active");
//     document.querySelector("#page" + currentPage).classList.add("active");
//     changePage();
//   });
// });
// // 리스트가 10개 이상일때
// if (list.length > listCount) {
//   if (list.length % listCount != 0) {
//     totalCount = Math.floor(list.length / listCount) + 1;
//     //리스트가 10개일때
//   } else if (list.length % listCount == 0) {
//     totalCount = list.length / listCount;
//   }
// } else {
//   totalpage = 1;
// }
// document.querySelector("#page1").innerHTML = currentPage;
// document.querySelector("#page2").innerHTML = currentPage + 1;
// document.querySelector("#page3").innerHTML = currentPage + 2;
// //----제목 클릭하면 content 나오는 함수

// // titClass.addEventListener("click",function(){
// //         titleCon.style.display= "block";
// //     })

// //모든배열 요소에 이벤트 추가
// conClose.addEventListener("click", function () {
//   titleCon.style.display = "none";
// });
// //---------------글쓰기 버튼 click
// divBtn.addEventListener("click", function () {
//   modal.style.display = "block";
// });
// addBtn.addEventListener("click", function () {
//   location.reload();
//   modal.style.display = "none";
//   // console.log(input.value)
//   // console.log(textarea.value)
//   let data = JSON.parse(localStorage.getItem("nowLogin"));
//   board = JSON.parse(localStorage.getItem("board"));
//   let num = index();
//   let obj = {
//     num: num,
//     title: input.value,
//     writer: data.name,
//     content: textarea.value,
//     id: data.id,
//   };
//   if (board) {
//     board.push(obj);
//     setLocalStorage("board", board);
//     subContainer.innerHTML = "";
//     changePage();
//   } else {
//     setLocalStorage("board", [obj]);
//     subContainer.innerHTML = "";
//     let _list = document.createElement("div");
//     _list.classList.add("list");
//     let numElement = document.createElement("div");
//     numElement.className = "num";
//     numElement.innerHTML = obj.num;

//     let titElement = document.createElement("div");
//     titElement.className = "tit";
//     titElement.innerHTML = obj.title;

//     let writerElement = document.createElement("div");
//     writerElement.className = "writer";
//     writerElement.innerHTML = obj.writer;

//     // let viewElement = document.createElement("div");
//     // viewElement.className = "view";
//     // viewElement.innerHTML = obj.view

//     _list.append(numElement);
//     _list.append(titElement);
//     _list.append(writerElement);
//     // _list.append(viewElement)
//     subContainer.append(_list);
//   }
// });
// closeBtn.addEventListener("click", function () {
//   modal.style.display = "none";
// });

if (board) {
  // 연수 삽질 할 곳
  if (board.length<12) {
    for (let i = (currentPage - 1) * 12; i <board.length ; i++) {
        let _list = document.createElement("div");
        _list.classList.add("list");
        let numElement = document.createElement("div");
        numElement.className = "num";
        numElement.innerHTML = board[i].num;
    
        let titElement = document.createElement("div");
        titElement.className = "tit";
        titElement.innerHTML = board[i].title;
    
        let writerElement = document.createElement("div");
        writerElement.className = "writer";
        writerElement.innerHTML = board[i].writer;
    
        // let viewElement = document.createElement("div");
        // viewElement.className = "view";
        // viewElement.innerHTML = board[i].view
    
        _list.append(numElement);
        _list.append(titElement);
        _list.append(writerElement);
        // _list.append(viewElement)
        subContainer.append(_list);
        //중요
        titClass = document.querySelectorAll(".tit");
        titClass[i + 1].addEventListener("click", function () {
          conText.innerHTML = board[i].content;
          deleteIndex=i;
          titleCon.style.display = "block";
        });
       
      }
  }else{
    for (let i = (currentPage - 1) * 12; i < currentPage * 12; i++) {
        let _list = document.createElement("div");
        _list.classList.add("list");
        let numElement = document.createElement("div");
        numElement.className = "num";
        numElement.innerHTML = board[i].num;
    
        let titElement = document.createElement("div");
        titElement.className = "tit";
        titElement.innerHTML = board[i].title;
    
        let writerElement = document.createElement("div");
        writerElement.className = "writer";
        writerElement.innerHTML = board[i].writer;

    
        // let viewElement = document.createElement("div");
        // viewElement.className = "view";
        // viewElement.innerHTML = board[i].view
    
        _list.append(numElement);
        _list.append(titElement);
        _list.append(writerElement);
        // _list.append(viewElement)
        subContainer.append(_list);
        //중요
        titClass = document.querySelectorAll(".tit");
        titClass[i + 1].addEventListener("click", function () {
          conText.innerHTML = board[i].content;
          deleteIndex=i;
          titleCon.style.display = "block";
        });
       
      }
  }
  
}
delBtn.addEventListener("click",function(e){
    console.log('클릭')
    //보드 안에 있는 특정한 key의 value를 삭제
   //get으로 다 가져와=> 그 중에서 삭제할 게시판의 고유 아이디를 가진 객체를 찾아
     //그 다음 그 객체의 content를 지우고, 다시 setLocalstorage로 저장
    let boardArr= JSON.parse(localStorage.getItem("board"));
   console.log(boardArr[deleteIndex])
    

 })

function index() {
  if (board && board.length > 0) {
    return board.length + 1;
  } else {
    return 1;
  }
}
const validatePagination = () => {
  if (12 * currentPage > board.length) {
    return true;
  } else {
    return false;
  }
};

const changePage = () => {
  if (validatePagination()) {
    subContainer.innerHTML = "";
    let j = 0;
    for (let i = (currentPage - 1) * 12; i < board.length; i++) {
      let _list = document.createElement("div");
      _list.classList.add("list");
      let numElement = document.createElement("div");
      numElement.className = "num";
      numElement.innerHTML = board[i].num;

//       let titElement = document.createElement("div");
//       titElement.className = "tit";
//       titElement.innerHTML = board[i].title;

//       let writerElement = document.createElement("div");
//       writerElement.className = "writer";
//       writerElement.innerHTML = board[i].writer;

//       // let viewElement = document.createElement("div");
//       // viewElement.className = "view";
//       // viewElement.innerHTML = board[i].view

      _list.append(numElement);
      _list.append(titElement);
      _list.append(writerElement);
      // _list.append(viewElement)
      subContainer.append(_list);
      titClass = document.querySelectorAll(".tit");
      titClass[j].addEventListener("click", function () {
        conText.innerHTML = board[i].content;
        console.log('asd')
        titleCon.style.display = "block";
      });
      j++;
    }
    // 반장의 아이디어입니다
    // titClass = document.querySelectorAll('.tit');
    // console.log(titClass)
    // titClass.forEach((a) => {

    //     a.addEventListener("click", function () {
    //         titleCon.style.display = "block";
    //     })
    // })
  } else {
    let j = 0;

    subContainer.innerHTML = "";
    for (let i = (currentPage - 1) * 12; i < currentPage * 12; i++) {
      let _list = document.createElement("div");
      _list.classList.add("list");
      let numElement = document.createElement("div");
      numElement.className = "num";
      numElement.innerHTML = board[i].num;

//       let titElement = document.createElement("div");
//       titElement.className = "tit";
//       titElement.innerHTML = board[i].title;

//       let writerElement = document.createElement("div");
//       writerElement.className = "writer";
//       writerElement.innerHTML = board[i].writer;

//       // let viewElement = document.createElement("div");
//       // viewElement.className = "view";
//       // viewElement.innerHTML = board[i].view

//       _list.append(numElement);
//       _list.append(titElement);
//       _list.append(writerElement);
//       // _list.append(viewElement)
//       subContainer.append(_list);
//       titClass = document.querySelectorAll(".tit");
//       titClass[j].addEventListener("click", function () {
//         conText.innerHTML = board[i].content;
//         titleCon.style.display = "block";
//       });
//       j++;
//     }
//   }
// };

// //----active---

document.querySelector("#pre").addEventListener("click", function () {
  currentPage -= 1;
  if (currentPage < 1) {
    currentPage = 1;
  }
  document.querySelector(".active").classList.remove("active");
  document.querySelector("#page" + currentPage).classList.add("active");
  changePage();
});
document.querySelector("#next").addEventListener("click", function () {
  currentPage += 1;
  if (currentPage > Math.floor(board.length / 12) + 1) {
    currentPage = Math.floor(board.length / 12) + 1;
  }
  document.querySelector(".active").classList.remove("active");
  document.querySelector("#page" + currentPage).classList.add("active");
  changePage();
});

//---거래소에서 로그아웃을 누르면 처음main으로 넘어가게 하는함수
// 관리자일때
console.log(JSON.parse(localStorage.getItem("nowLogin")) )
 if(JSON.parse(localStorage.getItem("nowLogin")).isAdmin == true){
    document.getElementById("logOut").innerHTML = "LogOut"
    document.getElementById("myPage").innerHTML = "Admin"
    let logOut = document.getElementById("logOut");
    logOut.href = "../main/main.html"
    let admin = document.getElementById("myPage");
    console.log(admin)
    admin.href = "../admin/admin.html";
    logOut.onclick = function(){
     window.localStorage.removeItem('nowLogin');  
    }
    // 회원일때
 }else if(JSON.parse(localStorage.getItem("nowLogin")).isAdmin==false){
    document.getElementById("logOut").innerHTML = "로그아웃"
    document.getElementById("myPage").innerHTML = "My page"
    let logOut = document.getElementById("logOut");
    logOut.href = "../main/main.html"
    let mypage = document.getElementById("myPage");
    mypage.href = "../mypage/myPage.html"
    logOut.onclick = function(){
        window.localStorage.removeItem('nowLogin')
     }
 }else{

 }
 //---q&a .수정버튼 만들기 
 // 삭제버튼

