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
const dis = document.getElementById("dis");


document.querySelectorAll(".player-box input").forEach((input, index) => {
    input.addEventListener("input", () => {
        let playerNumber = index + 1;
        let playerName = input.value.trim(); 
        let playerHeading = document.querySelectorAll(".player-box h3")[index];

        if (playerName) {
            playerHeading.textContent = `👤 Player ${playerNumber}: ${playerName}`;
            if (playerNumber === 1) player1Name = playerName;
            if (playerNumber === 2) player2Name = playerName;
        } else {
            playerHeading.textContent = `👤 Waiting for Player ${playerNumber}...`;
        }
    });
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
    currScore = { "Player 1": 0, "Player 2": 0 };
    savedScore = { "Player 1": 0, "Player 2": 0 };
    activePlayer = "Player 1";
    turnIndicator.textContent = `🎯 ${player1Name || "Player 1"}'s Turn!`;
    enableGame();
    update();
});

function switchTurn() {
    activePlayer = activePlayer === "Player 1" ? "Player 2" : "Player 1";
    let activePlayerName = activePlayer === "Player 1" ? (player1Name || "Player 1") : (player2Name || "Player 2");
    turnIndicator.textContent = `🎯 ${activePlayerName}'s Turn!`;
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

