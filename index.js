const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.getElementById("winningMessage");
const restart = document.getElementById("restartButton");
const restartHeaderButton=document.getElementById("restart");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();
restart.addEventListener("click", startGame);
restartHeaderButton.addEventListener("click",startGame);
function startGame() {
  circleTurn = false;
  addHover();
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  addHover();
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    changeTurn();
    addHover();
  }
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function changeTurn() {
  circleTurn = !circleTurn;
}
function addHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = "Draw";
    winningMessage.classList.add("show");
  } else {
    winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} wins`;
    winningMessage.classList.add("show");
  }
}
function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
