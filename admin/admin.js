// 회원가입한 사람들
// const u = new Map();
// u.set("이무헌", 27);
// u.set("고연수", 24);
// u.set("정원철", 32);
// u.set("조성현", 29);
// console.log(temp.next().value[0]);
// let [admin, age] = temp.next().value;
// let temp = u.entries();
// console.log(temp);
// window.localStorage.setItem("admin", [...temp].toString());
// const user = [
//     { name: "토니", age: 0, nickname: "아이언맨" },
//     { name: "스티브", age: 1, nickname: "캡아" },
//     { name: "나타샤", age: 2, nickname: "위도우" },
//     { name: "토르", age: 3, nickname: "천둥의신" },
//     { name: "배너", age: 4, nickname: "헐크" },
//     { name: "제임스", age: 5, nickname: "워머신" },
//     { name: "티찰라", age: 6, nickname: "블랙팬서" },
//     { name: "버키", age: 7, nickname: "윈터솔저" },
//     { name: "타노스", age: 8, nickname: "" },
//     { name: "피터", age: 9, nickname: "" },
//     { name: "베놈", age: 10, nickname: "" },
//     { name: "샌드맨", age: 11, nickname: "" },
//     { name: "데어데블", age: 12, nickname: "" },
//     { name: "퀼", age: 13, nickname: "" },
//     { name: "가모라", age: 14, nickname: "" },
//     { name: "드랙스", age: 15, nickname: "" },
//     { name: "캡틴마블", age: 16, nickname: "" },
//     { name: "클린트", age: 17, nickname: "" },
//     { name: "사무엘", age: 18, nickname: "" },
//     { name: "호크아이", age: 19, nickname: "" },
//     { name: "드랙스", age: 20, nickname: "" },
//     { name: "드랙스", age: 21, nickname: "" },
//     { name: "드랙스", age: 22, nickname: "" },
//     { name: "드랙스", age: 23, nickname: "" },
//     { name: "드랙스", age: 24, nickname: "" },
//     { name: "드랙스", age: 25, nickname: "" },
//     { name: "드랙스", age: 26, nickname: "" },
//     { name: "드랙스", age: 27, nickname: "" },
//     { name: "드랙스", age: 28, nickname: "" },
//     { name: "드랙스", age: 29, nickname: "" },

//   ];
// ----------------------------------------

// 내 코드
const master = window.localStorage.getItem("admin");
console.log(master);
const master2 = JSON.parse(master);
// console.log(master2);
console.log(JSON.stringify(master2[0]));
console.log(master2);
//   if (master2[0].name == "토니") {
//     document.querySelector("#c_loginid").innerHTML = master2[0].name;
//   }
let currentPage = 1;
let totalpage;
let perpage = 5;
if (master2.length > perpage) {
  if (master2.length % 5 != 0) {
    totalpage = Math.floor(master2.length / perpage) + 1;
    // alert(totalpage);
  }
} else {
  totalpage = 1;
  // alert(totalpage);
}

document.querySelector("#page1").innerHTML = currentPage;
document.querySelector("#page2").innerHTML = currentPage + 1;
document.querySelector("#page3").innerHTML = currentPage + 2;
for (let i = 0; i < master2.length % 5; i++) {
  if (master2[i]) {
    document.querySelector("#c_list" + i + " .c_left").innerHTML =
      master2[i].name;
    document.querySelector("#c_list" + i + " .c_lrcenter").innerHTML =
      master2[i].age;
    document.querySelector(
      "#c_list" + i + " .c_right"
    ).innerHTML = `<button onclick='btn(${JSON.stringify(
      master2[i]
    )})'>수락</button>`;
  }
}

document.querySelector("#page" + currentPage).classList.add("active");

// 이전
document.querySelector("#pre").addEventListener("click", function () {
  location.href = "csh.html#1";
  document.querySelector("#page1").href = "#1";
  document.querySelector("#page2").href = "#2";
  document.querySelector("#page3").href = "#3";
  for (let i = 1; i <= 3; i++) {
    document.querySelector("#page1").innerHTML = 1;
    document.querySelector("#page2").innerHTML = 2;
    document.querySelector("#page3").innerHTML = 3;
  }
});

