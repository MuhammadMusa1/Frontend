// Массив для хранения всех товаров
let shoppingList = [];

// Получаем ссылки на HTML-элементы
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const shoppingListEl = document.getElementById('shoppingList');

// Функция для загрузки данных из localStorage
function loadList() {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
        // Парсим строку обратно в массив
        shoppingList = JSON.parse(savedList);
        renderList();
    }
}

// Функция для сохранения данных в localStorage
function saveList() {
    // Превращаем массив в строку JSON
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Функция для отображения списка на странице
function renderList() {
    shoppingListEl.innerHTML = '';
    shoppingList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.dataset.id = item.id; // Используем data-атрибут для ID

        if (item.completed) {
            li.classList.add('completed');
        }

        // Кнопка удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        shoppingListEl.appendChild(li);
    });
}

// Обработчик для кнопки "Добавить"
addItemBtn.addEventListener('click', () => {
    const itemName = itemInput.value.trim();
    if (itemName) {
        const newItem = {
            id: Date.now(),
            name: itemName,
            completed: false
        };
        shoppingList.push(newItem);
        itemInput.value = '';
        renderList();
        saveList();
    }
});

// Обработчик для Enter
itemInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addItemBtn.click();
    }
});

// Обработчик для всего списка (делегирование событий)
shoppingListEl.addEventListener('click', (e) => {
    const clickedItem = e.target;
    const itemId = parseInt(clickedItem.dataset.id);

    // Если клик был по кнопке "Удалить"
    if (clickedItem.classList.contains('delete-btn')) {
        shoppingList = shoppingList.filter(item => item.id !== itemId);
        renderList();
        saveList();
    } 
    // Если клик был по самому элементу списка
    else if (clickedItem.tagName === 'LI') {
        const item = shoppingList.find(item => item.id === itemId);
        item.completed = !item.completed;
        renderList();
        saveList();
    }
});

// Загружаем список при старте
loadList();