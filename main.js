var size = 4,
  turn,
  moves = 0,
  free = [],
  boxes = [],
  boxValues = [],
  score,
  k1,
  k,
  xn = "",
  on = "",
  difficulty = 0,
  x = 1;
var game = document.getElementById("game");
var board = document.getElementById("game_board");
var playersv, turnsv;
// turnsv is used for keeping the record of player 1 for next game
var idt = 1;
for (let i = 0; i < size; i++) {
  xn += "X";
  on += "O";
}
for (let i = 0; i < size; i++) {
  var row = document.createElement("tr");
  board.appendChild(row);
  for (let j = 0; j < size; j++) {
    var ele = document.createElement("td");
    // ele.style.cssText = "";
    ele.classList.add("col" + j, "row" + i);
    if (i == j) {
      ele.classList.add("daig0");
    }
    if (i == size - 1 - j) {
      ele.classList.add("diag1");
    }
    ele.identifier = x;
    ele.setAttribute("align", "center");
    ele.setAttribute("valign", "center");
    ele.addEventListener("click", setContent);
    row.setAttribute("height", 700 / size < 120 ? 700 / size : 120);
    row.style.fontSize = 700 / (size * 2.5) + "px";
    row.appendChild(ele);
    x++;
    boxes.push(ele);
    boxValues.push("");
  }
}
// for the no.of players

function startover() {
  score = {
    X: 0,
    O: 0,
  };
  moves = 0;
  turn = turnsv;
  document.getElementById("text").textContent = turn;
  boxes.forEach(function (square) {
    square.innerHTML = "&nbsp;";
  });
  boxValues.map((element, i) => {
    boxValues[i] = "";
  });
  computerMove();
}

function checkIfWin(array, index) {
  // console.log(boxes[index].className)
  let colNumber = index % size;
  let rowNumber = (index - colNumber) / size;
  let string = "";

  if (rowNumber + colNumber == size-1) {
    string = "";
    array.forEach((element, i) => {
      if ((i - (i % size)) / size + (i % size) == size-1 ) string += element;
    });
    if (string == xn || string == on) return 1;
  }
  if (rowNumber == colNumber) {
    string = "";
    array.forEach((element, i) => {
      if ((i - (i % size)) / size == (i % size)) string += element;
    });
    if (string == xn || string == on) return 1;
  }

  string = "";
  for (let index = rowNumber * size; index < (rowNumber + 1) * size; index++) {
    string += array[index];
  }
  if (string == xn || string == on) return 1;
  string = "";
  for (let index = 0; index < size; index++) {
    string += array[index * size + colNumber];
  }
  if (string == xn || string == on) return 1;
}

function setContent() {
  if (playersv == 2 || (playersv == 1 && k1 == 0 && moves % 2 == 0) || (playersv == 1 && k1 == 1 && moves % 2 == 1)) {
    if (this.innerHTML != "&nbsp;") return;
    moves++;

    writeAndDeclare(this);
    turn = turn == "X" ? "O" : "X";
    document.getElementById("text").textContent = turn;
    setTimeout(() => {
      computerMove();
    }, 1000);
  } else {
  }
}

function declareWinner(a) {
  if (checkIfWin(boxValues, index(a))) {
    turn = turn == "X" ? "O" : "X";
    alert("And the winner is player " + turn);
    startover();
  } else if (moves == size * size) {
    turn = turn == "X" ? "O" : "X";
    alert("DRAW");
    startover();
  }
}
function index(a) {
  let index = 0;
  a.classList.forEach(element => {
    index += element.substring(0, 3) == "col" ? parseInt(element.slice(3)) : 0;
    index += element.substring(0, 3) == "row" ? parseInt(element.slice(3)) * size : 0;
  });
  return index;
}
function writeAndDeclare(a) {
  a.innerHTML = turn;

  boxValues[index(a)] = turn;
  setTimeout(() => {
    declareWinner(a);
  }, 100);
}
