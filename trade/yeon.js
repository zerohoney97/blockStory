let divBtn = document.getElementById("btn");
let modal = document.getElementById("modal");
let closeBtn = document.getElementById("close-btn")
let input = document.getElementById("text")
let subContainer = document.querySelector('.sub-container')
let list = document.querySelector('.list')
let textarea = document.getElementById("text2")
let board = getLocalStorage('board');
//---페이지 네이션
let currentPage = 1
let totalCount = 50
let listCount = 10
let limit = 3

document.querySelectorAll('.current-page').forEach((a) => {
    a.addEventListener('click', (e) => {
        currentPage =parseInt(e.target.getAttribute('value'));
        console.log(currentPage)
        document.querySelector(".active").classList.remove("active");
        document.querySelector("#page" + currentPage).classList.add("active");
        
        changePage()
    })
})
// 리스트가 10개 이상일때
if (list.length > listCount) {
    if (list.length % listCount != 0) {
        totalCount = Math.floor(list.length / listCount) + 1
        //리스트가 10개일때
    } else if (list.length % listCount == 0) {
        totalCount = list.length / listCount;
    }
} else {
    totalpage = 1;
}
document.querySelector("#page1").innerHTML = currentPage;
document.querySelector("#page2").innerHTML = currentPage + 1;
document.querySelector("#page3").innerHTML = currentPage + 2;
//---------------
divBtn.addEventListener("click", function () {
    modal.style.display = "block";
});
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    console.log(input.value)
    console.log(textarea.value)
    let data = JSON.parse(localStorage.getItem("nowLogin"))
    console.log(data)
    board = JSON.parse(localStorage.getItem("board"));
    let num = index();
    let obj = { num: num, title: input.value, writer: data.name, view: '1', content: textarea.value, id: data.id }
    console.log(obj);
    if (board) {
        board.push(obj);
        setLocalStorage('board', board)
        subContainer.innerHTML = ''
       changePage()
        // for (let i = 0; i < board.length; i++) {
        //     let _list = document.createElement('div');
        //     _list.classList.add('list')
        //     let numElement = document.createElement("div");
        //     numElement.className = "num";
        //     numElement.innerHTML = board[i].num

        //     let titElement = document.createElement("div");
        //     titElement.className = "tit";
        //     titElement.innerHTML = board[i].title

        //     let writerElement = document.createElement("div");
        //     writerElement.className = "writer";
        //     writerElement.innerHTML = board[i].writer

        //     let viewElement = document.createElement("div");
        //     viewElement.className = "view";
        //     viewElement.innerHTML = board[i].view

        //     _list.append(numElement)
        //     _list.append(titElement)
        //     _list.append(writerElement)
        //     _list.append(viewElement)
        //     subContainer.append(_list)
        // }

    } else {
        setLocalStorage('board', [obj])
        subContainer.innerHTML = ''
        let _list = document.createElement('div');
        _list.classList.add('list')
        let numElement = document.createElement("div");
        numElement.className = "num";
        numElement.innerHTML = obj.num

        let titElement = document.createElement("div");
        titElement.className = "tit";
        titElement.innerHTML = obj.title

        let writerElement = document.createElement("div");
        writerElement.className = "writer";
        writerElement.innerHTML = obj.writer

        let viewElement = document.createElement("div");
        viewElement.className = "view";
        viewElement.innerHTML = obj.view

        _list.append(numElement)
        _list.append(titElement)
        _list.append(writerElement)
        _list.append(viewElement)
        subContainer.append(_list)
    }
}
);

for (let i = (currentPage-1)*10; i < currentPage*10; i++) {
    let _list = document.createElement('div');
    _list.classList.add('list')
    let numElement = document.createElement("div");
    numElement.className = "num";
    numElement.innerHTML = board[i].num

    let titElement = document.createElement("div");
    titElement.className = "tit";
    titElement.innerHTML = board[i].title

    let writerElement = document.createElement("div");
    writerElement.className = "writer";
    writerElement.innerHTML = board[i].writer

    let viewElement = document.createElement("div");
    viewElement.className = "view";
    viewElement.innerHTML = board[i].view

    _list.append(numElement)
    _list.append(titElement)
    _list.append(writerElement)
    _list.append(viewElement)
    subContainer.append(_list)
}
function index() {
    if (board && board.length > 0) {
        return board.length + 1;
    } else {
        return 1;
    }
}

