const email = document.getElementById("email");
const password = document.getElementById("password");
const nickname = document.querySelector("#nickName");
// 이메일 정규식
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// 패스워드 정규식
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
// 유저데이터를 가져옴
const adminUserData = JSON.parse(localStorage.getItem("admin"));
console.log(adminUserData);
// 이메일과 패스워드에서 커서가 벗어났을 때 실행하는 함수
email.addEventListener("blur", () => {
  validateInputBlurEmail();
});
password.addEventListener("blur", () => {
  validateInputBlurPassword();
});

// 회원가입 버튼을 눌렀을 때
function validateInput() {
  // 정규식으로 판별
  if (!emailRegex.test(email.value)) {
    showModalEmail();
    return;
  }

  if (!passwordRegex.test(password.value)) {
    showModalPassword();
    return;
  }
  if (adminUserData == null) {
    localStorage.setItem(
      "admin",
      JSON.stringify([
        {
          id: undefined,
          name: nickname.value,
          email: email.value,
          password: password.value,
          isAdmin: false,
        },
      ])
    );
  } else {
    localStorage.setItem(
      "admin",
      JSON.stringify([
        ...adminUserData,
        {
          id: undefined,
          name: nickname.value,
          email: email.value,
          password: password.value,
          isAdmin: false,
        },
      ])
    );
  }
  // JSON객체로 변경후 삽입
  location.href='/main/main.html'
}
function validateInputBlurEmail() {
  if (!emailRegex.test(email.value)) {
    showModalEmail();
  }
}
function validateInputBlurPassword() {
  if (!passwordRegex.test(password.value)) {
    showModalPassword();
  }
}

function showModalEmail() {
  const modal = document.querySelector(".validateEmail");
  modal.style.display = "block";

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}
function showModalPassword() {
  const modal = document.querySelector(".validatePassword");
  modal.style.display = "block";

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}
