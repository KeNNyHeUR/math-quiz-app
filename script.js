// Quiz Questions and Answers
const questions = [
    { question: "What is 5 + 3?", answer: 8 },
    { question: "What is 12 - 4?", answer: 8 },
    { question: "What is 7 * 2?", answer: 14 },
    { question: "What is 9 / 3?", answer: 3 }
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 10; // Time for each question in seconds

function startTimer() {
    timeLeft = 10;
    updateTimer();

    timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
}

function handleTimeout() {
    document.getElementById('result').textContent = 'Time is up!';
    document.getElementById('result').style.color = 'red';
    gsap.to('#result', { opacity: 1, duration: 0.5, scale: 1.1 });
    document.getElementById('next').disabled = false; // Enable the Next button
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = questions[currentQuestionIndex].question;
    
    // Fade in the question
    gsap.fromTo("#question", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });

    startTimer(); // Start the timer when a new question is loaded
}

function checkAnswer() {
    clearInterval(timer); // Stop the timer when an answer is submitted

    const answer = parseInt(document.getElementById('answer').value);
    const correctAnswer = questions[currentQuestionIndex].answer;
    const resultElement = document.getElementById('result');

    if (answer === correctAnswer) {
        gsap.to(resultElement, { opacity: 1, duration: 0.5, scale: 1.1 });
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'lightgreen';
    } else {
        gsap.to(resultElement, { opacity: 1, duration: 0.5, scale: 1.1 });
        resultElement.textContent = 'Incorrect. Try again.';
        resultElement.style.color = 'red';
    }

    document.getElementById('next').disabled = false; // Enable the Next button
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
    document.getElementById('next').disabled = true; // Disable the Next button until the question is answered
}

// Event Listeners
document.getElementById('submit').addEventListener('click', checkAnswer);
document.getElementById('next').addEventListener('click', nextQuestion);

// Initial Setup
loadQuestion();
