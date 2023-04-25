"use strict";

var divBtn = document.getElementById("btn");
var modal = document.getElementById("modal");
var addBtn = document.getElementById("add-btn");
var closeBtn = document.getElementById("close-btn");
var input = document.getElementById("text");
var subContainer = document.querySelector(".sub-container");
var list = document.querySelector(".list");
var textarea = document.getElementById("text2");
var board = getLocalStorage("board");
var tit = document.getElementById("tit");
var titClass = document.querySelectorAll(".tit");
var titleCon = document.getElementById("title-con");
var conClose = document.getElementById("con-close");
var conText = document.querySelector(".content-text");
var delBtn = document.getElementById("delBtn");
var deleteIndex = 0; //---페이지 네이션

var currentPage = 1;
var totalCount = 50;
var listCount = 12;
var limit = 3; //------
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
  if (board.length < 12) {
    var _loop = function _loop(i) {
      var _list = document.createElement("div");

      _list.classList.add("list");

      var numElement = document.createElement("div");
      numElement.className = "num";
      numElement.innerHTML = board[i].num;
      var titElement = document.createElement("div");
      titElement.className = "tit";
      titElement.innerHTML = board[i].title;
      var writerElement = document.createElement("div");
      writerElement.className = "writer";
      writerElement.innerHTML = board[i].writer; // let viewElement = document.createElement("div");
      // viewElement.className = "view";
      // viewElement.innerHTML = board[i].view

      _list.append(numElement);

      _list.append(titElement);

      _list.append(writerElement); // _list.append(viewElement)


      subContainer.append(_list); //중요

      titClass = document.querySelectorAll(".tit");
      titClass[i + 1].addEventListener("click", function () {
        conText.innerHTML = board[i].content;
        deleteIndex = i;
        titleCon.style.display = "block";
      });
    };

    for (var i = (currentPage - 1) * 12; i < board.length; i++) {
      _loop(i);
    }
  } else {
    var _loop2 = function _loop2(_i) {
      var _list = document.createElement("div");

      _list.classList.add("list");

      var numElement = document.createElement("div");
      numElement.className = "num";
      numElement.innerHTML = board[_i].num;
      var titElement = document.createElement("div");
      titElement.className = "tit";
      titElement.innerHTML = board[_i].title;
      var writerElement = document.createElement("div");
      writerElement.className = "writer";
      writerElement.innerHTML = board[_i].writer; // let viewElement = document.createElement("div");
      // viewElement.className = "view";
      // viewElement.innerHTML = board[i].view

      _list.append(numElement);

      _list.append(titElement);

      _list.append(writerElement); // _list.append(viewElement)


      subContainer.append(_list); //중요

      titClass = document.querySelectorAll(".tit");

      titClass[_i + 1].addEventListener("click", function () {
        conText.innerHTML = board[_i].content;
        deleteIndex = _i;
        titleCon.style.display = "block";
      });
    };

    for (var _i = (currentPage - 1) * 12; _i < currentPage * 12; _i++) {
      _loop2(_i);
    }
  }
}

delBtn.addEventListener("click", function (e) {
  console.log("클릭"); //보드 안에 있는 특정한 key의 value를 삭제
  //get으로 다 가져와=> 그 중에서 삭제할 게시판의 고유 아이디를 가진 객체를 찾아
  //그 다음 그 객체의 content를 지우고, 다시 setLocalstorage로 저장

  var boardArr = JSON.parse(localStorage.getItem("board"));
  console.log(boardArr[deleteIndex]);
});

function index() {
  if (board && board.length > 0) {
    return board.length + 1;
  } else {
    return 1;
  }
}

var validatePagination = function validatePagination() {
  if (12 * currentPage > board.length) {
    return true;
  } else {
    return false;
  }
};

var changePage = function changePage() {
  if (validatePagination()) {
    subContainer.innerHTML = "";
    var j = 0;

    var _loop3 = function _loop3(_i2) {
      var _list = document.createElement("div");

      _list.classList.add("list");

      var numElement = document.createElement("div");
      numElement.className = "num";
      numElement.innerHTML = board[_i2].num; //       let titElement = document.createElement("div");
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

      _list.append(writerElement); // _list.append(viewElement)


      subContainer.append(_list);
      titClass = document.querySelectorAll(".tit");
      titClass[j].addEventListener("click", function () {
        conText.innerHTML = board[_i2].content;
        console.log("asd");
        titleCon.style.display = "block";
      });
      j++;
    };

    for (var _i2 = (currentPage - 1) * 12; _i2 < board.length; _i2++) {
      _loop3(_i2);
    } // 반장의 아이디어입니다
    // titClass = document.querySelectorAll('.tit');
    // console.log(titClass)
    // titClass.forEach((a) => {
    //     a.addEventListener("click", function () {
    //         titleCon.style.display = "block";
    //     })
    // })

  } else {
    var _j = 0;
    subContainer.innerHTML = "";

    for (var _i3 = (currentPage - 1) * 12; _i3 < currentPage * 12; _i3++) {
      var _list = document.createElement("div");

      _list.classList.add("list");

      var numElement = document.createElement("div");
      numElement.className = "num";
      numElement.innerHTML = board[_i3].num; //       let titElement = document.createElement("div");
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
      }); //---거래소에서 로그아웃을 누르면 처음main으로 넘어가게 하는함수
      // 관리자일때

      console.log(JSON.parse(localStorage.getItem("nowLogin")));

      if (JSON.parse(localStorage.getItem("nowLogin")).isAdmin == true) {
        document.getElementById("logOut").innerHTML = "LogOut";
        document.getElementById("myPage").innerHTML = "Admin";
        var logOut = document.getElementById("logOut");
        logOut.href = "../main/main.html";
        var admin = document.getElementById("myPage");
        console.log(admin);
        admin.href = "../admin/admin.html";

        logOut.onclick = function () {
          window.localStorage.removeItem("nowLogin");
        }; // 회원일때

      } else if (JSON.parse(localStorage.getItem("nowLogin")).isAdmin == false) {
        document.getElementById("logOut").innerHTML = "로그아웃";
        document.getElementById("myPage").innerHTML = "My page";

        var _logOut = document.getElementById("logOut");

        _logOut.href = "../main/main.html";
        var mypage = document.getElementById("myPage");
        mypage.href = "../mypage/myPage.html";

        _logOut.onclick = function () {
          window.localStorage.removeItem("nowLogin");
        };
      } else {} //---q&a .수정버튼 만들기
      // 삭제버튼

    }
  }
};