Документация кода "Список дел" (Vue.js)
Оглавление
Общее описание

Структура проекта

HTML структура

CSS стили

Vue.js компонент

Методы

Локальное хранилище

Функциональность

 Общее описание
Список дел - это одностраничное веб-приложение (SPA), разработанное на Vue.js 3, для управления задачами с сохранением данных в локальном хранилище браузера.

Технологический стек:
Vue.js 3 - фронтенд фреймворк

HTML5 - разметка

CSS3 - стилизация

LocalStorage - хранение данных

JavaScript ES6+ - логика приложения

 Структура проекта
text
todo-app/
│
├── index.html              # Главный HTML файл
├── styles.css              # Стили (встроенные)
└── <script>                # Vue.js логика (встроенная)
 HTML структура
Основные элементы:
html
<div id="app" class="container">
    <h1>Список дел</h1>
    
    <!-- Форма добавления задач -->
    <div class="task-form">
        <input v-model="newTask" placeholder="Введите задачу...">
        <button @click="addTask">Добавить</button>
    </div>
    
    <!-- Список задач -->
    <div class="task-list">
        <div v-for="task in tasks" class="task-card">
            <!-- Отображение/редактирование задачи -->
            <span v-if="!task.isEditing">{{ task.text }}</span>
            <input v-else v-model="task.text">
            
            <!-- Кнопки управления -->
            <button @click="toggleTask">{{ task.completed ? 'Отменить' : 'Выполнено' }}</button>
            <button class="edit" @click="editTask">{{ task.isEditing ? 'Сохранить' : 'Редактировать' }}</button>
            <button @click="deleteTask">Удалить</button>
        </div>
    </div>
</div>
 CSS стили
Основные стилевые блоки:
1. Сброс и базовые стили
css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}
2. Контейнер приложения
css
.container {
    width: 100%;
    max-width: 600px;
    padding: 20px;
}
3. Карточка задачи
css
.task-card {
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-card.completed {
    background-color: #e0f7e0;
    text-decoration: line-through;
}
 Vue.js компонент
Инициализация приложения
javascript
const { createApp } = Vue;

createApp({
    // Опции компонента
}).mount('#app');
Data свойства
javascript
data() {
    return {
        newTask: '',          // Текст новой задачи
        tasks: []            // Массив задач
    };
}
 Методы
1. addTask() - Добавление задачи
Назначение: Создание новой задачи и добавление в список

Логика:

Проверяет, что поле не пустое

Создает объект задачи с уникальным ID

Добавляет задачу в массив tasks

Очищает поле ввода

Сохраняет в localStorage

javascript
addTask() {
    if (this.newTask.trim() === '') return;
    
    this.tasks.push({
        id: Date.now(),        // Уникальный ID на основе времени
        text: this.newTask.trim(),
        completed: false,      // Статус выполнения
        isEditing: false       // Режим редактирования
    });
    
    this.newTask = '';
    this.saveTasks();
}
2. deleteTask(id) - Удаление задачи
Назначение: Удаление задачи по ID

javascript
deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
}
3. toggleTask(id) - Переключение статуса
Назначение: Изменение статуса выполнения задачи

javascript
toggleTask(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        this.saveTasks();
    }
}
4. editTask(task) - Редактирование задачи
Назначение: Включение/выключение режима редактирования

javascript
editTask(task) {
    if (task.isEditing) {
        this.saveEdit(task);      // Сохранить при повторном клике
    } else {
        // Закрыть другие открытые редакторы
        this.tasks.forEach(t => t.isEditing = false);
        task.isEditing = true;    // Открыть редактирование
    }
}
5. saveEdit(task) - Сохранение изменений
Назначение: Сохранение отредактированного текста или удаление пустой задачи

javascript
saveEdit(task) {
    if (task.text.trim() === '') {
        this.deleteTask(task.id);  // Удалить если текст пустой
    } else {
        task.isEditing = false;    // Выйти из режима редактирования
        this.saveTasks();
    }
}
6. saveTasks() - Сохранение в localStorage
Назначение: Сохранение всех задач в локальное хранилище

javascript
saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
}
 Локальное хранилище
Инициализация данных
javascript
tasks: JSON.parse(localStorage.getItem('tasks')) || []
Формат хранения данных:

json
[
    {
        "id": 1640995200000,
        "text": "Пример задачи",
        "completed": false,
        "isEditing": false
    }
]
 Функциональность
Основные возможности:
 Добавление задач

Через поле ввода + кнопка "Добавить"

Поддержка клавиши Enter

 Редактирование задач

Двойной режим: просмотр/редактирование

Автосохранение при потере фокуса или нажатии Enter

Удаление пустых задач

 Отметка выполнения

Визуальное выделение выполненных задач

Переключатель статуса

 Удаление задач

Мгновенное удаление с подтверждением через UI

 Сохранение данных

Автоматическое сохранение при любых изменениях

Восстановление при перезагрузке страницы

Состояния интерфейса:
Нормальный режим: Отображение текста задачи

Режим редактирования: Поле ввода для изменения текста

Выполненная задача: Зеленый фон и зачеркнутый текст

 Цветовая схема
Основной цвет: #4CAF50 (зеленый)

Цвет редактирования: #2196F3 (синий)

Фон выполненных: #e0f7e0 (светло-зеленый)

Фон карточек: #ffffff (белый)

Фон приложения: #f0f4f8 (светло-серый)

 Адаптивность
Приложение адаптируется для различных устройств:

Мобильные: max-width: 600px

Flexbox layout для правильного отображения

Адаптивные отступы и размеры элементов