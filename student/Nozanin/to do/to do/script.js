class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadTodos();
        this.bindEvents();
        this.render();
    }

    // Загрузка задач из localStorage
    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            this.todos = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Ошибка загрузки задач:', error);
            this.todos = [];
        }
    }

    // Сохранение задач в localStorage
    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Ошибка сохранения задач:', error);
        }
    }

    // Привязка событий
    bindEvents() {
        const todoForm = document.getElementById('todoForm');
        const todoInput = document.getElementById('todoInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearCompletedBtn = document.getElementById('clearCompleted');

        // Добавление задачи
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Поддержка Enter
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Сброс ошибки при вводе
        todoInput.addEventListener('input', () => {
            todoInput.classList.remove('input-error');
        });

        // Фильтрация
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
                this.updateFilterButtons(btn);
            });
        });

        // Очистка выполненных
        clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });

        // Глобальные обработчики
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-todo')) {
                const id = parseInt(e.target.dataset.id);
                this.deleteTodo(id);
            }
            
            if (e.target.classList.contains('toggle-todo')) {
                const id = parseInt(e.target.dataset.id);
                this.toggleTodo(id);
            }
        });
    }

    // Добавление новой задачи
    addTodo() {
        const todoInput = document.getElementById('todoInput');
        const text = todoInput.value.trim();

        if (!this.validateTodo(text)) {
            this.showInputError(todoInput);
            return;
        }

        // Проверка на дубликат
        if (this.isDuplicate(text)) {
            if (!confirm('Такая задача уже существует. Добавить anyway?')) {
                return;
            }
        }

        this.showLoading(true);

        // Имитация задержки сети
        setTimeout(() => {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };

            this.todos.unshift(todo);
            this.saveTodos();
            this.render();
            
            todoInput.value = '';
            todoInput.focus();
            
            this.showLoading(false);
            this.showSuccessFeedback();
        }, 300);
    }

    // Валидация задачи
    validateTodo(text) {
        if (!text) {
            alert('Пожалуйста, введите текст задачи');
            return false;
        }
        
        if (text.length > 200) {
            alert('Задача слишком длинная (максимум 200 символов)');
            return false;
        }
        
        return true;
    }

    // Проверка на дубликат
    isDuplicate(text) {
        return this.todos.some(todo => 
            todo.text.toLowerCase() === text.toLowerCase()
        );
    }

    // Переключение статуса задачи
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    // Удаление задачи
    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-todo-id="${id}"]`);
        
        if (todoElement) {
            todoElement.classList.add('removing');
            
            setTimeout(() => {
                this.todos = this.todos.filter(todo => todo.id !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    // Очистка выполненных задач
    clearCompleted() {
        const completedCount = this.todos.filter(todo => todo.completed).length;
        
        if (completedCount === 0) {
            alert('Нет выполненных задач для удаления');
            return;
        }

        if (confirm(`Удалить ${completedCount} выполненных задач?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveTodos();
            this.render();
        }
    }

    // Установка фильтра
    setFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }

    // Обновление кнопок фильтров
    updateFilterButtons(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    // Получение отфильтрованных задач
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    // Показать ошибку ввода
    showInputError(input) {
        input.classList.add('input-error');
        input.focus();
    }

    // Показать загрузку
    showLoading(show) {
        const addBtn = document.getElementById('addBtn');
        if (show) {
            addBtn.classList.add('loading');
            addBtn.disabled = true;
        } else {
            addBtn.classList.remove('loading');
            addBtn.disabled = false;
        }
    }

    // Показать успешное добавление
    showSuccessFeedback() {
        const btn = document.getElementById('addBtn');
        const originalBg = btn.style.background;
        
        btn.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            btn.style.background = originalBg;
        }, 1000);
    }

    // Обновление интерфейса
    render() {
        this.renderTodos();
        this.updateCounters();
        this.toggleEmptyState();
        this.updateClearButton();
    }

    // Отрисовка списка задач
    renderTodos() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        todoList.innerHTML = '';

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.setAttribute('data-todo-id', todo.id);

            li.innerHTML = `
                <div class="todo-content">
                    <div class="todo-checkbox toggle-todo" data-id="${todo.id}">
                        ${todo.completed ? '✓' : ''}
                    </div>
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                </div>
                <div class="todo-actions">
                    <button class="delete-btn delete-todo" data-id="${todo.id}" 
                            aria-label="Удалить задачу">
                        Удалить
                    </button>
                </div>
            `;

            todoList.appendChild(li);
        });
    }

    // Обновление счетчиков
    updateCounters() {
        const totalCount = this.todos.length;
        const completedCount = this.todos.filter(todo => todo.completed).length;

        document.getElementById('tasksCount').textContent = totalCount;
        document.getElementById('completedCount').textContent = completedCount;
    }

    // Переключение состояния пустого списка
    toggleEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            emptyState.classList.add('show');
        } else {
            emptyState.classList.remove('show');
        }
    }

    // Обновление кнопки очистки
    updateClearButton() {
        const clearBtn = document.getElementById('clearCompleted');
        const completedCount = this.todos.filter(todo => todo.completed).length;
        
        clearBtn.disabled = completedCount === 0;
    }

    // Экранирование HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Экспорт задач
    exportTodos() {
        const data = JSON.stringify(this.todos, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // Статистика
    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const active = total - completed;
        
        return { total, completed, active };
    }
}

// Инициализация приложения
let todoApp;

document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
});

// Глобальные функции для обработки событий
function deleteTodo(id) {
    todoApp.deleteTodo(id);
}

function toggleTodo(id) {
    todoApp.toggleTodo(id);
}