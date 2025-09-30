const quizQuestions = [
   {
    question: "Какой тег HTML используется для создания гиперссылки?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correctAnswer: "<a>"

   },
   {
    question: "Какое свойство CSS отвечает за цвет текста?",
    options: ["background-color", "text-color", "color", "font-color"],
    correctAnswer: "color"
   },
   {
    question: "Какой метод используется для добавления элемента в конец массива в JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()"
   },
    {
    question: "Какое свойство CSS отвечает за размер шрифта?",  
    options: ["font-size", "font-style", "font-weight", "font-family"], 
    correctAnswer: "font-size"
    },
    {
    question: "Какое свойство CSS отвечает за отступ слева?",  
    options: ["margin-left", "margin-right", "margin-top", "margin-bottom"],    
    correctAnswer: "margin-left"
    } 
];
//  Шаг 2: Инициализируем переменные для отслеживания состояния игры
let currentQuestionIndex = 0;
let score = 0;
//  Шаг 3: Находим HTML-элементы на странице
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options-container');
const quizBox = document.getElementById('question-box');
const resultBox = document.getElementById('result-box');
const scoreEl = document.getElementById('final-score');
//  Шаг 4: Функция для отображения текущего вопроса
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = '';

    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = checkAnswer; // Привязываем функцию проверки
      optionsEl.appendChild(button);
    });
}
//  Шаг 5: Функция для проверки ответа
function checkAnswer(event){
    const selectedOption = event.target.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if(selectedOption === currentQuestion.correctAnswer){
        score++;
        alert("Правильно!");
    }else{
        alert("Неправильно. Правильный ответ: " + currentQuestion.correctAnswer);
    }
    currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();
    }else{
        showResults();
    }
}
//  Шаг 6: Функция для показа результатов
function showResults(){
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreEl.textContent = `Ваш счет: ${score} из ${quizQuestions.length}.`; 
}
//  Шаг 7: Показываем первый вопрос
showQuestion();