let currentPlayer = 'X';
let inGame = true;
let board = [];
let n = 3;
let m = 3;

function initBoard() {
  const temp = [];
  for (let i = 0; i < n; i++) {
    temp.push([]);
    for (let j = 0; j < n; j++) {
      temp[i].push('');
    }
  }
  return temp;
}

function checkLineWin() {
  for (let i = 0; i < board.length; i++) {
    let cnt = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === currentPlayer) {
        cnt++;
        if (cnt === m) {
          return true;
        }
      } else {
        cnt = 0; // Reset if not consecutive
      }
    }
  }
  return false;
}

function checkColumnWin() {
  for (let j = 0; j < board[0].length; j++) {
    let cnt = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] === currentPlayer) {
        cnt++;
        if (cnt === m) {
          return true;
        }
      } else {
        cnt = 0; // Reset if not consecutive
      }
    }
  }
  return false;
}

function checkDiagonalWin() {
  for (let i = 0; i <= board.length - m; i++) {
    for (let j = 0; j <= board[i].length - m; j++) {
      let cntDiag1 = 0;
      let cntDiag2 = 0;
      for (let k = 0; k < m; k++) {
        if (board[i + k][j + k] === currentPlayer) {
          cntDiag1++;
        }
        if (board[i + k][j + (m - 1) - k] === currentPlayer) {
          cntDiag2++;
        }
      }
      if (cntDiag1 === m || cntDiag2 === m) {
        return true;
      }
    }
  }
  return false;
}

function checkWinner() {
  return checkLineWin() || checkColumnWin() || checkDiagonalWin();
}

function swapTurn() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}

function setDrawText() {
  const statusElement = document.getElementById('status');
  statusElement.innerText = 'Draw';
  console.log('Draw!');
}

function setWinnerText() {
  const statusElement = document.getElementById('status');
  statusElement.innerText = `${currentPlayer} has won!`;
  console.log(`${currentPlayer} has won!`);
}

function getIndex(id) {
  const row = Math.floor(id / n);
  const col = id % n;
  return { row, col };
}

function placeMark(e) {
  e.target.innerText = currentPlayer;
}

function setTurnText() {
  const statusElement = document.getElementById('status');
  statusElement.innerText = `${currentPlayer} Player's turn!`;
}

function checkDraw() {
  return !board.some((row) => row.includes(''));
}

function handleClick(e) {
  if (inGame) {
    const { id } = e.target;
    const indexes = getIndex(id);
    board[indexes.row][indexes.col] = currentPlayer;
    console.log(`${id} clicked with ${currentPlayer}`);
    console.log(board);
    placeMark(e);
    if (checkWinner() === true) {
      inGame = false;
      setWinnerText();
    }
    swapTurn();
    if (inGame) {
      setTurnText();
    }
    if (checkDraw() === true) {
      setDrawText();
    }
  }
}

function errorMessage() {
  const statusElement = document.getElementById('status');
  statusElement.innerText = 'Wrong input! (should be n < m)';
}

function create() {
  console.log('Starting a new game!');
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.innerText = 'Restart';
  currentPlayer = 'X';
  setTurnText();
  inGame = true;
  n = parseInt(document.getElementById('boardSize').value, 10);
  m = parseInt(document.getElementById('consecutive').value, 10);
  const container = document.getElementById('game-board');

  container.innerHTML = '';
  container.style.setProperty('--n', n);
  container.style.setProperty('--m', m);

  if (n < m) {
    errorMessage();
    console.error('Wrong input!');
  } else {
    board = initBoard();
    console.log(board);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const box = document.createElement('div');
        const id = `${i * n + j}`;
        box.setAttribute('id', id);
        box.setAttribute('class', 'cell');
        box.classList.add('box');
        container.appendChild(box);
        box.addEventListener('click', handleClick, { once: true });
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  function start() {
    const restartButton = document.getElementById('restart-btn');
    restartButton.addEventListener('click', create);
  }

  start();
});
