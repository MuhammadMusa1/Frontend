let  allMoods = [];
//Функция который загружает из localStorage
function loadMoods(){
    const  savedMoods = localStorage.getItem('moods');
    // Если есть сохраненные данные, загружаем их в массив
    if (savedMoods){
        allMoods = JSON.parse(savedMoods);
        //Отображает все записи на странице
        renderMoods();
    }
}

function saveMood(){
    //Получаем значение из поля ввода
    const moodInput = document.getElementById('moodInput');
    const mood = moodInput.value.trim();
    //Если текст пустой создаем объект записью
    if (moodContent){
        const newMood ={
            id: Date.now(), //Уникальный ID
            content:moodContent,
            date: new Date().toLocaleDateString(ru-RU),//Дата создания
        };
        //Добавление новой записи в массив 
        allMoods.push(newMood);
        //Упаковываем массив в JSON
        const jsonMoods = JSON.stringify(allMoods);

        //Сохраняем массив в localStorage
        localStorage.setItem("moodDairy" , jsonMoods);

        //Очишаем поле
        moodTextarea.value = '';
        //Обновляем отображение записей
        renderMoods();
    }
}