// 다음
document.querySelector("#next").addEventListener("click", function () {
  location.href = "csh.html#4";
  document.querySelector("#page1").href = "#4";
  document.querySelector("#page2").href = "#5";
  document.querySelector("#page3").href = "#6";
  for (let i = 4; i <= 6; i++) {
    document.querySelector("#page1").innerHTML = 4;
    document.querySelector("#page2").innerHTML = 5;
    document.querySelector("#page3").innerHTML = 6;
  }
});

window.addEventListener("hashchange", function () {
  console.log(location.hash);
  let xx = location.hash;
  currentPage = xx.replace("#", "");
  if (currentPage == 1 || currentPage == 4) {
    document.querySelector("#page1").classList.add("active");
    document.querySelector("#page2").classList.remove("active");
    document.querySelector("#page3").classList.remove("active");
  } else if (currentPage == 2 || currentPage == 5) {
    document.querySelector("#page2").classList.add("active");
    document.querySelector("#page1").classList.remove("active");
    document.querySelector("#page3").classList.remove("active");
  } else if (currentPage == 3 || currentPage == 6) {
    document.querySelector("#page3").classList.add("active");
    document.querySelector("#page1").classList.remove("active");
    document.querySelector("#page2").classList.remove("active");
  }
  // let x = 2 * (currentPage - 1);
  let x = 5 * (currentPage - 1);

  for (let i = 0; i < perpage; i++) {
    if (master2[x]) {
      document.querySelector("#c_list" + i + " .c_left").innerHTML =
        master2[x].name;
      document.querySelector("#c_list" + i + " .c_lrcenter").innerHTML =
        master2[x].age;
      document.querySelector(
        "#c_list" + i + " .c_right"
      ).innerHTML = `<button onclick='btn(${master2[x]})'>수락</button>`;
      x++;
    }
  }
});

// 배열 가져오기

// for (let i = 0; i < perpage; i++) {
//   document.querySelector("#c_list" + i + " .c_left").innerHTML =
//     master2[i].name;
//   document.querySelector("#c_list" + i + " .c_lrcenter").innerHTML =
//     master2[i].age;
//   document.querySelector("#c_list" + i + " .c_right").innerHTML =
//     "<button onclick='btn(" + i + ")'>수락</button>";
// }

function btn(val) {
  console.log(val);
  let userDataArr = JSON.parse(localStorage.getItem("userInformation"));
  window.localStorage.setItem(
    "userInformation",
    JSON.stringify([...userDataArr, val])
  );

  // window.localStorage.setItem("allow", val);
}

// let div1 = document.createElement("div");
// div1.setAttribute("id", "c_l1");
// c_list.append(div1);
/*
      for (let i = 0; i < 1; i++) {
        let c_list = document.getElementById("c_list");
        // div0 첫번째 리스트
        let div0 = document.createElement("div");
        div0.setAttribute("id", "c_l"+ i);
        c_list.append(div0);
        let c_l0 = document.getElementById("c_l0");
        c_l0.style.display = "flex";
        // 리스트에 추가한 첫번째 id c_l0
  
        // c_l0 안에 c_left와 c_right
        let c_left = document.createElement("div");
        c_left.setAttribute("id", "c_left");
        c_l0.append(c_left);
  
        // c_center
        let c_lrcenter = document.createElement("div");
        c_lrcenter.setAttribute("id", "c_lrcenter");
        c_l0.append(c_lrcenter);
  
        // c_right
        let c_right = document.createElement("div");
        c_right.setAttribute("id", "c_right");
        c_l0.append(c_right);
  
        document.querySelector(`#c_l${i} #c_left`).innerHTML = master2[i].name;
        document.querySelector(`#c_l${i} #c_lrcenter`).innerHTML = master2[i].age;
        document.querySelector(`#c_l${i} #c_right`).innerHTML = "<button onclick='btn()'>수락</button>";
      }
  
      */

window.onload = function () {
  location.href = "admin.html#1";
};
