function computerMove() {
  if ((playersv == 1 && k1 == 0 && moves % 2 == 1) || (playersv == 1 && k1 == 1 && moves % 2 == 0)) {
    var v = findMove();
    writeAndDeclare(v);
    moves++;
    setTimeout(() => {
      turn = turn == "X" ? "O" : "X";
      document.getElementById("text").textContent = turn;
    }, 10);
    // due to the time taken to complete function clickbutton2 is significant
    //and computer function is called in function clickbutton1 itself
  }
}

function findMove() {
  free.splice(0, free.length);
  for (let b = 0; b < size * size; b++) {
    if (boxes[b].innerHTML == "&nbsp;") {
      free.push(b);
    }
  }
 
  var f = bestMove()
  return boxes[free[f]];
}

function bestMove(){

    if(difficulty ==0){
      return  Math.floor(Math.random() * free.length);
    }

    else if(difficulty>0){
        console.log('applying Minimax')
        
    }

}


