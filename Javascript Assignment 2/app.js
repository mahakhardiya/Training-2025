document.addEventListener("DOMContentLoaded", () => {

const startScreen = document.getElementById("starting-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const categorySelect = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");
const startButton = document.getElementById("start-game");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const timerElement = document.getElementById("time-left");
const submitButton = document.getElementById("submit-answer");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-game");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let selectedAnswer = false;

async function fetchCategories() {
    try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        data.trivia_categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

async function fetchQuestions() {
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;
    const url = `https://opentdb.com/api.php?amount=15&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        questions = data.results;
        currentQuestionIndex = 0;
        score = 0;
        showGameScreen();
        displayQuestion();
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showEndScreen();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    questionElement.innerHTML = `🎯 <strong>Question ${currentQuestionIndex + 1} of 15:</strong> ${questionData.question}`;

    optionsContainer.innerHTML = "";
    let answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers = answers.sort(() => Math.random() - 0.5);

    selectedAnswer = false;

    answers.forEach(answer => {
        const label = document.createElement("label");
        label.classList.add("option-label");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-option";
        input.value = answer;

        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + answer));
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement("br"));
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.innerHTML = `⏳${timeLeft}`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `⏳${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            revealCorrectAnswer();
        }
    }, 1000);
}

function revealCorrectAnswer() {
    clearInterval(timer);

    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    const labels = document.querySelectorAll(".option-label");

    labels.forEach(label => {
        const input = label.querySelector("input");

        if (input.value === correctAnswer) {
            label.classList.add("correct-answer"); 
            label.innerHTML += " ✅";
        } 
        if (selectedOption && input.value === selectedOption.value && selectedOption.value !== correctAnswer) {
            label.style.color = "red"; 
            label.innerHTML += " ❌";
        }
    });

    if (selectedOption && selectedOption.value === correctAnswer) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 2000);
}

submitButton.addEventListener("click", () => {
    if (selectedAnswer) return; 

    selectedAnswer = true;
    revealCorrectAnswer();
});


function showGameScreen() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    endScreen.style.display = "none";
}

function showEndScreen() {
    gameScreen.style.display = "none";
    endScreen.style.display = "block";

    let message = "🎉 Great Job!";
    if (score < 5) {
        message = "😢 Better Luck Next Time!";
    } else if (score < 10) {
        message = "😊 Keep Improving!";
    }

    finalScoreElement.innerHTML = `${message} <br> 🏆 <strong>Score:</strong> <span style="color: green;">${score}</span> out of <strong>15</strong>`;
}

restartButton.addEventListener("click", () => {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    endScreen.style.display = "none";
    // fetchQuestions();
});

startButton.addEventListener("click", fetchQuestions);

fetchCategories();

});

