const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".emeny"),
        timeLeft: document.querySelector("#timeLeft"),
        lives: document.querySelector("#lives"),
        score: document.querySelector("#score")
    },

    values:{
        timerId: null,
        countDownTimerId: setInterval(contDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        score:0,
        lives:3,
        curretTime: 70,
        timerInit: 5,
    }
    
};
//souds
const soudsHit = new Audio("./src/souds/coin.mp3");

const soudsHitFail = new Audio("./src/souds/rock-impact.m4a");

const soudsFail = new Audio("./src/souds/fail.mp3");

const soudsAlert = new Audio("./src/souds/Alerta - Emergência.mp3");

const soudsFinalTime = new Audio("./src/souds/impossivel.mp3");

function resetGame(){
    removeRalph();
    state.values.lives = 3
    state.view.lives.textContent = "x" + state.values.lives;
    state.values.curretTime = 70;
    state.view.timeLeft.textContent = 60;
    state.values.score = 0;
    state.view.score.textContent = state.values.score;
    state.values.gameVelocity = 1000;
}

function removeRalph() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
}

function randomSquare(){
    removeRalph();
    let randomNumer = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumer];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(state.values.gameVelocity)
}

function contDown() {
    state.values.curretTime--
    if (state.values.curretTime <= 0) {
        soudsFinalTime.pause();
        state.view.squares[4].classList.add("gameOver");
        state.view.squares[4].textContent = "Fim de Jogo! score: "+state.values.score;
        resetGame();
    } else if(state.values.curretTime<= 60) {
        randomSquare();
        state.view.timeLeft.textContent = state.values.curretTime;
    } 
    
    if (state.values.curretTime == 65) {
        state.view.squares[4].classList.remove("gameOver");
        state.view.squares[4].classList.add("init");
        state.view.squares[4].textContent = "ready!";
    }
    //alerte for start game
    if (state.values.curretTime == 64) {
        soudsAlert.currentTime = 4;
        soudsAlert.play();
    }
    // start remuve message
    if(state.values.curretTime == 60) { 
        state.view.squares[4].textContent = "";
        state.view.squares[4].classList.remove("init");
    }
    //sound for end of game
    if (state.values.curretTime == 28) {
        soudsFinalTime.play();
        state.values.gameVelocity = 400;

    }
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                soudsHit.play();
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitPosition=null;
                removeRalph();
            }else{
                state.values.lives--;
                state.view.lives.textContent = "x" + state.values.lives;
                state.values.hitPosition=null;
                if (state.values.lives < 0) {
                    soudsFail.play();
                    soudsFinalTime.pause();
                    state.view.squares[4].classList.add("gameOver");
                    state.view.squares[4].textContent = "Game Over! score: "+state.values.score;
                    resetGame();
                } else{
                    soudsHitFail.play();
                }               
            }
        })
    })
}

function initialize() {
    state.view.squares[4].classList.add("init");
    moveEnemy();
    addListenerHitBox();
    contDown();
}

initialize();
