var size=3,
turn ,
moves= 0,free = [],
boxes =[],score,k1,k,
x3 = 'XXX',o3 = "OOO",
x = 1;
var game=document.getElementById("game");
var board= document.getElementById("game_board");
var players = document.getElementsByName('player_no.');
var p1 = document.getElementById("no.players");
var turn1 = document.getElementById("turn1");
var turns = document.getElementsByName("radio");
var first = document.getElementById("first");
var firsts = document.getElementsByName("first");
var playersv,turnsv ;  
// turnsv is almost useless, but is used for keeping the record of player 1 for next game

players[1].addEventListener("click",clickButton);
players[0].addEventListener("click",clickButton);
turns[0].addEventListener("click",clickButton1);
turns[1].addEventListener("click",clickButton1);
firsts[0].addEventListener("click",clickButton2);
firsts[1].addEventListener("click",clickButton2);

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
// for the no.of players
function clickButton(){ 
    for (let s = 0; s < 2; s++) {
        if(players[s].checked){
         playersv = s+1;
         if(playersv == 1){
             turntext.innerHTML = "Would you like to be X or O? "
         }
         turn1.className="show";
         p1.className ="hide";
         console.log("no.of players is "+playersv)
        }
      }
    }
    function clickButton1(){
        for (let s = 0; s < 2; s++) {
            if(turns[s].checked){
             turn1.className="hide";
             turnsv = s== 0 ? "X":"O";
             if(playersv == 2 ){
                 game.className = "show";
                 startover();
                 turn = turnsv;
                 document.getElementById("text").textContent = turn;
                 console.log(turn)
             }
             else {
                 first.className ="show";
                 console.log(turn)
             }
            }
          }
    }
    
function clickButton2(){
    for (let s = 0; s < 2; s++) {
        if(firsts[s].checked){
         first.className="hide";
           k = turnsv =="X" ? "O" :"X"

         turnsv = s== 1 ? k:turnsv;
         k1=s;
             game.className = "show";
             startover();
             turn = turnsv;
             document.getElementById("text").textContent = turn;
             console.log(turn);
        }
      }
}
function startover(){
    score = {
        "X": 0,
        "O": 0
    };
    moves = 0;
    turn = turnsv;
    console.log(turn);
    document.getElementById("text").textContent = turn;
    boxes.forEach(function (square) {
        square.innerHTML = '&nbsp;';
      });  
    console.log("hi");  
    computer();
}


function find(a){
    free.splice(0,free.length);
    for (let b = 0; b < size*size; b++) {
        if(boxes[b].innerHTML == "&nbsp;")
        {free.push(b);
        }     
    }
    var f=Math.floor(Math.random() * (free.length ) )
    boxes[free[f]].innerHTML=a;
    return(boxes[free[f]]);
}

function win(player){
   var classname = player.className.split(/\s+/);
   var string=[] ;
   for (let i = 0; i < classname.length; i++) {
       var k= document.querySelectorAll("."+classname[i]);
       string[i]="";
       for (let j = 0; j < k.length; j++) {        
        if(k[j].innerHTML != "&nbsp;"){ string[i]=string[i]+k[j].innerHTML}
       }
       if(string[i] == x3||string[i] == o3){return 1;}
   } 
return 0;
}  

function computer(){
    if((playersv==1 &&k1 ==0&& moves%2 == 1) || (playersv==1  &&k1 ==1&& moves%2 == 0)){
        console.log(turn)
    var v= find(turn);
       fn(v,winif);
       moves++;
       setTimeout(() => {
        turn = turn=="X" ? "O":"X";
        console.log(turn);
        document.getElementById("text").textContent = turn;
       }, 10);

// due to the time taken to complete function clickbutton2 is significant 
//and computer function is called in function clickbutton1 itself
    }
}

function set(){
   if(playersv==2 ||(playersv==1 &&k1 ==0&& moves%2 == 0) || (playersv==1  &&k1 ==1&& moves%2 == 1))
   {
    if(this.innerHTML !="&nbsp;") return;
    moves++;
    
    fn(this,winif);
    turn = turn=="X" ? "O":"X";
    document.getElementById("text").textContent = turn;
   setTimeout(() => {
       computer();
   }, 1000);
   }
   else{
       
   }
}

function winif(a){
    if(win(a))
    {     turn = turn=="X" ? "O":"X";
        alert('And the winner is player ' +turn);
     startover();
    }
    else if(moves == size*size){
        turn = turn=="X" ? "O":"X";
        alert("DRAW");
        startover();
    }
     
}
function fn(a,callback){
    a.innerHTML = turn;
    console.log(turn)
    setTimeout(() => {callback(a);  }, 100);
    
}
