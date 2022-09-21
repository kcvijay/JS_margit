const btnModalClose = document.querySelector("#modal-close");
const btnInfo = document.querySelector(".info");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const coins = document.querySelectorAll(".coin");
let scoreBox = document.querySelector("#score");
const livesBox = document.querySelector(".lives");

const btnStartGame = document.querySelector("#startBtn");
const btnStopGame = document.querySelector("#stopBtn");
let randArray = [];

let score = 0;
let active = 0;
let timer;
let pace = 1000;
let round = 0;
let lives = 5;

// Getting Random number (W3schools);
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const toggleModal = () => {
  overlay.classList.toggle("visible");
};

coins.forEach((coin, i) => {
  coin.addEventListener("click", () => clickCoin(i));
});

const clickCoin = (i) => {
  if (i != active) {
    lives--;
    if (lives === 5) {
      return (livesBox.textContent = "🧡🧡🧡🧡🧡");
    } else if (lives === 4) {
      return (livesBox.textContent = "🧡🧡🧡🧡");
    } else if (lives === 3) {
      return (livesBox.textContent = "🧡🧡🧡");
    } else if (lives === 2) {
      return (livesBox.textContent = "🧡🧡");
    } else if (lives === 1) {
      return (livesBox.textContent = "🧡");
    } else if (lives === 0) {
      livesBox.textContent = "";
      return endGame();
    }
  } else {
    score++;
    scoreBox.textContent = score;
  }
};

const startGame = () => {
  // if (rounds >= 3) {
  //   return endGame();
  // }

  let nextActive = pickNew(active);
  coins[nextActive].classList.toggle("active");
  coins[active].classList.remove("active");
  active = nextActive;

  console.log("Active number is: " + active);
  timer = setTimeout(startGame, pace);
  pace = pace - 10;
  function pickNew(active) {
    let nextActive = getRandomNumber(0, 3);
    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

const endGame = () => {
  overlay.style.display = "flex";
  modal.innerHTML = `
  <i class="material-icons" id="modal-close">close</i>
  <h3>Oops! Game Over.</h3>
  <p>Your score is ${score}</p>`;
  clearTimeout(timer);
};

const resetGame = () => {
  window.location.reload();
};

btnStartGame.addEventListener("click", startGame);
btnStopGame.addEventListener("click", endGame);

btnInfo.addEventListener("click", toggleModal);
btnModalClose.addEventListener("click", toggleModal, resetGame);

// const startGame = () => {
//   let count = 0;
//   //Throwing random number every second.
//   setInterval(function () {
//     let rand = Math.floor(Math.random() * 4);
//     console.log(rand);
//   }, 1000);
//
//       let indexOfCoin = Array.from(coin.parentNode.children).indexOf(coin);
//       let rand = coin;
//       console.log(indexOfCoin);
//       count++;
//       console.log(count);
//       coin.classList.add("active");
//     });
//   }
// };