var playing = false;
var action;
var minCorrectAnswers;
var timeRemaining;
var correctAnswer;
var correctPosition;
//var bomb1; var bomb2; var bomb3;

document.getElementById("bomb1").style.color = "black";
document.getElementById("bomb2").style.color = "black";
document.getElementById("bomb3").style.color = "black";

function setTimer() {
    document.getElementById("time").innerHTML = "00";
    timeRemaining = 59;
    document.getElementById("countDown").innerHTML = timeRemaining;
    action = setInterval(function() {
        timeRemaining-=1;
        document.getElementById("countDown").innerHTML = timeRemaining;
        if(timeRemaining==0){
            clearInterval(action);
            document.getElementById("gameoverMsg").innerHTML = "<p>Game over!</p><p>You lost!</p>";
            show("gameover");
            playing=false;
            gameOver();
        }}
        ,1000);
}

function generateQA() {
    var x = Math.floor(Math.random()*16+3);
    var y = Math.floor(Math.random()*16+3);
    document.getElementById("question").innerHTML = x + "x" + y;
    correctAnswer = x*y;
    correctPosition = Math.floor(Math.random()*3+1);
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    
    for(var i=1;i<5;i++){
        if(i!=correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = Math.floor(Math.random()*19+3)*(Math.floor(Math.random()*19+3));
            } while (answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

document.getElementById("button").onclick = function() {
    
    if (playing==true) {
        location.reload();
    } else {
        playing = true;
        minCorrectAnswers = 15;
        document.getElementById("minCorrectAnswers").innerHTML = minCorrectAnswers;
        document.getElementById("button").innerHTML = "Reset";
        setTimer();
        generateQA();
        
    }
}

for(var i = 1; i<5; i++) {
    document.getElementById("box"+i).onclick = function() {
        if (playing==true) {
             if(this.innerHTML==correctAnswer) {
                minCorrectAnswers-=1;
                document.getElementById("minCorrectAnswers").innerHTML = minCorrectAnswers;
                document.getElementById("check").style = "text-shadow: 0 0 15px rgb(185, 219, 32)";
                setTimeout(function(){document.getElementById("check").style.textShadow = "none";},300);
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
            } else {
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

function gameOver() {
    clearInterval(action);
    document.getElementById("timer").innerHTML = "01:00";
    var boxes = document.getElementsByClassName("box");
    document.getElementById("box1").innerHTML = '';
    document.getElementById("box2").innerHTML = '';
    document.getElementById("box3").innerHTML = '';
    document.getElementById("box4").innerHTML = '';
    /*for(box of boxes) {
        box.innerHTML = '';
    }*/
    document.getElementById("question").innerHTML = '';
    document.getElementById("button").innerHTML = "Press";
    document.getElementById("bomb1").style.color = "black";
    document.getElementById("bomb2").style.color = "black";
    document.getElementById("bomb3").style.color = "black";
}

function hide(divId) {
    document.getElementById(divId).style.display = "none";
}
        
function show(divId) {
    document.getElementById(divId).style.display = "inline";
}

document.getElementById("ok1").onclick = function() {
    gameOver();
    hide("gameover");
}

document.getElementById("ok2").onclick = function() {
    gameOver();
    hide("congratulation");
}

