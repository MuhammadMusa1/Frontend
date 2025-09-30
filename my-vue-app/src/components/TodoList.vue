<template>
  <div class="todo-app">
    <h1>Список дел</h1>

    <div class="input-section">
      <input
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="Что нужно сделать?"
      />
      <button @click="addTodo">Добавить</button>
    </div>

    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <span @click="toggleCompletion(todo)">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Удалить</button>
      </li>
    </ul>

    <p v-if="todos.length === 0" class="no-todos">
      Ваш список дел пуст. Добавьте что-нибудь!
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newTodoText = ref('');
const todos = ref([]);

let nextId = 1;

function addTodo() {
  if (newTodoText.value.trim() === '') {
    return;
  }
  todos.value.push({
    id: nextId++,
    text: newTodoText.value,
    completed: false,
  });
  newTodoText.value = '';
}

function toggleCompletion(todo) {
  todo.completed = !todo.completed;
}

function removeTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id);
}
</script>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background-color: #fff;
}

h1 {
  text-align: center;
  color: #333;
}

.input-section {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.input-section input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-section button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.todo-list li:hover {
  background-color: #f9f9f9;
}

.todo-list li.completed {
  color: #888;
  text-decoration: line-through;
}

.todo-list li span {
  flex-grow: 1;
}

.todo-list li button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}

.no-todos {
  text-align: center;
  color: #888;
}
</style>