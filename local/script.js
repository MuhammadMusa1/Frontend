// Переменная для хранения всех записей в виде массива
let allMoods = [];

// Функция, которая загружает записи из localStorage
function loadMoods() {
    // 1. Получаем строку с записями из localStorage по ключу 'moodDiary'
    const savedMoods = localStorage.getItem('moodDiary');
    
    // 2. Если данные существуют, парсим JSON-строку обратно в массив
    if (savedMoods) {
        allMoods = JSON.parse(savedMoods);
        // 3. Отображаем все записи на странице
        renderMoods();
    }
}

// Функция, которая сохраняет записи в localStorage
function saveMood() {
    // 1. Получаем текст из поля ввода
    const moodTextarea = document.getElementById('moodText');
    const moodContent = moodTextarea.value.trim();

    // 2. Если текст не пустой, создаем объект с записью
    if (moodContent) {
        const newMood = {
            id: Date.now(), // Уникальный ID на основе времени
            content: moodContent,
            date: new Date().toLocaleDateString('ru-RU') // Текущая дата
        };
        
        // 3. Добавляем новую запись в наш массив
        allMoods.push(newMood);
        
        // 4. "Упаковываем" массив в JSON-строку
        const jsonMoods = JSON.stringify(allMoods);
        
        // 5. Сохраняем JSON-строку в localStorage
        localStorage.setItem('moodDiary', jsonMoods);

        // 6. Очищаем поле ввода и обновляем список на странице
        moodTextarea.value = '';
        renderMoods();
    }
}

// Функция, которая отображает все записи на странице
function renderMoods() {
    const moodList = document.getElementById('moodList');
    // Очищаем список перед обновлением
    moodList.innerHTML = '';
    
    // Перебираем массив и создаем HTML-элемент для каждой записи
    allMoods.forEach(mood => {
        const li = document.createElement('li');
        li.classList.add('mood-item');
        li.innerHTML = `
            <div class="content">${mood.content}</div>
            <div class="date">${mood.date}</div>
        `;
        moodList.appendChild(li);
    });
}

// Запускаем загрузку данных при старте
loadMoods();