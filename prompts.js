var players = document.getElementsByName("player_no.");
var p1 = document.getElementById("no.players");
var turn1 = document.getElementById("turn1");
var turns = document.getElementsByName("radio");
var first = document.getElementById("first");
var firsts = document.getElementsByName("first");

players[1].addEventListener("click", clickButton);
players[0].addEventListener("click", clickButton);
turns[0].addEventListener("click", clickButton1);
turns[1].addEventListener("click", clickButton1);
firsts[0].addEventListener("click", clickButton2);
firsts[1].addEventListener("click", clickButton2);

function clickButton() {
    for (let s = 0; s < 2; s++) {
      if (players[s].checked) {
        playersv = s + 1;
        if (playersv == 1) {
          turntext.innerHTML = "Would you like to be X or O? ";
        }
        turn1.className = "show";
        p1.className = "hide";
        console.log("no.of players is " + playersv);
      }
    }
  }
  function clickButton1() {
    for (let s = 0; s < 2; s++) {
      if (turns[s].checked) {
        turn1.className = "hide";
        turnsv = s == 0 ? "X" : "O";
        if (playersv == 2) {
          game.className = "show";
          startover();
          turn = turnsv;
          document.getElementById("text").textContent = turn;
        } else {
          first.className = "show";
        }
      }
    }
  }
  
  function clickButton2() {
    for (let s = 0; s < 2; s++) {
      if (firsts[s].checked) {
        first.className = "hide";
        k = turnsv == "X" ? "O" : "X";
  
        turnsv = s == 1 ? k : turnsv;
        k1 = s;
        game.className = "show";
        startover();
        turn = turnsv;
        document.getElementById("text").textContent = turn;
      }
    }
  }