let currScore = { 
    "Player 1" : 0,
    "Player 2" : 0
};

let savedScore = { 
    "Player 1" : 0,
    "Player 2" : 0
};

let activePlayer = "Player 1";
let player1Name = "Player 1";
let player2Name = "Player 2";

const winningCondition = 100;

const dis = document.getElementById("dis");
const diceDisplay = document.getElementById("diceDisplay");
const currentScoreDisplay = document.getElementById("currentScoreDisplay");
const savedScore1 = document.getElementById("savedScore1");
const savedScore2 = document.getElementById("savedScore2");
const messageDisplay = document.getElementById("messageDisplay");
const rollButton = document.getElementById("rollDice");
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");
const player1Input = document.getElementById("player1Name");
const player2Input = document.getElementById("player2Name");

const player1Heading = document.getElementById("player1Heading");
const player2Heading = document.getElementById("player2Heading");

player1Input.addEventListener("input", function () {
    player1Name = this.value || "Player 1";
    player1Heading.textContent = `Player 1: ${player1Name} ✨`;  // Update heading
    update();
});

player2Input.addEventListener("input", function () {
    player2Name = this.value || "Player 2";
    player2Heading.textContent = `Player 2: ${player2Name} ✨`;  // Update heading
    update();
});

rollButton.addEventListener("click", ()=>{
    let dice = Math.floor(Math.random() * 6) + 1;
    diceDisplay.textContent = `Dice: ${dice}`;

    if(dice == 1){
        currScore[activePlayer] = 0;
        switchTurn();
    }else{
        currScore[activePlayer] += dice;
    }
    update();
});

saveButton.addEventListener("click", ()=>{
    savedScore[activePlayer] += currScore[activePlayer];
    currScore[activePlayer] = 0;

    if( savedScore[activePlayer] >= winningCondition){
        dis.textContent = `${activePlayer} Wins! 🎉`;
        disableGame();
        return;
    }
    switchTurn();
    update();
})

resetButton.addEventListener("click", ()=>{
    currScore = {
        "Player 1": 0,
        "Player 2": 0
    };
    savedScore = {
        "Player 1": 0,
        "Player 2": 0
    }
    activePlayer = "Player 1";
    messageDisplay.textContent = "";
    enableGame();
    update();
})

function switchTurn(){
    activePlayer = activePlayer == "Player 1" ? "Player 2" : "Player 1";
}

function update(){
    currentScoreDisplay.textContent = `Current Score : ${currScore[activePlayer]}`;
    savedScore1.textContent = savedScore["Player 1"];
    savedScore2.textContent = savedScore["Player 2"];
}

function disableGame() {
    rollButton.disabled = true;
    saveButton.disabled = true;
}

function enableGame() {
    rollButton.disabled = false;
    saveButton.disabled = false;
}