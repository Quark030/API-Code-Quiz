
// Connect elements with html elements
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const userFormContainer = document.getElementById("user-form-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score"); 
const indications = document.getElementById("indications");
const timeEl = document.getElementById("time");

//Add variables and initialize variables at some value
let shuffledQuestions, currentQuestionIndex;
let timerInterval;
let secondsLeft = 60;
let score = 0; // 

// Event listeners for buttons
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {   //Reload page
  currentQuestionIndex++;
  setNextQuestion();
});

// Function for initializaing the game
function startGame() {
  startButton.classList.add("hide");
  indications.classList.add("hide");
  userFormContainer.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();

  startTimer(); // Start timer
}

// Function for initialize the timer
function startTimer() {
  timeEl.textContent = secondsLeft + " seconds left"; //Show initial time

  timerInterval = setInterval(() => {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      hideTimer(); // Hide timer when time ends
      showUserForm();// if that happens we show the form to user
    }
  }, 1000);
}

// Function for hiding the timer
function hideTimer() {
  timeEl.classList.add("hide"); // Add class  method to add the property hide
}

// Function for setting up next question with the result of  shuffledQuest 
//already randomed asigning the result with currentQuestionIndex
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//Function for showing question on DOM
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// Function for reset state and hide the next button and 
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Function for select answer as correct or incorrect
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (correct) {
    score++; //Add score if answe is correct
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");  //remove the previous answered question from the array of options
  } else {
    startButton.innerText = "Next";
    startButton.classList.remove("hide");
    startButton.removeEventListener("click", setNextQuestion);
    startButton.addEventListener("click", showUserForm);
  }
}

// Function for showing form to user
function showUserForm() {
  questionContainerElement.classList.add("hide");
  userFormContainer.classList.remove("hide");
  submitButton.classList.remove("hide");
  submitButton.addEventListener("click", showScore); // It shows the score 
  nextButton.classList.add("hide"); // Hide next button
  hideTimer(); // Hide timer
}


// Function for showing score
function showScore() {
  submitButton.removeEventListener("click", showScore);
  submitButton.classList.add("hide"); 
  scoreElement.textContent = "Your final score is: " + score; // Shows score :P
  scoreElement.classList.remove("hide"); 
}


// Función para establecer la clase de estado en un elemento
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// Function fro clearing  screen  and change the clor based on answer
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// Arrays of answers and questions
const questions = [
  {
    question: "What is the extension of java code files?",
    answers: [
      { text: ".js", correct: true },
      { text: ".txt", correct: false },
      { text: ".class", correct: false },
      { text: ".jv", correct: false },
    ],
  },
  {
    question: "is the process of finding errors and fixing them within a program.",
    answers: [
      { text: "Compiling", correct: false },
      { text: "Executing", correct: false },
      { text: "Debugging", correct: true },
      { text: "Scanning", correct: false },
    ],
  },
  {
    question: "A loop that never ends is referred to as",
    answers: [
      { text: "While loop", correct: false },
      { text: "Infinite Loop", correct: true },
      { text: "Recursive loop", correct: false },
      { text: "For loop", correct: false },
    ],
  },
  {
    question: "Which tag do we use in HTML for inserting a line-break?",
    answers: [
      { text: "<br>", correct: true },
      { text: "<ar>", correct: false },
      { text: "<cr>", correct: false },
      { text: "<gr>", correct: false },
    ],
  },
  {
    question: "Which tag is used in HTML5 for the initialization of the document type?",
    answers: [
      { text: "Doctype HTML>", correct: false },
      { text: "!DOCTYPE html>", correct: true },
      { text: "Doctype>", correct: false },
      { text: "Doctype html>", correct: false },
    ],
  },
];
