// ! Dataset
let listPemesan = [
  {
    name: "Asep",
    orderedBurger: ["bun-bottom", "bun-top"],
    description:
      " Saya ingin burger yang gaada sayur",
    price: 100,
    isCorrect: false,
  },
  {
    name: "Hanni pham",
    orderedBurger: ["bun-bottom", "beef", "cheese", "bun-top"],
    description: "aku mau cheeseburger tanpa sayur ya",
    price: 100,
    description: "aku mau burger dikasih spongebob 1 lapis",
    price: 40,
    isCorrect: false,
  },
  {
    name: "Windah",
    orderedBurger: ["bun-bottom", "beef", "lettuice", "cheese", "bun-top"],
    description: "aku mau burger yang ada kuning sama ijo nya",
    price: 50,
    isCorrect: false,
  },
  {
    name: "Shaqueela",
    orderedBurger: ["bun-bottom", "beef", "beef", "bun-top"],
    description: "aku mau burger yang sapi banget",
    price: 40,
    isCorrect: false,
  },
  {
    name: "Laravelia",
    orderedBurger: ["bun-bottom", "lettuice", "lettuice", "bun-top"],
    description: "burger diet kayaknya sehat",
    price: 40,
    isCorrect: false,
  },
  {
    name: "Adit",
    orderedBurger: ["bun-bottom", "cheese", "beef", "cheese", "bun-top"],
    description: "burger asin kayaknya menarik",
    price: 50,
    isCorrect: false,
  },
  {
    name: "Sultan Arab",
    orderedBurger: [
      "bun-bottom",
      "lettuice",
      "beef",
      "cheese",
      "beef",
      "lettuice",
      "bun-top",
    ],
    description: "habibi, ane mau pesan burger sultan dubai",
    price: 100,
    isCorrect: false,
  },
];

// ! Variable Initiation
let totalMoney = 0;
let cookedBurger = [];
let lives = 4;
let questionNumber = 0;

//! DOM
let questionTitle = document.getElementById("question-title");
let questionDesc = document.getElementById("question-desc");
let moneyGaji = document.getElementById("money-gaji");
let livesHeart = document.getElementById("lives-heart");
let bunTop = document.getElementById("bun-top");
let bunBottom = document.getElementById("bun-bottom");
let beef = document.getElementById("beef");
let cheese = document.getElementById("cheese");
let lettuice = document.getElementById("lettuice");
let btnDelete = document.getElementById("btn-delete");
let btnServe = document.getElementById("btn-serve");
let progressBar = document.getElementById("progress-bar");
let userName = document.getElementById("username");

const params = new URLSearchParams(window.location.search);
const userInput = params.get("nama");
if (!userInput) {
  userName.innerText = "Mahasiswa Cumlade";
} else {
  userName.innerText = userInput;
}

function validateAnswer(orderedBurgerArr, cookedBurgerArr) {
  if (orderedBurgerArr.length !== cookedBurgerArr.length) {
    wrongHandler();
  } else if (orderedBurgerArr.length === cookedBurgerArr.length) {
    let j = cookedBurgerArr.length - 1;
    for (let i = 0; i < orderedBurgerArr.length; i++) {
      if (orderedBurgerArr[i] !== cookedBurgerArr[j]) {
        wrongHandler();
        break;
      }
      j--;
      if (i + 1 === orderedBurgerArr.length) {
        correctHandler();
      }
    }
  }
}

function wrongHandler() {
  --lives;
  livesHeart.textContent = lives;
  let myModal = new bootstrap.Modal(document.getElementById('salah'));
  document.getElementById('heart-count').innerText = lives
  myModal.show();
  //   Handling kalo misal nyawanya habis (belum selesai)
  if (lives <= 0) {
    let myModal = new bootstrap.Modal(document.getElementById('gameOver'));
    myModal.show();
  }
}

// function correctHandler() {
//   totalMoney += listPemesan[questionNumber].price;
//   listPemesan[questionNumber].isCorrect = true;

//   ++questionNumber;
//   if (questionNumber <= listPemesan.length) {
//     questionTitle.innerText = listPemesan[questionNumber]["name"];
//     questionDesc.innerText = `Pemesan: ${listPemesan[questionNumber]["description"]}`;
//   }
//   moneyGaji.innerText = totalMoney;
//   let tempProgressBar = 0;
//   for (let i = 0; i < listPemesan.length; i++) {
//     if (listPemesan[i].isCorrect) {
//       tempProgressBar++;
//     }
//   }
//   tempProgressBar = (tempProgressBar / listPemesan.length) * 100;
//   progressBar.style.width = `${tempProgressBar}%`;
// }

function correctHandler() {
  totalMoney += listPemesan[questionNumber].price;
  listPemesan[questionNumber].isCorrect = true;

  questionNumber++;
  if (questionNumber < listPemesan.length) {
    questionTitle.innerText = listPemesan[questionNumber]["name"];
    questionDesc.innerText = `Pemesan: ${listPemesan[questionNumber]["description"]}`;
  } else {
    questionTitle.innerText = "Semua pesanan telah selesai!";
    questionDesc.innerText = "Terima kasih telah melayani semua pelanggan!";
    let myModal = new bootstrap.Modal(document.getElementById('theEnd'));
    document.getElementById('uangModal').innerText = totalMoney
    myModal.show();
  }
  moneyGaji.innerText = totalMoney;

  let tempProgressBar = 0;
  for (let i = 0; i < listPemesan.length; i++) {
    if (listPemesan[i].isCorrect) {
      tempProgressBar++;
    }
  }

  tempProgressBar = ((tempProgressBar / listPemesan.length) * 100).toFixed(1);
  progressBar.style.width = `${tempProgressBar}%`;
  document.getElementById('progress-bar').innerText = `Progres: ${tempProgressBar}%`

  // if (tempProgressBar === 100) {
  //   // alert("Selamat! Anda telah menyelesaikan semua pesanan!");
    
  // }
}

function addItem(item) {
  cookedBurger.unshift(`${item}`);
}

function removeItem() {
  cookedBurger.shift();
}

function render() {
  let canvas = document.getElementById("answer-canvas");
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  for (let i = 0; i < cookedBurger.length; i++) {
    let newItem = document.createElement("div");
    newItem.className = "answer-slice";
    let newItemImage = document.createElement("img");
    newItemImage.setAttribute(
      "src",
      `./assets/img/main/${cookedBurger[i]}.png`
    );
    newItem.appendChild(newItemImage);

    document.getElementById("answer-canvas").appendChild(newItem);
  }
}

bunTop.addEventListener("click", function () {
  addItem("bun-top");
  render();
});

bunBottom.addEventListener("click", function () {
  addItem("bun-bottom");
  render();
});

beef.addEventListener("click", function () {
  addItem("beef");
  render();
});

cheese.addEventListener("click", function () {
  addItem("cheese");
  render();
});

lettuice.addEventListener("click", function () {
  addItem("lettuice");
  render();
});

btnDelete.addEventListener("click", function () {
  removeItem();
  render();
});

btnServe.addEventListener("click", function () {
  console.log(listPemesan, "<- list pemesan");
  console.log(listPemesan[questionNumber], "<-- list pemesan question number");
  console.log(
    listPemesan[questionNumber].orderedBurger,
    "<--- list pemesan questoin number ordered burger"
  );
  console.log(cookedBurger, "<--- list cooked burgers");
  validateAnswer(listPemesan[questionNumber].orderedBurger, cookedBurger);
});

// wrongHandler();
// correctHandler();
// correctHandler();
