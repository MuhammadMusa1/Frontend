class NotesApp {
    constructor() {
        this.notes = [];
        this.init();
    }

    init() {
        this.loadNotes();
        this.bindEvents();
        this.updateUI();
    }

    // Загрузка заметок из localStorage
    loadNotes() {
        try {
            const saved = localStorage.getItem('notes');
            this.notes = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Ошибка загрузки заметок:', error);
            this.notes = [];
        }
    }

    // Сохранение заметок в localStorage
    saveNotes() {
        try {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        } catch (error) {
            console.error('Ошибка сохранения заметок:', error);
        }
    }

    // Привязка событий
    bindEvents() {
        const addBtn = document.getElementById('add-btn');
        const noteInput = document.getElementById('note-input');

        // Добавление по клику
        addBtn.addEventListener('click', () => this.addNote());

        // Добавление по Enter
        noteInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNote();
            }
        });

        // Валидация при вводе
        noteInput.addEventListener('input', () => {
            noteInput.classList.remove('input-error');
        });

        // Запрет на ввод только пробелов
        noteInput.addEventListener('keydown', (e) => {
            if (e.key === ' ' && noteInput.value.trim() === '') {
                e.preventDefault();
            }
        });
    }

    // Добавление новой заметки
    addNote() {
        const noteInput = document.getElementById('note-input');
        const noteText = noteInput.value.trim();

        // Валидация
        if (!this.validateNote(noteText)) {
            this.showInputError(noteInput);
            return;
        }

        // Проверка на дубликат
        if (this.isDuplicate(noteText)) {
            if (!confirm('Такая заметка уже существует. Добавить anyway?')) {
                return;
            }
        }

        // Создание заметки
        const note = {
            id: Date.now(),
            text: noteText,
            createdAt: new Date().toISOString()
        };

        this.notes.unshift(note); // Добавляем в начало
        this.saveNotes();
        this.updateUI();
        
        // Сброс и фокус
        noteInput.value = '';
        noteInput.focus();
        
        // Визуальная обратная связь
        this.showSuccessFeedback();
    }

    // Валидация заметки
    validateNote(text) {
        if (!text) return false;
        if (text.length > 1000) {
            alert('Заметка слишком длинная (максимум 1000 символов)');
            return false;
        }
        return true;
    }

    // Проверка на дубликат
    isDuplicate(text) {
        return this.notes.some(note => 
            note.text.toLowerCase() === text.toLowerCase()
        );
    }

    // Удаление заметки
    deleteNote(id) {
        const noteElement = document.querySelector(`[data-note-id="${id}"]`);
        
        if (noteElement) {
            noteElement.classList.add('removing');
            
            setTimeout(() => {
                this.notes = this.notes.filter(note => note.id !== id);
                this.saveNotes();
                this.updateUI();
            }, 300);
        }
    }

    // Показать ошибку ввода
    showInputError(input) {
        input.classList.add('input-error');
        input.focus();
    }

    // Показать успешное добавление
    showSuccessFeedback() {
        const btn = document.getElementById('add-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '✓ Добавлено!';
        btn.style.backgroundColor = '#20c997';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 1000);
    }

    // Обновление интерфейса
    updateUI() {
        this.renderNotes();
        this.updateCounter();
        this.toggleEmptyState();
    }

    // Отрисовка списка заметок
    renderNotes() {
        const noteList = document.getElementById('note-list');
        noteList.innerHTML = '';

        this.notes.forEach(note => {
            const li = document.createElement('li');
            li.className = 'note-item';
            li.setAttribute('data-note-id', note.id);
            
            li.innerHTML = `
                <div class="note-text">${this.escapeHtml(note.text)}</div>
                <div class="note-actions">
                    <button class="delete-btn" onclick="notesApp.deleteNote(${note.id})" 
                            aria-label="Удалить заметку">
                        🗑️ Удалить
                    </button>
                </div>
            `;
            
            noteList.appendChild(li);
        });
    }

    // Обновление счетчика
    updateCounter() {
        const counter = document.getElementById('notes-count');
        counter.textContent = this.notes.length;
    }

    // Переключение состояния пустого списка
    toggleEmptyState() {
        const emptyState = document.getElementById('empty-state');
        if (this.notes.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    // Экранирование HTML для безопасности
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Экспорт заметок
    exportNotes() {
        const data = JSON.stringify(this.notes, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `notes-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // Импорт заметок
    importNotes(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const importedNotes = JSON.parse(e.target.result);
                
                if (Array.isArray(importedNotes)) {
                    this.notes = [...importedNotes, ...this.notes];
                    this.saveNotes();
                    this.updateUI();
                    alert(`Успешно импортировано ${importedNotes.length} заметок`);
                } else {
                    throw new Error('Неверный формат файла');
                }
            } catch (error) {
                alert('Ошибка импорта: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }

    // Очистка всех заметок
    clearAllNotes() {
        if (this.notes.length === 0) return;
        
        if (confirm(`Вы уверены, что хотите удалить все заметки (${this.notes.length})?`)) {
            this.notes = [];
            this.saveNotes();
            this.updateUI();
        }
    }
}

// Инициализация приложения
let notesApp;

document.addEventListener('DOMContentLoaded', () => {
    notesApp = new NotesApp();
});

// Глобальные функции для HTML атрибутов
function deleteNote(id) {
    notesApp.deleteNote(id);
}

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Произошла ошибка:', e.error);
});