// Функция, которая запускается при загрузке страницы
window.onload = function() {
    // Получаем данные из localStorage
    const savedName = localStorage.getItem('username');
    const savedColor = localStorage.getItem('favColor');
    
    // Если данные есть, персонализируем сайт
    if (savedName && savedColor) {
        document.getElementById('greeting').textContent = 'С возвращением, ' + savedName + '!';
        document.getElementById('body').style.backgroundColor = savedColor;
    }
};

// Функция, которая сохраняет данные и приветствует пользователя
function saveAndGreet() {
    // 1. Получаем имя и цвет из полей ввода
    const nameInput = document.getElementById('nameInput');
    const colorInput = document.getElementById('colorInput');
    const userName = nameInput.value;
    const userColor = colorInput.value;

    // 2. Проверяем, что имя не пустое
    if (userName.trim() === '') {
        alert('Пожалуйста, введите ваше имя!');
        return;
    }

    // 3. Сохраняем имя и цвет в localStorage
    localStorage.setItem('username', userName);
    localStorage.setItem('favColor', userColor);

    // 4. Обновляем приветствие и цвет фона
    document.getElementById('greeting').textContent = 'Привет, ' + userName + '!';
    document.getElementById('body').style.backgroundColor = userColor;

    // Очищаем поля ввода
    nameInput.value = '';
}