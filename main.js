var size = 3,
  turn,
  moves = 0,
  free = [],
  boxes = [],
  score,
  k1,
  k,
  x3 = "XXX",
  o3 = "OOO",
  difficulty = 0,
  x = 1;
var game = document.getElementById("game");
var board = document.getElementById("game_board");
var playersv, turnsv;
// turnsv is used for keeping the record of player 1 for next game
var idt = 1;
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
    row.appendChild(ele);
    x++;
    boxes.push(ele);
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
  computerMove();
}

function checkIfWin(player) {
  var classname = player.className.split(/\s+/);
  var string = [];
  for (let i = 0; i < classname.length; i++) {
    var k = document.querySelectorAll("." + classname[i]);
    string[i] = "";
    for (let j = 0; j < k.length; j++) {
      if (k[j].innerHTML != "&nbsp;") {
        string[i] = string[i] + k[j].innerHTML;
      }
    }
    if (string[i] == x3 || string[i] == o3) {
      return 1;
    }
  }
  return 0;
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
  if (checkIfWin(a)) {
    turn = turn == "X" ? "O" : "X";
    alert("And the winner is player " + turn);
    startover();
  } else if (moves == size * size) {
    turn = turn == "X" ? "O" : "X";
    alert("DRAW");
    startover();
  }
}
function writeAndDeclare(a) {
  a.innerHTML = turn;
  setTimeout(() => {
    declareWinner(a)
  }, 100);
}
