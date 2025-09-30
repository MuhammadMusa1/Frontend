// Массив для хранения привычек
let habits = [];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadHabits();
    updateDateDisplay();
    renderHabits();
    updateStats();
});

// Загрузка привычек из localStorage
function loadHabits() {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
        habits = JSON.parse(savedHabits);
    } else {
        // Начальные примеры привычек
        habits = [
            {
                id: 1,
                name: "Утренняя зарядка",
                completedDates: []
            },
            {
                id: 2,
                name: "Чтение книги",
                completedDates: []
            },
            {
                id: 3,
                name: "Прогулка на свежем воздухе",
                completedDates: []
            }
        ];
        saveHabits();
    }
}

// Сохранение привычек в localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Обновление отображения текущей даты
function updateDateDisplay() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = 
        now.toLocaleDateString('ru-RU', options);
}

// Отображение списка привычек
function renderHabits() {
    const habitsList = document.getElementById('habitsList');
    habitsList.innerHTML = '';

    if (habits.length === 0) {
        habitsList.innerHTML = `
            <div class="empty-state">
                <h3>Нет привычек</h3>
                <p>Добавьте свою первую привычку!</p>
            </div>
        `;
        return;
    }

    habits.forEach(habit => {
        const isCompletedToday = isHabitCompletedToday(habit);
        const streak = calculateStreak(habit);
        
        const habitElement = document.createElement('div');
        habitElement.className = `habit-item ${isCompletedToday ? 'completed' : ''}`;
        habitElement.innerHTML = `
            <input 
                type="checkbox" 
                class="habit-checkbox" 
                ${isCompletedToday ? 'checked' : ''}
                onchange="toggleHabit(${habit.id})"
            >
            <span class="habit-name">${habit.name}</span>
            <div class="habit-stats">
                ${streak > 0 ? `<span class="streak-counter">🔥 ${streak}</span>` : ''}
                <button class="delete-btn" onclick="deleteHabit(${habit.id})">🗑️</button>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${calculateWeeklyProgress(habit)}%"></div>
            </div>
        `;
        habitsList.appendChild(habitElement);
    });
}

// Проверка, выполнена ли привычка сегодня
function isHabitCompletedToday(habit) {
    const today = new Date().toDateString();
    return habit.completedDates.includes(today);
}

// Переключение статуса привычки
function toggleHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const today = new Date().toDateString();
    const index = habit.completedDates.indexOf(today);

    if (index > -1) {
        // Удаляем дату, если привычка уже отмечена сегодня
        habit.completedDates.splice(index, 1);
    } else {
        // Добавляем дату, если привычка не отмечена сегодня
        habit.completedDates.push(today);
    }

    saveHabits();
    renderHabits();
    updateStats();
}

// Добавление новой привычки
function addNewHabit() {
    const input = document.getElementById('newHabitInput');
    const name = input.value.trim();

    if (name) {
        const newHabit = {
            id: Date.now(), // Используем timestamp как ID
            name: name,
            completedDates: []
        };

        habits.push(newHabit);
        saveHabits();
        renderHabits();
        updateStats();
        
        input.value = '';
        input.focus();
    }
}

// Удаление привычки
function deleteHabit(habitId) {
    if (confirm('Удалить эту привычку?')) {
        habits = habits.filter(h => h.id !== habitId);
        saveHabits();
        renderHabits();
        updateStats();
    }
}

// Расчет текущей серии выполнения (streak)
function calculateStreak(habit) {
    if (habit.completedDates.length === 0) return 0;

    const dates = habit.completedDates
        .map(date => new Date(date))
        .sort((a, b) => b - a); // Сортируем по убыванию

    let streak = 0;
    let currentDate = new Date();
    
    // Проверяем последовательные дни
    for (let i = 0; i < dates.length; i++) {
        const expectedDate = new Date(currentDate);
        expectedDate.setDate(currentDate.getDate() - i);
        
        if (dates.some(d => d.toDateString() === expectedDate.toDateString())) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// Расчет недельного прогресса
function calculateWeeklyProgress(habit) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentCompletions = habit.completedDates.filter(date => {
        return new Date(date) >= weekAgo;
    });
    
    return Math.min((recentCompletions.length / 7) * 100, 100);
}

// Обновление статистики
function updateStats() {
    const today = new Date().toDateString();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const todayCompleted = habits.filter(habit => 
        habit.completedDates.includes(today)
    ).length;
    
    const weekCompleted = habits.reduce((total, habit) => {
        const recentCompletions = habit.completedDates.filter(date => 
            new Date(date) >= weekAgo
        );
        return total + recentCompletions.length;
    }, 0);
    
    document.getElementById('todayCompleted').textContent = todayCompleted;
    document.getElementById('todayTotal').textContent = habits.length;
    document.getElementById('weekCompleted').textContent = weekCompleted;
    document.getElementById('weekTotal').textContent = habits.length * 7;
}

// Очистка всех данных
function clearAllData() {
    if (confirm('Очистить все данные? Это действие нельзя отменить.')) {
        habits = [];
        localStorage.removeItem('habits');
        renderHabits();
        updateStats();
    }
}

// Обработка нажатия Enter в поле ввода
document.getElementById('newHabitInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addNewHabit();
    }
});