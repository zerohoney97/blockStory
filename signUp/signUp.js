const email = document.getElementById("email");
const password = document.getElementById("password");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
email.addEventListener("blur", () => {
  validateInputBlurEmail();
});
password.addEventListener("blur", () => {
    validateInputBlurPassword();
});

function validateInput() {
  if (!emailRegex.test(email.value)) {
    showModalEmail();
  }
  if (!passwordRegex.test(password.value)) {
    showModalPassword();
  }
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
