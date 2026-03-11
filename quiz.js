// Add questions

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
        question: "Which of the following is a type of rock",
        answers: [
            { text: "Granite", correct: true },
            { text: "Wood", correct: false },
            { text: "Water", correct: false },
            { text: "Air", correct: false }
        ]
    },
    {
        question: "Who is the author of the book 'Things fall apart'?",
        answers: [
            { text: "Chinua Achebe", correct: true },
            { text: "Wole Soyinka", correct: false },
            { text: "Ngugi wa Thiong'o", correct: false },
            { text: "J.K Rowling", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system",
        answers: [
            { text: "Earth", correct: false },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "Which Nigerian dish is made from cassava",
        answers: [
            { text: "Jollof rice", correct: false },
            { text: "Fufu", correct: true },
            { text: "Suya", correct: false },
            { text: "Egusi soup", correct: false }
        ]
    },
    {
        question: "Who is the founder of Facebook",
        answers: [
            { text: "Mark Zuckerberg", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false },
            { text: "Elon Musk", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol of gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Hg", correct: false },
            { text: "Pb", correct: false }
        ]
    },
    {
        question: "Which of the following is a type of computer network",
        answers: [
            { text: "LAN", correct: false },
            { text: "WAN", correct: false },
            { text: "MAN", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "Who is the current president of Nigeria",
        answers: [
            { text: "Muhammadu Buhari", correct: false },
            { text: "Goodluck Jonathan", correct: false },
            { text: "Olusegun Obasanjo", correct: false },
            { text: "Bola Tinubu", correct: true }
        ]
    },
    {
        question: "What is the largest mammal on earth",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Hippopotamus", correct: false },
            { text: "Giraffe", correct: false }
        ]
    }
];

// Select elements

const theQuestion = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const welcomeScreen = document.getElementById("welcomeScreen");
const startButton = document.getElementById("startButton");


let currentQuestionIndex = 0;
let score = 0;

// Start quiz

function startQuiz() {
    welcomeScreen.style.display = "none";

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Display the question

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    theQuestion.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}



//Resetting the question

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}


//  When is being selected

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedBtn.style.backgroundColor = "green";
    } else {
        selectedBtn.style.backgroundColor = "red";
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}



nextButton.addEventListener("click", () => {

    if (nextButton.innerHTML === "Restart") {
        startQuiz();
        return;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    theQuestion.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

startButton.addEventListener("click", startQuiz);