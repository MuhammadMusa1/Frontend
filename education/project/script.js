// ... (здесь код из шага 2)

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options-container');
const quizBox = document.getElementById('question-box');
const resultBox = document.getElementById('result-box');
const scoreEl = document.getElementById('final-score');

// Функция для отображения текущего вопроса
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = ''; // Очищаем старые кнопки
  
  // Создаем кнопки для каждого варианта ответа
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = checkAnswer; // Привязываем функцию проверки
    optionsEl.appendChild(button);
  });
}

// Функция для проверки ответа
function checkAnswer(event) {
  const selectedOption = event.target.textContent;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Условный оператор: если ответ правильный...
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    alert("Правильно!");
  } else {
    alert("Неправильно. Правильный ответ: " + currentQuestion.correctAnswer);
  }

  // Переходим к следующему вопросу
  currentQuestionIndex++;
  
  // Проверяем, не закончились ли вопросы
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Функция для показа результатов
function showResults() {
  quizBox.style.display = 'none'; // Скрываем вопросы
  resultBox.style.display = 'block'; // Показываем результаты
  scoreEl.textContent = `Ваш счет: ${score} из ${quizQuestions.length}.`;
}

// Запускаем игру!
showQuestion();