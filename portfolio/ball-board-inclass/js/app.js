const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/heavy3.png">';
const BALL_IMG = '<img src="img/sandwich.png">';
const GLUE_IMG = '<img src="img/splatter.png">';
// Model:
var gCount = 0;
var gBoard;
var gGamerPos;
var gBallCount = 0;
var gIntervalId;
var gIsGlued = false;
var gIntervalGlue;
var gHighScore;

function initGame() {
  gGamerPos = { i: 2, j: 9 };
  gBoard = buildBoard();
  renderBoard(gBoard);
  gCount = 0;
  // gHighScore = gCount * 10;
  ballCounter();
  gBallCount = 0;
  clearInterval(gIntervalId);
  clearInterval(gIntervalGlue);
  gIntervalGlue = setInterval(createGlue, 5000);
  gIntervalId = setInterval(createBalls, 3000);
}

function victory() {
  var elVictory = document.querySelector('.victory');
  if (gBallCount === 0) {
    clearInterval(gIntervalId);
    clearInterval(gIntervalGlue);
    elVictory.innerText = `You have won the game by collecting: ${gCount} balls`;
  }
}
function ballCounter() {
  var counter = document.querySelector('.counter');
  counter.innerHTML = `<p>The current count is: ${gCount}</p>`;
}

function createGlue() {
  var randomCol = getRandomInt(1, 10);
  var randomRow = getRandomInt(1, 8);
  var location = { i: randomRow, j: randomCol };
  var board = gBoard[randomRow][randomCol];
  console.log(board);
  if (board.gameElement === null) {
    board.gameElement = GLUE;
    renderCell(location, GLUE_IMG);
    setTimeout(() => {
      board.gameElement === null;
    }, 10000);
  }
}

function createBalls() {
  var remaining = document.querySelector('.remaining');
  var randomCol = getRandomInt(1, 10);
  var randomRow = getRandomInt(1, 8);
  var location = { i: randomRow, j: randomCol };
  var board = gBoard[randomRow][randomCol];
  console.log(board);
  if (board.gameElement === null) {
    board.gameElement = BALL;
    renderCell(location, BALL_IMG);
    gBallCount++;
    remaining.innerText = `The remaining number of balls is: ${gBallCount}`;
  }
}
// Create the Matrix 10 * 12
function buildBoard() {
  var board = createMat(10, 12);
  // Put FLOOR everywhere and WALL at edges
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = { type: FLOOR, gameElement: null };
      if (
        i === 0 ||
        i === board.length - 1 ||
        j === 0 ||
        j === board[0].length - 1
      ) {
        cell.type = WALL;
      }
      board[i][j] = cell;
    }
  }
  board[0][5].type = FLOOR;
  board[9][5].type = FLOOR;
  board[4][0].type = FLOOR;
  board[4][11].type = FLOOR;
  board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
  return board;
}

// Render the board to an HTML table
function renderBoard(board) {
  var elBoard = document.querySelector('.board');
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n';
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      var cellClass = getClassName({ i: i, j: j });
      cellClass += ' floor';
      if (currCell.type === FLOOR) cellClass += ' floor';
      else if (currCell.type === WALL) cellClass += ' wall';

      strHTML += `\t<td class=" cell ${cellClass}" onclick="moveTo(${i},${j})" >\n`;

      if (currCell.gameElement === GAMER) {
        strHTML += GAMER_IMG;
      } else if (currCell.gameElement === BALL) {
        strHTML += BALL_IMG;
      }

      strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';
  }
  // console.log('strHTML is:');
  // console.log(strHTML);
  elBoard.innerHTML = strHTML;
}
// targetCell[0][5] && targetCell[9][5]
// targetCell[4][0] && targetCell[4][11]

// Move the player to a specific location
function moveTo(i, j) {
  var targetCell = gBoard[i][j];
  if (gIsGlued) return;
  if (targetCell.type === WALL) return;
  console.log(gGamerPos);
  // Calculate distance to make sure we are moving to a neighbor cell
  var iAbsDiff = Math.abs(i - gGamerPos.i);
  var jAbsDiff = Math.abs(j - gGamerPos.j);
  // If the clicked Cell is one of the four allowed
  if (
    (iAbsDiff === 1 && jAbsDiff === 0) ||
    (jAbsDiff === 1 && iAbsDiff === 0) ||
    i === 0 ||
    i === 9 ||
    i === 4
  ) {
    if (targetCell.gameElement === BALL) {
      var audio = new Audio('audio/nom.wav');
      gCount++;
      gBallCount--;
      var remaining = document.querySelector('.remaining');
      remaining.innerHTML = `The remaining number of balls is: ${gBallCount}`;
      audio.play();
      ballCounter();
      victory();
    }

    if (targetCell.gameElement === GLUE) {
      gIsGlued = true;
      setTimeout(() => {
        gIsGlued = false;
      }, 3000);
    }

    // Move the gamer
    // MODEL
    gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
    gBoard[i][j].gameElement = GAMER;

    // DOM
    renderCell(gGamerPos, '');
    gGamerPos = { i: i, j: j };
    renderCell(gGamerPos, GAMER_IMG);
  } else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}

// Convert a location object {i, j} to a selector and render a value in that element

function renderCell(location, value) {
  var cellSelector = '.' + getClassName(location);
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

function handleKey(event) {
  var i = gGamerPos.i;
  var j = gGamerPos.j;

  switch (event.key) {
    case 'ArrowLeft':
      if (i === 4 && j === 0) {
        moveTo(4, 11);
      } else {
        moveTo(i, j - 1);
      }
      break;
    case 'ArrowRight':
      if (i === 4 && j === 11) {
        moveTo(4, 0);
      } else {
        moveTo(i, j + 1);
      }
      break;
    case 'ArrowUp':
      if (i === 0) {
        moveTo(9, 5);
      } else {
        moveTo(i - 1, j);
      }
      break;
    case 'ArrowDown':
      if (i === 9) {
        moveTo(0, 5);
      } else {
        moveTo(i + 1, j);
      }
      break;
  }
}

// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
