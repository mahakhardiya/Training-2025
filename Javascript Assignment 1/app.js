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

player1Input.addEventListener("input", function () {
    player1Name = this.value || "Player 1";
    update();
});

player2Input.addEventListener("input", function () {
    player2Name = this.value || "Player 2";
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
        turnIndicator.textContent = `${activePlayer} Wins! 🎉`;
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
    turnIndicator.textContent = "🎯 Player 1's Turn!";
    enableGame();
    update();
});

function switchTurn() {
    activePlayer = activePlayer === "Player 1" ? "Player 2" : "Player 1";
    turnIndicator.textContent = `🎯 ${activePlayer}'s Turn!`;
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
