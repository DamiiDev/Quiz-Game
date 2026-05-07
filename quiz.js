const questions = [
    {
        question: "What is the capital of Nigeria?",
        answers: [
            { text: "Lagos", correct: false },
            { text: "Abuja", correct: true },
            { text: "Kano", correct: false },
            { text: "Ibadan", correct: false }
        ]
    },
    {
        question: "Which of the following is a type of rock?",
        answers: [
            { text: "Granite", correct: true },
            { text: "Wood", correct: false },
            { text: "Water", correct: false },
            { text: "Air", correct: false }
        ]
    },
    {
        question: "Who authored the book 'Things Fall Apart'?",
        answers: [
            { text: "Chinua Achebe", correct: true },
            { text: "Wole Soyinka", correct: false },
            { text: "Ngugi wa Thiong'o", correct: false },
            { text: "J.K. Rowling", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "Which Nigerian dish is made from cassava?",
        answers: [
            { text: "Jollof rice", correct: false },
            { text: "Fufu", correct: true },
            { text: "Suya", correct: false },
            { text: "Egusi soup", correct: false }
        ]
    },
    {
        question: "Who is the founder of Facebook?",
        answers: [
            { text: "Mark Zuckerberg", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false },
            { text: "Elon Musk", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Hg", correct: false },
            { text: "Pb", correct: false }
        ]
    },
    {
        question: "Which of the following is a type of computer network?",
        answers: [
            { text: "LAN", correct: false },
            { text: "WAN", correct: false },
            { text: "MAN", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "Who is the current president of Nigeria?",
        answers: [
            { text: "Muhammadu Buhari", correct: false },
            { text: "Goodluck Jonathan", correct: false },
            { text: "Olusegun Obasanjo", correct: false },
            { text: "Bola Tinubu", correct: true }
        ]
    },
    {
        question: "What is the largest mammal on earth?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Hippopotamus", correct: false },
            { text: "Giraffe", correct: false }
        ]
    }
];

// DOM references
const welcomeScreen   = document.getElementById("welcomeScreen");
const quizScreen      = document.getElementById("quizScreen");
const scoreScreen     = document.getElementById("scoreScreen");
const startButton     = document.getElementById("startButton");
const restartBtn      = document.getElementById("restartBtn");
const theQuestion     = document.getElementById("question");
const answerButtons   = document.getElementById("answer-buttons");
const nextButton      = document.getElementById("next-btn");
const progressBar     = document.getElementById("progressBar");
const questionCounter = document.getElementById("questionCounter");
const scoreDisplay    = document.getElementById("scoreDisplay");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    welcomeScreen.style.display = "none";
    scoreScreen.style.display   = "none";
    quizScreen.style.display    = "block";

    showQuestion();
}

function showQuestion() {
    resetState();

    const q   = questions[currentQuestionIndex];
    const num = currentQuestionIndex + 1;

    theQuestion.textContent = q.question;
    questionCounter.textContent = `${num} / ${questions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    progressBar.style.width = `${(num / questions.length) * 100}%`;

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-btn");
        if (answer.correct) btn.dataset.correct = "true";
        btn.addEventListener("click", selectAnswer);
        answerButtons.appendChild(btn);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML  = "";
}

function selectAnswer(e) {
    const selected  = e.target;
    const isCorrect = selected.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selected.classList.add("correct");
    } else {
        selected.classList.add("wrong");
    }

    // Reveal the correct answer and disable all buttons
    Array.from(answerButtons.children).forEach(btn => {
        if (btn.dataset.correct === "true") btn.classList.add("correct");
        btn.disabled = true;
    });

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.style.display = "inline-flex";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    quizScreen.style.display = "none";
    scoreScreen.style.display = "flex";

    const pct = score / questions.length;
    let emoji, heading, msg;

    if (pct === 1) {
        emoji   = "🏆";
        heading = "Perfect score!";
        msg     = "Outstanding — you got every single one right. A true scholar!";
    } else if (pct >= 0.7) {
        emoji   = "🎉";
        heading = "Great job!";
        msg     = "Solid performance. Just a couple more to master and you'll ace it next time.";
    } else if (pct >= 0.4) {
        emoji   = "📚";
        heading = "Keep going!";
        msg     = "Good effort! A bit more study and you'll be flying through these questions.";
    } else {
        emoji   = "💪";
        heading = "Don't give up!";
        msg     = "Every expert was once a beginner. Give it another shot!";
    }

    document.getElementById("scoreBadge").textContent   = emoji;
    document.getElementById("scoreHeading").textContent = heading;
    document.getElementById("scoreMsg").textContent     = msg;
    document.getElementById("scoreFraction").textContent = `${score} / ${questions.length}`;
}

startButton.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
