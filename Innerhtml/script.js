//Находим форму
//const form = document.getElementById("commentForm")
//Слушаем событие отправки формы
//form.addEventListener("submit", (event) =>{
//Отменяем отправку формы
//    event.preventDefault();

//    console.log("Форма отправлена");

//});

//Функция имитирует отправки комментария на сервер 
/*async function postCommentToServer(commentText){

    //Ждем 1 секунду как будет сервер обрабатывать наш запрос
    await new Promise(resolve => setTimeout(resolve, 1000));
    //Возрашать ответ от сервера
    return {
        id: Math.floor(Math.random() * 1000), //Случайный ID для комментария
        text: commentText
    };
} */

//Сбор данных из  формы  и вызов асинхронной функции отправки комментария    

const form = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const commentText = commentInput.value.trim();
    if (!commentText) {
        console.log("Комментарий не может быть пустым");
        return;
    }
    const comment = await postCommentToServer(commentText);
    console.log("Комментарий отправлен:", comment);


});