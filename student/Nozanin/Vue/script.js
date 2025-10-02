const { createApp, ref, watch, onMounted, computed } = Vue;

createApp({
  setup() {
    const newTodo = ref('');
    const todos = ref([]);

    const STORAGE_KEY = 'todos_vue';

    // Загрузка из localStorage при монтировании
    onMounted(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          todos.value = JSON.parse(saved);
        } catch (error) {
          console.error('Ошибка загрузки задач:', error);
          todos.value = [];
        }
      }
    });

    // Автосохранение при изменении todos
    watch(todos, (newTodos) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      } catch (error) {
        console.error('Ошибка сохранения задач:', error);
      }
    }, { deep: true });

    // Вычисляемое свойство для счетчика выполненных задач
    const completedCount = computed(() => {
      return todos.value.filter(todo => todo.completed).length;
    });

    // Добавление новой задачи
    function addTodo() {
      const text = newTodo.value.trim();
      
      if (text) {
        // Проверка на дубликаты
        const isDuplicate = todos.value.some(todo => 
          todo.text.toLowerCase() === text.toLowerCase()
        );
        
        if (isDuplicate) {
          alert('Такая задача уже существует!');
          return;
        }
        
        todos.value.push({ 
          text: text, 
          completed: false 
        });
        newTodo.value = '';
      } else {
        alert('Пожалуйста, введите текст задачи');
      }
    }

    // Переключение статуса выполнения
    function toggleComplete(index) {
      todos.value[index].completed = !todos.value[index].completed;
    }

    // Удаление задачи
    function deleteTodo(index) {
      if (confirm('Удалить эту задачу?')) {
        todos.value.splice(index, 1);
      }
    }

    // Очистка всех выполненных задач
    function clearCompleted() {
      const completedTodos = todos.value.filter(todo => todo.completed);
      
      if (completedTodos.length === 0) {
        alert('Нет выполненных задач для удаления');
        return;
      }
      
      if (confirm(`Удалить ${completedTodos.length} выполненных задач?`)) {
        todos.value = todos.value.filter(todo => !todo.completed);
      }
    }

    return { 
      newTodo, 
      todos, 
      completedCount,
      addTodo, 
      toggleComplete, 
      deleteTodo,
      clearCompleted
    };
  }
}).mount('#app');