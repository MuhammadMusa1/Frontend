// Получаем элементы DOM
const balance = document.getElementById('balance');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Глобальный массив для хранения всех транзакций
let transactions = [];

// Функция для загрузки транзакций из localStorage
function loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
    }
    updateUI();
}

// Функция для сохранения транзакций в localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Функция для добавления транзакции
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Пожалуйста, заполните оба поля');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value // Преобразуем строку в число
    };

    transactions.push(transaction);
    updateUI();
    saveTransactions();
    
    // Очищаем поля формы
    text.value = '';
    amount.value = '';
}

// Функция для удаления транзакции по ID
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI();
    saveTransactions();
}

// Генерация уникального ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Функция для обновления всего интерфейса
function updateUI() {
    // Очищаем список транзакций
    list.innerHTML = '';
    
    // Перебираем массив транзакций
    transactions.forEach(transaction => {
        const item = document.createElement('li');
        const sign = transaction.amount < 0 ? '-' : '+';
        
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
        item.innerHTML = `
            ${transaction.text} <span>${sign}${Math.abs(transaction.amount)} ₽</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
        `;
        list.appendChild(item);
    });

    // Вычисляем баланс
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);
    
    balance.innerText = `${total} ₽`;
    incomeAmount.innerText = `${income} ₽`;
    expenseAmount.innerText = `${expense} ₽`;
}

// Обработчики событий
form.addEventListener('submit', addTransaction);

// Загружаем данные при старте
loadTransactions();