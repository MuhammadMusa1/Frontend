const { createApp } = Vue;

createApp({
    data() {
        return {
            newTask: '',
            tasks: JSON.parse(localStorage.getItem('tasks')) || []
        };
    },
    methods: {
        addTask() {
            if (this.newTask.trim() === '') return;
            this.tasks.push({
                id: Date.now(),
                text: this.newTask.trim(),
                completed: false,
                isEditing: false
            });
            this.newTask = '';
            this.saveTasks();
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
        },
        toggleTask(id) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed;
                this.saveTasks();
            }
        },
        editTask(task) {
            if (task.isEditing) {
                this.saveEdit(task);
            } else {
                this.tasks.forEach(t => t.isEditing = false); // Закрыть другие редактирования
                task.isEditing = true;
            }
        },
        saveEdit(task) {
            if (task.text.trim() === '') {
                this.deleteTask(task.id);
            } else {
                task.isEditing = false;
                this.saveTasks();
            }
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
}).mount('#app');