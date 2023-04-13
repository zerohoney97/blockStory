class User {
  constructor(
    id,
    name,
    email,
    password,
    isAdmin,
    accountNumber,     //+
    coin = null,
    tradeSum = 0,
    account = 0

  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.accountNumber = accountNumber;     //+
    this.coin = coin;
    this.tradeSum = tradeSum;
    this.account = account;   
  }
}

class Coin {
  constructor(
    name,
    symbol,
    quantity,   //+
    currentPrice,
    marketCap,
    circulatingSupply,
    userId
  ) {
    this.name = name;
    this.symbol = symbol;
    this.quantity = quantity;    //+
    this.currentPrice = currentPrice;
    this.marketCap = marketCap;
    this.circulatingSupply = circulatingSupply;
    this.userId = userId;
  }
}

class IssuePost {
  constructor(userName, userId, title, content, time) {
    this.userName = userName;
    this.userId = userId;
    this.content = content;
    this.title = title;
    this.time = time;
  }
}
class QnAPost {
  constructor(userName, userId, title, content, time, isCompleted) {
    this.userName = userName;
    this.userId = userId;
    this.content = content;
    this.title = title;
    this.time = time;
    this.isCompleted = isCompleted;
  }
}

const dummyDataUser = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    password: "Password!@1",
    isAdmin: false,
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@example.com",
    password: "Password!@2",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Michael",
    email: "michael@example.com",
    password: "Password!@3",
    isAdmin: false,
  },
  {
    id: 4,
    name: "Emily",
    email: "emily@example.com",
    password: "Password!@4",
    isAdmin: false,
  },
  {
    id: 5,
    name: "David",
    email: "david@example.com",
    password: "Password!@5",
    isAdmin: false,
  },
  {
    id: 6,
    name: "Amy",
    email: "amy@example.com",
    password: "password6",
    isAdmin: false,
  },
  {
    id: 7,
    name: "Jessica",
    email: "jessica@example.com",
    password: "Password!@7",
    isAdmin: false,
  },
  {
    id: 8,
    name: "Brian",
    email: "brian@example.com",
    password: "Password!@8",
    isAdmin: false,
  },
  {
    id: 9,
    name: "Olivia",
    email: "olivia@example.com",
    password: "Password!@9",
    isAdmin: false,
  },
  {
    id: 10,
    name: "Daniel",
    email: "daniel@example.com",
    password: "Password!@10",
    isAdmin: false,
  },
  {
    id: 11,
    name: "Amanda",
    email: "amanda@example.com",
    password: "Password!@11",
    isAdmin: false,
  },
  {
    id: 12,
    name: "Kevin",
    email: "kevin@example.com",
    password: "Password!@12",
    isAdmin: false,
  },
  {
    id: 13,
    name: "Rachel",
    email: "rachel@example.com",
    password: "Password!@13",
    isAdmin: false,
  },
  {
    id: 14,
    name: "Peter",
    email: "peter@example.com",
    password: "Password!@14",
    isAdmin: false,
  },
  {
    id: 15,
    name: "Samantha",
    email: "samantha@example.com",
    password: "Password!@15",
    isAdmin: false,
  },
  {
    id: 16,
    name: "Jacob",
    email: "jacob@example.com",
    password: "Password!@16",
    isAdmin: false,
  },
  {
    id: 17,
    name: "Grace",
    email: "grace@example.com",
    password: "Password!@17",
    isAdmin: false,
  },
  {
    id: 18,
    name: "William",
    email: "william@example.com",
    password: "Password!@18",
    isAdmin: false,
  },
  {
    id: 19,
    name: "Sophia",
    email: "sophia@example.com",
    password: "Password!@19",
    isAdmin: false,
  },
  {
    id: 20,
    name: "GolemOwnerYeonsu",
    email: "GolemOwnerYeonsu@example.com",
    password: "Password!@20",
    isAdmin: false,
  },
];

let dummyDataCoin = [
  {
    name: "원화(KRW)",
    symbol: "KRW",
    currentPrice: "",
    marketCap: "",
    // 시가총액
    circulatingSupply: "",
  },
  {
    name: "gyunilCoin",
    symbol: "GIC",
    currentPrice: "100",
    marketCap: "20000000",
    // 시가총액
    circulatingSupply: "3000",
    // 총 체결량
  },
  {
    name: "dducksangCoin",
    symbol: "DSC",
    currentPrice: "500",
    marketCap: "100000000",
    circulatingSupply: "4504",
  },
  {
    name: "hangangCoin",
    symbol: "HGC",
    currentPrice: "10",
    marketCap: "30000000",
    circulatingSupply: "10203",
  },
  {
    name: "gukbbongCoin",
    symbol: "GBC",
    currentPrice: "230",
    marketCap: "20120000",
    circulatingSupply: "8000",
  },
  {
    name: "pepeCoin",
    symbol: "PPC",
    currentPrice: "680",
    marketCap: "200000000",
    circulatingSupply: "15200",
  },
  {
    name: "solarCoin",
    symbol: "SLC",
    currentPrice: "20",
    marketCap: "80000000",
    circulatingSupply: "9900",
  },
  {
    name: "suzumeCoin",
    symbol: "SZC",
    currentPrice: "430",
    marketCap: "102003000",
    circulatingSupply: "7600",
  },
  {
    name: "daiginCoin",
    symbol: "DGC",
    currentPrice: "1200",
    marketCap: "400002121",
    circulatingSupply: "23000",
  },
  {
    name: "uzzulCoin",
    symbol: "UZC",
    currentPrice: "92",
    marketCap: "67002123",
    circulatingSupply: "6729",
  },
  {
    name: "viralCoin",
    symbol: "VRC",
    currentPrice: "230",
    marketCap: "85000000",
    circulatingSupply: "10200",
  },
];

let requestSignUpUser = [{}];

// -------------------csh
let peterCoin={
  gyunil : new Coin('gyunil','GIC','100','21'),
  suzumeCoin : new Coin('suzume','SZC','430','22')
}
let peter = new User(1, "peter", "email@naver.com", "password", 0, peterCoin , 3, 10000);
let John = dummyDataUser[0];

// console.log(John);
// John.value = "somevalue";
// console.log(John);

// John.name = "james";
// John.key.add

// console.log(Object.keys(peterCoin) );
// console.log(Object.values(peterCoin)[0].name);

// console.log(peterCoin);

// 일단 대기
// window.localStorage.setItem("link", JSON.stringify(peter));
// window.localStorage.setItem("link2", JSON.stringify(dummyDataUser));
window.localStorage.setItem("link3", JSON.stringify(dummyDataCoin));



// -----------------------------



localStorage.setItem("userInformation", JSON.stringify(dummyDataUser));
localStorage.setItem("coinInformation", JSON.stringify(dummyDataCoin));
