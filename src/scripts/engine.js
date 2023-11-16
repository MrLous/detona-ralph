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
        curretTime: 60,
    }
    
};

function contDown() {
    state.values.curretTime--
    state.view.timeLeft.textContent = state.values.curretTime;
    if (state.values.curretTime <= 0) {
        alert("Fim de Jogo! \n score: "+state.values.score);
        resetGame();
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    let randomNumer = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumer];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function resetGame(){
    state.values.lives = 3
    state.view.lives.textContent = "x" + state.values.lives;
    state.values.curretTime = 60
    state.view.timeLeft.textContent = state.values.curretTime;
    state.values.score = 0;
    state.view.score.textContent = state.values.score;

}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitPosition=null;
            }else{
                state.values.lives--;
                state.view.lives.textContent = "x" + state.values.lives;
                state.values.hitPosition=null;
                if (state.values.lives < 0) {
                    alert("Game Over! \n score: "+state.values.score)
                    resetGame();
                }                
            }
        })
    })
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();