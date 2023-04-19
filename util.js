// ********************************************************************************************
// *** notice: 본 함수는 프론트와 백엔드를 간단하게 이어주기위한 유틸 js파일 입니다. ***
// ********************************************************************************************

const getLocalStorage = (localStorageName, index) => {
  try {
    if (localStorage.getItem(localStorageName)) {
      let tempInfo = localStorage.getItem(localStorageName);
      if (index) {
        return JSON.parse(tempInfo)[index];
      }
      return JSON.parse(tempInfo);
    } else {
      throw new Error("로컬 스토레이지가 비었습니다!");
    }
  } catch (error) {
    alert(error);
  }
};

const setLocalStorage = (localStorageName, data) => {
  localStorage.setItem(localStorageName, JSON.stringify(data));
};

const getLoginUser = () => {
  return JSON.parse(localStorage.getItem("nowLogin"));
};
