function getRandom(min, max) {
    return  Math.floor(Math.random() * (max - min + 1)) + min;
}
        
function hide(id) {
    document.getElementById(id).style.display = "none";
}
        
function show(id) {
    document.getElementById(id).style.display = "inline";
}
        
    
var minCorrectAnswers;

var countDown
    
var gameIsOn = false;
        
var score; var remainTime; var action; var wrong; var correct; 

//var currentBestScore=0;

document.getElementById("bomb1").style.color = "black";
document.getElementById("bomb2").style.color = "black";
document.getElementById("bomb3").style.color = "black";
    
document.getElementById("button").onclick = function() {
             
    if (gameIsOn==false) {
                
        gameIsOn = true;
        document.getElementById("button").innerHTML = "Reset";
        remainTime = 59;
        minCorrectAnswers = 15;
        document.getElementById("minCorrectAnswers").innerHTML=minCorrectAnswers;
        document.getElementById("countDown").innerHTML=remainTime;
        document.getElementById("time").innerHTML="00";
        hide("gameover");
        generateQA();
        setTimer();
    } else {
        location.reload();
    }
}
                
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
  
        if(gameIsOn == true){//yes
            if(this.innerHTML == correctAnswer){
                minCorrectAnswers-=1;
                document.getElementById("minCorrectAnswers").innerHTML = minCorrectAnswers;
                generateQA();
                if(minCorrectAnswers==0){
                    document.getElementById("correctValue").innerHTML = "15 x ";
                    gameOver();
                    show("congratulation");
                    document.getElementById("congratulationMsg").innerHTML = "<p>Congratulations!</p><p>You defused the bomb!</p>"
                    playing=false;
                    // Congratulation! It took you ... sec to defuse the bomb!
                    // or start the next level. reset the timer, minCorrectAnswers and bombs
                }
            } 
            else {
                generateQA();
                if(document.getElementById("bomb1").style.color=="black") {
                    document.getElementById("bomb1").style.color="rgb(205, 15, 27)";
                } else if(document.getElementById("bomb1").style.color=="rgb(205, 15, 27)" && document.getElementById("bomb2").style.color=="black") {
                    document.getElementById("bomb2").style.color="rgb(205, 15, 27)";
                } else if(document.getElementById("bomb1").style.color=="rgb(205, 15, 27)" 
                          && document.getElementById("bomb2").style.color=="rgb(205, 15, 27)" 
                          && document.getElementById("bomb3").style.color=="black") {
                    document.getElementById("bomb3").style.color="rgb(205, 15, 27)";
                } else {
                    document.getElementById("correctValue").innerHTML = "15 x ";
                    gameOver();
                    show("gameover");
                    playing=false;
                    document.getElementById("gameoverMsg").innerHTML = "<p>Game over!</p><p>You lost!</p>";
                }
            }
                    
        }
    }
}

        
function generateQA(){
    var x = Math.floor(Math.random()*16+3);
    var y = Math.floor(Math.random()*16+3);
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

    //fill other boxes with wrong answers

    var answers = [correctAnswer];

    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (Math.floor(Math.random()*16+3)*(Math.floor(Math.random()*16+3))); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
                document.getElementById("box"+i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);
        }
    }
}
        
function setTimer() {
    action = setInterval(function(){
        remainTime-=1;
        document.getElementById("countDown").innerHTML = remainTime;
        if (remainTime==0) {
            stopTimer();
            show("gameover");
            gameIsOn = false;
            gameOver();
        }
    }, 1000);
}
            
function stopTimer() {
    clearInterval(action);
}

document.getElementById("ok1").onclick = function() {
    hide("gameover");
    var boxes = document.getElementsByClassName("box");
    for(box of boxes) {
        box.innerHTML = '';
    }
}
document.getElementById("ok2").onclick = function() {
    hide("congratulation");
    var boxes = document.getElementsByClassName("box");
    for(box of boxes) {
        box.innerHTML = '';
    }
}

function gameOver() {
    clearInterval(action);
    document.getElementById("timer").innerHTML = "01:00";
    var boxes = document.getElementsByClassName("box");
    for(box of boxes) {
        box.innerHTML = '';
    }
    document.getElementById("question").innerHTML = '';
    document.getElementById("button").innerHTML = "Press";
    document.getElementById("bomb1").style.color = "black";
    document.getElementById("bomb2").style.color = "black";
    document.getElementById("bomb3").style.color = "black";
}