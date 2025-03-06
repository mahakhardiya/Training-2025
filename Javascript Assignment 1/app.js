let currScore = { "Player 1": 0, "Player 2": 0 };
let savedScore = { "Player 1": 0, "Player 2": 0 };
let activePlayer = "Player 1";
let player1Name = "Player 1";
let player2Name = "Player 2";
const winningCondition = 100;

const turnIndicator = document.getElementById("turnIndicator");
const diceDisplay = document.querySelector(".dice-display p:first-child");
const currentScoreDisplay = document.querySelector(".dice-display p:last-child");
const savedScore1 = document.querySelector(".player-box:nth-child(2) p");
const savedScore2 = document.querySelector(".player-box:nth-child(3) p");
const player1Input = document.querySelector(".player-box:nth-child(2) input");
const player2Input = document.querySelector(".player-box:nth-child(3) input");
const rollButton = document.querySelector(".rollDice");
const saveButton = document.querySelector(".saveButton");
const resetButton = document.querySelector(".resetButton");
const player1Heading = document.getElementById("player1Heading");
const player2Heading = document.getElementById("player2Heading");

player1Input.addEventListener("input", function () {
    player1Name = this.value || "Player 1";
    player1Heading.textContent = `👤Player 1: ${player1Name}`;
    update();
});

document.querySelectorAll(".player-box input").forEach((input, index) => {
    input.addEventListener("input", () => {
        let playerNumber = index + 1;
        let playerName = input.value.trim(); 
        
        if (playerName) {
            document.querySelectorAll(".player-box h3")[index].textContent = `👤 Player ${playerNumber}: ${playerName}`;
        }
    });
});


player2Input.addEventListener("input", function () {
    player2Name = this.value || "Player 2";
    player2Heading.textContent = `👤Player 2: ${player2Name}`;
    update();
});

rollButton.addEventListener("click", () => {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceDisplay.textContent = `🎲 Dice: ${dice}`;

    if (dice === 1) {
        currScore[activePlayer] = 0;
        switchTurn();
    } else {
        currScore[activePlayer] += dice;
    }
    update();
});

saveButton.addEventListener("click", () => {
    savedScore[activePlayer] += currScore[activePlayer];
    currScore[activePlayer] = 0;

    if (savedScore[activePlayer] >= winningCondition) {
        let winnerName = activePlayer === "Player 1" ? player1Name : player2Name;
        dis.textContent = `${winnerName} Wins! 🎉`; 
        disableGame();
        return;
    }
    switchTurn();
    update();
});

resetButton.addEventListener("click", () => {
    player1Input.value = "";
    player2Input.value = "";
    player1Heading.textContent = `👤Player 1`;
    player2Heading.textContent = `👤Player 2`;
    currScore = { "Player 1": 0, "Player 2": 0 };
    savedScore = { "Player 1": 0, "Player 2": 0 };
    activePlayer = "Player 1";
    turnIndicator.textContent = "🎯 Player 1's Turn!";
    enableGame();
    update();
    location.reload(); 
});

function switchTurn() {
    activePlayer = activePlayer === "Player 1" ? "Player 2" : "Player 1";
    let winnerName = activePlayer === "Player 1" ? player1Name : player2Name;
    turnIndicator.textContent = `🎯 ${winnerName}'s Turn!`;
}

function update() {
    currentScoreDisplay.textContent = `Current Score: ${currScore[activePlayer]}`;
    savedScore1.textContent = `Saved Score: ${savedScore["Player 1"]}`;
    savedScore2.textContent = `Saved Score: ${savedScore["Player 2"]}`;
}

function disableGame() {
    rollButton.disabled = true;
    saveButton.disabled = true;
}

function enableGame() {
    rollButton.disabled = false;
    saveButton.disabled = false;
}
