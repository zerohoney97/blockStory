class User {
  constructor(
    id,
    name,
    email,
    password,
    isAdmin,
    accountNumber,
    coin = null,
    tradeSum = 0,
    account = 0
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.accountNumber = accountNumber;
    this.coin = coin;
    this.tradeSum = tradeSum;
    this.account = account;
  }
}

class Coin {
  constructor(
    name,
    symbol,
    quantity,
    currentPrice,
    marketCap,
    //총 체결량
    circulatingSupply,
    userId
  ) {
    this.name = name;
    this.symbol = symbol;
    this.quantity = quantity;
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
    circulatingSupply: "",
  },
  {
    name: "경일코인(GIC)",
    symbol: "GIC",
    currentPrice: "100",
    marketCap: "20000000",
    circulatingSupply: "3000",
  },
  {
    name: "떡상코인(DSC)",
    symbol: "DSC",
    currentPrice: "500",
    marketCap: "100000000",
    circulatingSupply: "4504",
  },
  {
    name: "한강코인(HGC)",
    symbol: "HGC",
    currentPrice: "10",
    marketCap: "30000000",
    circulatingSupply: "10203",
  },
  {
    name: "국뽕코인(GBC)",
    symbol: "GBC",
    currentPrice: "230",
    marketCap: "20120000",
    circulatingSupply: "8000",
  },
  {
    name: "페페코인(PPC)",
    symbol: "PPC",
    currentPrice: "680",
    marketCap: "200000000",
    circulatingSupply: "15200",
  },
  {
    name: "솔라코인(SLC)",
    symbol: "SLC",
    currentPrice: "20",
    marketCap: "80000000",
    circulatingSupply: "9900",
  },
  {
    name: "스즈메코인(SZC)",
    symbol: "SZC",
    currentPrice: "430",
    marketCap: "102003000",
    circulatingSupply: "7600",
  },
  {
    name: "다이진코인(DGC)",
    symbol: "DGC",
    currentPrice: "1200",
    marketCap: "400002121",
    circulatingSupply: "23000",
  },
  {
    name: "우쭐코인(UZC)",
    symbol: "UZC",
    currentPrice: "92",
    marketCap: "67002123",
    circulatingSupply: "6729",
  },
  {
    name: "바이럴코인(VRC)",
    symbol: "VRC",
    currentPrice: "230",
    marketCap: "85000000",
    circulatingSupply: "10200",
  },
];

let requestSignUpUser = [{}];

// -------------------csh
let peterCoin = {
  gyunil: new Coin('gyunil', 'GIC', '1.2', '100', '21'),
  suzumeCoin: new Coin('suzume', 'SZC', '0.003', '430', '22')
}
let peter = new User(21, "peter", "email@naver.com", "password", 0, "11*****416 국민 김피터", peterCoin, 3, 10000);


// console.log(Object.keys(peterCoin));

window.localStorage.setItem("link", JSON.stringify(peter));

// console.log(dummyDataUser[0]);

// -----------------------------



localStorage.setItem("userInformation", JSON.stringify(dummyDataUser));
localStorage.setItem("coinInformation", JSON.stringify(dummyDataCoin));
