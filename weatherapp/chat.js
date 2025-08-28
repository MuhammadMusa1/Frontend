// Массив с шутками (разные категории)
const jokes = [
    {
        category: "🐶 Про животных",
        text: "Почему собаки не могут работать на компьютере? Потому что у них лапы — они постоянно нажимают не те кнопки!"
    },
    {
        category: "💻 Про программистов",
        text: "Почему программисты путают Хэллоуин и Рождество? Потому что Oct 31 == Dec 25!"
    },
    {
        category: "🍕 Про еду",
        text: "Почему пицца такая популярная? Потому что даже когда она плохая, она всё равно хорошая!"
    },
    {
        category: "🎓 Про студентов",
        text: "Студент на экзамене: 'Профессор, я знаю ответ, но не могу его выразить словами!' Профессор: 'Ничего, выражайте буквами. Хотя бы тройку поставлю.'"
    },
    {
        category: "🛒 Про покупки",
        text: "Муж жене: 'Дорогая, я купил тебе на день рождения то, о чём ты всегда мечтала!' Жена: 'О боже, ты наконец-то научился слушать?'"
    },
    {
        category: "🏥 Про врачей",
        text: "Доктор, я буду жить? 'А смысл?'"
    },
    {
        category: "💰 Про деньги",
        text: "Банкомат спросил, нужна ли мне квитанция. Я сказал: 'Нет, я и так запомню, как ты меня обобрал.'"
    },
    {
        category: "🐔 Про птиц",
        text: "Почему курица перешла дорогу? Чтобы доказать опоссуму, что это можно сделать!"
    },
    {
        category: "📱 Про технологии",
        text: "Почему iPhone никогда не бывает одинок? Потому что у него всегда есть Apple Watch!"
    },
    {
        category: "☕ Про кофе",
        text: "Кофеин — это способ заставить тело делать то, чего не хочет разум."
    }
];

// Ключевые слова для активации бота
const triggerWords = ['шутка', 'смех', 'расскажи', 'смешн', 'юмор', 'прикол', 'анекдот', 'посмеяться'];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    // Обновляем время каждую минуту
    setInterval(updateTime, 60000);
});

// Обновление времени в приветственном сообщении
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Отправка сообщения
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        
        // Проверяем, содержит ли сообщение ключевые слова
        const hasTriggerWord = triggerWords.some(word => 
            message.toLowerCase().includes(word)
        );
        
        if (hasTriggerWord) {
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                const randomJoke = getRandomJoke();
                addJokeMessage(randomJoke);
            }, 1500 + Math.random() * 1000); // Случайная задержка для реалистичности
        } else {
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                addMessage('Напишите "шутка", "смех" или "расскажи" чтобы получить шутку!', 'bot');
            }, 1000);
        }
        
        scrollToBottom();
    }
}

// Быстрая команда через кнопки
function quickCommand(command) {
    document.getElementById('userInput').value = command;
    sendMessage();
}

// Обработка нажатия Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Добавление сообщения в чат
function addMessage(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${timeString}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Добавление сообщения с шуткой
function addJokeMessage(joke) {
    const chatMessages = document.getElementById('chatMessages');
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="joke-category">${joke.category}</div>
            <div class="joke-text">${joke.text}</div>
        </div>
        <div class="message-time">${timeString}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Показать индикатор набора текста
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Убрать индикатор набора текста
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Получение случайной шутки
function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
}

// Прокрутка чата вниз
function scrollToBottom() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Дополнительная функция: очистка чата
function clearChat() {
    if (confirm('Очистить всю историю чата?')) {
        const chatMessages = document.getElementById('chatMessages');
        // Сохраняем только первое приветственное сообщение
        const welcomeMessage = chatMessages.firstElementChild;
        chatMessages.innerHTML = '';
        chatMessages.appendChild(welcomeMessage);
        updateTime();
    }
}

// Добавляем обработчик для двойного клика по заголовку для очистки чата
document.querySelector('h1').addEventListener('dblclick', clearChat);