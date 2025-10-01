const defaultWishes = [
    { id: Date.now() + 1, text: 'Научиться программировать на Python', completed: false },
    { id: Date.now() + 2, text: 'Прочитать 10 книг по саморазвитию', completed: false },
    { id: Date.now() + 3, text: 'Путешествие куда нибудь ', completed: false },
    { id: Date.now() + 4, text: 'Пробежать марафон', completed: false },
    { id: Date.now() + 5, text: 'Выучить английский до уровня C1', completed: false },
    { id: Date.now() + 6, text: 'Создать собственное мобильное приложение', completed: false },
    { id: Date.now() + 7, text: 'Медитировать 10 минут каждый день', completed: false },
    { id: Date.now() + 8, text: 'Создать калькулятор', completed: false },
    { id: Date.now() + 9, text: 'Посетить концерт любимой группы', completed: false },
    { id: Date.now() + 10, text: 'Научиться готовить 5 новых блюд', completed: false }
];

function addWish() {
    const wishInput = document.getElementById('wish-input');
    const wishText = wishInput.value.trim();

    if (wishText === '') {
        alert('Введите желание!');
        return;
    }

    const wish = {
        id: Date.now(),
        text: wishText,
        completed: false
    };
    createWishCard(wish);


    saveWish(wish);

   
    wishInput.value = '';
}

function createWishCard(wish) {
    const wishBoard = document.getElementById('wish-board');
    const wishCard = document.createElement('div');
    wishCard.classList.add('wish-card');
    wishCard.setAttribute('draggable', true);
    wishCard.setAttribute('data-id', wish.id);

    if (wish.completed) {
        wishCard.classList.add('completed');
    }

    wishCard.innerHTML = `
        <p>${wish.text}</p>
        <div class="actions">
            <button class="complete-btn" onclick="toggleComplete(${wish.id})">${wish.completed ? 'Отменить' : 'Выполнено'}</button>
            <button class="edit-btn" onclick="editWish(${wish.id})">Редактировать</button>
            <button class="delete-btn" onclick="deleteWish(${wish.id})">Удалить</button>
        </div>
    `;

    wishBoard.appendChild(wishCard);


    wishCard.addEventListener('dragstart', dragStart);
    wishCard.addEventListener('dragover', dragOver);
    wishCard.addEventListener('drop', drop);
}

function saveWish(wish) {
    let wishes = getWishes();
    wishes.push(wish);
    localStorage.setItem('wishes', JSON.stringify(wishes));
}

function getWishes() {
    let wishes = JSON.parse(localStorage.getItem('wishes'));
  
    if (!wishes || wishes.length === 0) {
        return defaultWishes;
    }
    return wishes;
}

function loadWishes() {
    const wishes = getWishes();
    wishes.forEach(wish => createWishCard(wish));
}

function toggleComplete(id) {
    let wishes = getWishes();
    wishes = wishes.map(wish => {
        if (wish.id === id) {
            wish.completed = !wish.completed;
        }
        return wish;
    });
    localStorage.setItem('wishes', JSON.stringify(wishes));
    refreshBoard();
}

function editWish(id) {
    let wishes = getWishes();
    const wish = wishes.find(w => w.id === id);
    const newText = prompt('Редактировать желание:', wish.text);
    if (newText && newText.trim() !== '') {
        wishes = wishes.map(w => {
            if (w.id === id) {
                w.text = newText.trim();
            }
            return w;
        });
        localStorage.setItem('wishes', JSON.stringify(wishes));
        refreshBoard();
    }
}

function deleteWish(id) {
    if (confirm('Удалить это желание?')) {
        let wishes = getWishes();
        wishes = wishes.filter(w => w.id !== id);
        localStorage.setItem('wishes', JSON.stringify(wishes));
        refreshBoard();
    }
}

function refreshBoard() {
const wishBoard = document.getElementById('wish-board');
    wishBoard.innerHTML = '';
    loadWishes();
}


let draggedCard = null;

function dragStart(e) {
    draggedCard = e.target;
    setTimeout(() => {
        draggedCard.classList.add('dragging');
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const targetCard = e.target.closest('.wish-card');
    if (targetCard && draggedCard !== targetCard) {
        const wishBoard = document.getElementById('wish-board');
        const allCards = Array.from(wishBoard.querySelectorAll('.wish-card'));
        const draggedIndex = allCards.indexOf(draggedCard);
        const targetIndex = allCards.indexOf(targetCard);

        let wishes = getWishes();
        const [draggedWish] = wishes.splice(draggedIndex, 1);
        wishes.splice(targetIndex, 0, draggedWish);
        localStorage.setItem('wishes', JSON.stringify(wishes));
        refreshBoard();
    }
    draggedCard.classList.remove('dragging');
    draggedCard = null;
}