const validatePagination = () => {

    
    if (10 * currentPage > board.length) {
        return true
    } else {
        return false;
    }

}

const changePage=()=>{
    if (validatePagination()) {
        subContainer.innerHTML=''
        console.log('sad')
        for (let i = (currentPage-1)*10; i <board.length ; i++) {
            let _list = document.createElement('div');
            _list.classList.add('list')
            let numElement = document.createElement("div");
            numElement.className = "num";
            numElement.innerHTML = board[i].num

            let titElement = document.createElement("div");
            titElement.className = "tit";
            titElement.innerHTML = board[i].title

            let writerElement = document.createElement("div");
            writerElement.className = "writer";
            writerElement.innerHTML = board[i].writer

            let viewElement = document.createElement("div");
            viewElement.className = "view";
            viewElement.innerHTML = board[i].view

            _list.append(numElement)
            _list.append(titElement)
            _list.append(writerElement)
            _list.append(viewElement)
            subContainer.append(_list)
        }
    } else {
        subContainer.innerHTML=''
        for (let i = (currentPage-1)*10; i < currentPage*10; i++) {
            console.log(board[i])
            let _list = document.createElement('div');
            _list.classList.add('list')
            let numElement = document.createElement("div");
            numElement.className = "num";
            numElement.innerHTML = board[i].num

            let titElement = document.createElement("div");
            titElement.className = "tit";
            titElement.innerHTML = board[i].title

            let writerElement = document.createElement("div");
            writerElement.className = "writer";
            writerElement.innerHTML = board[i].writer

            let viewElement = document.createElement("div");
            viewElement.className = "view";
            viewElement.innerHTML = board[i].view

            _list.append(numElement)
            _list.append(titElement)
            _list.append(writerElement)
            _list.append(viewElement)
            subContainer.append(_list)
        }
    }
}
//i를 만들고 하나의 리스트(container.append(_list))가 실행될 때 마다 i++을 해주고, 이를 몇번 반복? board.length 만큼 반복

// let _list=document.createElement('div');
// _list.classList.add('list')
// let numElement = document.createElement("div");
// numElement.className = "num";
// numElement.innerHTML = board[i].num

// let titElement = document.createElement("div");
// titElement.className = "tit";
// titElement.innerHTML = board[i].title

// let writerElement = document.createElement("div");
// writerElement.className = "writer";
// writerElement.innerHTML = board[i].writer

// let viewElement = document.createElement("div");
// viewElement.className = "view";
// viewElement.innerHTML = board[i].view

// _list.append(numElement)
// _list.append(titElement)
// _list.append(writerElement)
// _list.append(viewElement)

// container.append(_list)

// board.forEach((a)=>{
// console.log(a);
// })
// document.getElementById("text").innerHTML

// let asd=[1,2,3,4,5]
// asd.forEach((g)=>{
//     console.log(g)
// })
//----active---

document.querySelector("#pre").addEventListener("click", function() {
    currentPage -= 1;  
    if (currentPage < 1) {
      currentPage = 1;
    }
    document.querySelector(".active").classList.remove("active");
    document.querySelector("#page" + currentPage).classList.add("active");
    changePage()
  });
  document.querySelector("#next").addEventListener("click", function() {
    currentPage += 1; 
    console.log((board.length/10)+1)
    if (currentPage >Math.floor(board.length/10)+1) {
      currentPage =Math.floor(board.length/10)+1
    }
    document.querySelector(".active").classList.remove("active");
    document.querySelector("#page" + currentPage).classList.add("active");
    changePage()
  });