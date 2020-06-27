let human,
  ai,
  count = 0;
function computerMove() {
  human = turn == "X" ? "O" : "X";
  ai = turn;
  if ((playersv == 1 && k1 == 0 && moves % 2 == 1) || (playersv == 1 && k1 == 1 && moves % 2 == 0)) {
    var v = findMove(ai);
    writeAndDeclare(v);
    moves++;
    setTimeout(() => {
      turn = turn == "X" ? "O" : "X";
      document.getElementById("text").textContent = turn;
      console.log(count);
    }, 10);
    // due to the time taken to complete function clickbutton2 is significant
    //and computer function is called in function clickbutton1 itself
  }
}

function findMove(ai) {
  free.splice(0, free.length);
  for (let b = 0; b < size * size; b++) {
    if (boxes[b].innerHTML == "&nbsp;") {
      free.push(b);
    }
  }

  var f = bestMove(free, ai);
  return boxes[free[f]];
}

function bestMove(freeArray, ai) {
  let move,
    bestScore = -Infinity;

  if (difficulty == 0) {
    return Math.floor(Math.random() * free.length);
  } else if (difficulty > 0) {
    freeArray.forEach((index, i) => {
      boxValues[index] = ai;
      let score = minimax(boxValues, 0, false, -Infinity, Infinity, index);
      boxValues[index] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    });
    return move;
  }
}

function minimax(board, depth, isMaximizing, alpha, beta, index) {
  count++;
  let result = checkIfWin(board, index);

  if (result == 1) {
    return isMaximizing ? -1 : 1;
  } else if (moves + depth == size * size - 1 || depth >= size) {
    return 0;
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < board.length; i++) {
    if (board[i] == "") {
      board[i] = !isMaximizing ? human : ai;
      let score = minimax(board, depth + 1, !isMaximizing, alpha, beta, i);
      board[i] = "";
      bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
      if (isMaximizing) {
        alpha = Math.max(alpha, score);
      } else {
        beta = Math.min(beta, score);
      }
      if (beta <= alpha) break;
    }
  }
  return bestScore;
}
