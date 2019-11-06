var size=3,
turn = "X",
moves= 0,
boxes =[],score,
x3 = 'XXX',o3 = "OOO",
x = 1;
var board= document.getElementById("game_board");
var idt=1;
for (let i = 0; i < size; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (let j = 0; j < size; j++) {
        var ele =document.createElement("td");
       // ele.style.cssText = "";
        ele.classList.add("col"+j,"row"+i)
        if(i==j){ele.classList.add("daig0")}
        if(i==size-1-j){ele.classList.add("diag1")}
        ele.identifier = x;
        ele.setAttribute('align', 'center');
        ele.setAttribute('valign', 'center');
        ele.addEventListener("click",set);
        row.appendChild(ele);
        x ++;
        boxes.push(ele);
    }
    
}

function startover(){
    score = {
        "X": 0,
        "O": 0
    };
    moves = 0;
    turn = "X";
    boxes.forEach(function (square) {
        square.innerHTML = '&nbsp;';
      });  
}
startover();

function win(player){
   var classname = player.className.split(/\s+/);
   var string=[] ;
   for (let i = 0; i < classname.length; i++) {
       var k= document.querySelectorAll("."+classname[i]);
       string[i]="";
       for (let j = 0; j < k.length; j++) {        
        if(k[j].innerHTML != "&nbsp;"){ string[i]=string[i]+k[j].innerHTML}
       }
       console.log(string[i]);
       if(string[i] == x3||string[i] == o3){return 1;}
   } 
return 0;
}  

function set(){
    if(this.innerHTML !="&nbsp;") return;
    moves++;
    this.innerHTML = turn;
    if(win(this))
    {alert('And the winner is player ' +turn);
     startover();
    }
    else if(moves == size*size){
        alert("DRAW");
        startover();
    }
    else  
    turn = turn=="X" ? "O":"X";
    document.getElementById("text").textContent = turn;
}