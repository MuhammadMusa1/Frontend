// Массив для хранения упражнений
let exercises = [];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadExercises();
    renderExercises();
    updateStats();
});

// Загрузка упражнений из localStorage
function loadExercises() {
    const savedExercises = localStorage.getItem('workoutExercises');
    if (savedExercises) {
        exercises = JSON.parse(savedExercises);
    }
}

// Сохранение упражнений в localStorage
function saveExercises() {
    localStorage.setItem('workoutExercises', JSON.stringify(exercises));
}

// Добавление нового упражнения
function addExercise() {
    const nameInput = document.getElementById('exerciseName');
    const setsInput = document.getElementById('exerciseSets');
    const repsInput = document.getElementById('exerciseReps');
    
    const name = nameInput.value.trim();
    const sets = parseInt(setsInput.value);
    const reps = parseInt(repsInput.value);
    
    if (name && sets > 0 && reps > 0) {
        const newExercise = {
            id: Date.now(), // Уникальный ID
            name: name,
            sets: sets,
            reps: reps,
            isCompleted: false,
            createdAt: new Date().toISOString()
        };
        
        exercises.push(newExercise);
        saveExercises();
        renderExercises();
        updateStats();
        
        // Очищаем поля ввода
        nameInput.value = '';
        setsInput.value = '';
        repsInput.value = '';
        nameInput.focus();
    } else {
        alert('Пожалуйста, заполните все поля корректно!');
    }
}

// Отображение списка упражнений
function renderExercises(filter = 'all') {
    const exercisesList = document.getElementById('exercisesList');
    exercisesList.innerHTML = '';
    
    let filteredExercises = exercises;
    
    if (filter === 'active') {
        filteredExercises = exercises.filter(ex => !ex.isCompleted);
    } else if (filter === 'completed') {
        filteredExercises = exercises.filter(ex => ex.isCompleted);
    }
    
    if (filteredExercises.length === 0) {
        exercisesList.innerHTML = `
            <div class="empty-state">
                <h3>Нет упражнений</h3>
                <p>${filter === 'all' ? 'Добавьте первое упражнение!' : 
                   filter === 'active' ? 'Все упражнения выполнены!' : 
                   'Нет выполненных упражнений!'}</p>
            </div>
        `;
        return;
    }
    
    filteredExercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = `exercise-item ${exercise.isCompleted ? 'completed' : ''}`;
        exerciseElement.innerHTML = `
            <input 
                type="checkbox" 
                class="exercise-checkbox" 
                ${exercise.isCompleted ? 'checked' : ''}
                onchange="toggleExercise(${exercise.id})"
            >
            <span class="exercise-name">${exercise.name}</span>
            <span class="exercise-sets">${exercise.sets} подходов</span>
            <span class="exercise-reps">${exercise.reps} повторений</span>
            <button class="delete-btn" onclick="deleteExercise(${exercise.id})">🗑️</button>
        `;
        exercisesList.appendChild(exerciseElement);
    });
}

// Переключение статуса выполнения упражнения
function toggleExercise(exerciseId) {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
        exercise.isCompleted = !exercise.isCompleted;
        saveExercises();
        renderExercises();
        updateStats();
    }
}

// Удаление упражнения
function deleteExercise(exerciseId) {
    if (confirm('Удалить это упражнение?')) {
        exercises = exercises.filter(ex => ex.id !== exerciseId);
        saveExercises();
        renderExercises();
        updateStats();
    }
}

// Обновление статистики
function updateStats() {
    const totalExercises = exercises.length;
    const completedExercises = exercises.filter(ex => ex.isCompleted).length;
    const progressPercent = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
    
    document.getElementById('totalExercises').textContent = totalExercises;
    document.getElementById('completedExercises').textContent = completedExercises;
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    
    // Обновляем прогресс бар
    updateProgressBar(progressPercent);
}

// Обновление прогресс бара
function updateProgressBar(percent) {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    let progressFill = progressBar.querySelector('.progress-fill');
    if (!progressFill) {
        progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressBar.appendChild(progressFill);
    }
    
    progressFill.style.width = `${percent}%`;
}

// Фильтрация упражнений
function filterExercises(filter) {
    // Убираем активный класс у всех кнопок
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Добавляем активный класс текущей кнопке
    event.target.classList.add('active');
    
    renderExercises(filter);
}

// Очистка выполненных упражнений
function clearCompleted() {
    if (confirm('Удалить все выполненные упражнения?')) {
        exercises = exercises.filter(ex => !ex.isCompleted);
        saveExercises();
        renderExercises();
        updateStats();
    }
}

// Сохранение тренировки
function saveWorkout() {
    if (exercises.length === 0) {
        alert('Нет упражнений для сохранения!');
        return;
    }
    
    const workoutData = {
        exercises: exercises,
        savedAt: new Date().toISOString(),
        total: exercises.length,
        completed: exercises.filter(ex => ex.isCompleted).length
    };
    
    const dataStr = JSON.stringify(workoutData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.download = `тренировка-${new Date().toLocaleDateString('ru-RU')}.json`;
    link.href = URL.createObjectURL(dataBlob);
    link.click();
}

// Загрузка примера тренировки
function loadExample() {
    if (exercises.length > 0 && !confirm('Заменить текущую тренировку примером?')) {
        return;
    }
    
    exercises = [
        {
            id: 1,
            name: "Приседания со штангой",
            sets: 4,
            reps: 12,
            isCompleted: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: "Жим лёжа",
            sets: 4,
            reps: 10,
            isCompleted: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            name: "Тяга верхнего блока",
            sets: 3,
            reps: 15,
            isCompleted: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 4,
            name: "Планка",
            sets: 3,
            reps: 60,
            isCompleted: false,
            createdAt: new Date().toISOString()
        }
    ];
    
    saveExercises();
    renderExercises();
    updateStats();
    alert('Пример тренировки загружен!');
}

// Обработка нажатия Enter в полях ввода
document.getElementById('exerciseName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('exerciseSets').focus();
    }
});

document.getElementById('exerciseSets').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('exerciseReps').focus();
    }
});

document.getElementById('exerciseReps').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addExercise();
    }
});

// Добавляем прогресс бар в статистику
document.querySelectorAll('.stat-card').forEach(card => {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    card.appendChild(progressBar);
});

// Инициализируем прогресс бары
setTimeout(updateStats, 100);