// DOM Elements
// Main Menu - Menu Principal
const MAIN_MENU = document.getElementById('start-screen');
const START_BTN = document.getElementById('start-btn');

// Quiz Game Screen - Pantalla del juego de Quiz
const QUIZ_SCREEN = document.getElementById('quiz-screen');
const QUIZ_QUESTION_TEXT = document.getElementById('quiz-question-text');
const CURRENT_QUESTION = document.getElementById('current-question');
const TOTAL_QUESTIONS = document.getElementById('total-questions');
const SCORE = document.getElementById('score');
const ANSWERS_CONTINER = document.getElementById('answers-continer');
const PROGRESS_BAR = document.getElementById('progress-bar');

// Results Screen - Pantalla de resultados
const RESULT_SCREEN = document.getElementById('result-screen');
const FINAL_SCORE = document.getElementById('final-score');
const MAX_SCORE = document.getElementById('max-score');
const RESULT_MESSAGE = document.getElementById('result-message');
const RESTART_BTN = document.getElementById('restart-btn');

const audio = [
    new Audio('./src/assets/audio/el-acabado.mp3'),
    new Audio('./src/assets/audio/el-que-lo-critica.mp3'),
    new Audio('./src/assets/audio/boeee.mp3'),
];

// Quiz questions - Preguntas del quiz
const quizQuestions = [
    {
        question: "In programming, what do we call a mistake in the code that prevents a program from working correctly?", // question - pregunta
        options: ['A featre', 'A lag', 'A virus', 'A bug', 'A glitch'], // options - opciones de respuesta
        answer: 3, // correct answer - respuesta correcta index de 0 - 4
        hint: "It is also the name of a small insect." // question hint - pista de la pregunta
    },
    {
        question: `Which famous 'meme' language is often used to teach the basics of loops and conditions in a funny way?`,
        options: ['C++', 'Java', 'Python', 'LOLCODE', 'Binary'],
        answer: 3,
        hint: "Think about the funny cat pictures from the early 2000s."
    },
    {
        question: "In the world of the internet, what does the 'HTTP 404' error code mean?",
        options: ['Success', 'Page Not Found', 'Access Denied', 'Virus Detected', 'Server Down'],
        answer: 1,
        hint: "You see this when you click a 'broken link'."
    },
    {
        question: "Which of these is a famous 'Cheat Code' from video games that is often referenced by programmers and geeks?",
        options: ['The Konami Code', 'The Da Vinci Code', 'The Morse Code', 'The Source Code', 'The Binary Code'],
        answer: 0,
        hint: "It starts with: Up, Up, Down, Down..."
    },
    {
        question: "What is the common term for a person who writes code but is also part of the 'hacker' culture in a positive way?",
        options: ['Scammer', 'Newbie', 'Bot', 'Troll', 'White Hat'],
        answer: 4,
        hint: "Think of a color that represents 'good' or 'pure' in many cultures."
    },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0; 
let score = 0;
let answersStatus = false;

// QUIZ START
START_BTN.addEventListener('click', startQuiz); // we lisen when we click the button and run the start quiz function - escuchamos cuando hacemos click e el boton y corremos la funcion de empezar quiz
RESTART_BTN.addEventListener('click', restartQuiz);

function startQuiz() {
    // fast variable reset - reseteo rapido de variables
    currentQuestionIndex = 0;
    score = 0;
    SCORE.textContent = 0;
    CURRENT_QUESTION.textContent = 1;
    PROGRESS_BAR.style.width = `0%`;

    // change the screen - Cambia a la siguiente pantalla
    MAIN_MENU.classList.remove('active');   // hide the menu - esconde el menu
    QUIZ_SCREEN.classList.add('active');    // show the game - muestra el juego

    // show the first question - mostrar la primera pregunta
    showQuestion(); 
}

// show the questions (title, options, correct answer, hint) - mostramos las preguntas (titulo, respuesta correcta, pista)
function showQuestion() {
    answersStatus = false;
    const currentQuestions = quizQuestions[currentQuestionIndex];
    QUIZ_QUESTION_TEXT.textContent = currentQuestions.question;
    ANSWERS_CONTINER.innerHTML = '';

    currentQuestions.options.forEach((option, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.textContent = option;
        answerBtn.classList.add("answer__btn");
        answerBtn.dataset.index = index;

        ANSWERS_CONTINER.appendChild(answerBtn);

        answerBtn.addEventListener('click', selectAnswer);
    });
    
}

function selectAnswer(event) {
    
    const answerBtn = event.target;
    const selectedBtn = Number(event.target.dataset.index);
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if(answersStatus === true) return;
    answersStatus = true;
    
    if(selectedBtn === currentQuestion.answer) {
        audio[1].play();
        answerBtn.classList.add('correct');
        console.log("correcto");
        SCORE.textContent = score += 1;
        currentQuestionIndex++
    } else {
        audio[0].play();
        answerBtn.classList.add('incorrect');
        console.log("incorrecto");
        currentQuestionIndex++;
    }

    setTimeout(() => {
        answersStatus = false;
        
        if(currentQuestionIndex < quizQuestions.length) {
            CURRENT_QUESTION.textContent = currentQuestionIndex + 1;
            showQuestion();
        } else {
            showVictory();
        }

        const percentage = (currentQuestionIndex / quizQuestions.length) * 100;
        PROGRESS_BAR.style.width = `${percentage}%`;

        console.log('paso 800 milisegundo');
    }, 800);
    
}


function showVictory() {
    audio[2].play();
    QUIZ_SCREEN.classList.remove('active');
    RESULT_SCREEN.classList.add('active');
    FINAL_SCORE.textContent = score;

    if(score == quizQuestions.length) {
        RESULT_MESSAGE.textContent = "Perfect! You're a genius!";
    } else if (score == 3 || score == 4) {
        RESULT_MESSAGE.textContent = "Great job! You know your stuff!";
    } else {
        RESULT_MESSAGE.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    RESULT_SCREEN.classList.remove('active');
    startQuiz();
}
