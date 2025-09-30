// ✅ Шаг 1: Объявляем массив с вопросами. Это очень важно!
const quizQuestions = [
  {
    question: "Какой язык программирования работает в браузере?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: "JavaScript"
  },
  {
    question: "Что означает аббревиатура CSS?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Cool Styling System"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Какое свойство CSS отвечает за цвет текста?",
    options: ["background-color", "text-color", "color", "font-color"],
    correctAnswer: "color"
  }
];

// ✅ Шаг 2: Инициализируем переменные для отслеживания состояния игры
let currentQuestionIndex = 0;
let score = 0;

// ✅ Шаг 3: Находим HTML-элементы на странице
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options-container');
const quizBox = document.getElementById('question-box');
const resultBox = document.getElementById('result-box');
const scoreEl = document.getElementById('final-score');

// ✅ Шаг 4: Функция для отображения текущего вопроса
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = '';
  
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = checkAnswer;
    optionsEl.appendChild(button);
  });
}

// ✅ Шаг 5: Функция для проверки ответа
function checkAnswer(event) {
  const selectedOption = event.target.textContent;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    alert("Правильно!");
  } else {
    alert("Неправильно. Правильный ответ: " + currentQuestion.correctAnswer);
  }

  currentQuestionIndex++;
  
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// ✅ Шаг 6: Функция для показа результатов
function showResults() {
  quizBox.style.display = 'none';
  resultBox.style.display = 'block';
  scoreEl.textContent = `Ваш счет: ${score} из ${quizQuestions.length}.`;
}

// ✅ Шаг 7: Запускаем игру!
showQuestion();