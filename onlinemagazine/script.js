let students = [];
// Получаем элементы из DOM
const studentNameInput = document.getElementById('studentNameInput');
const addStudentBtn = document.getElementById('addStudentBtn');
const journalTableBody = document.querySelector('#journalTable tbody');
//Фукнция загрузки журнала из localStorage
function loadJournal() {
    const savedData = localStorage.getItem('journalData');
    if (savedData) {
        students = JSON.parse(savedData);
        renderJournal();
    }
}
// Функция сохранения журнала в localStorage
function saveJournal() {
    localStorage.setItem('journalData', JSON.stringify(students));
}
// Функция удаления ученика по его ID
function deleteStudent(id) {
    // Используем метод filter(), чтобы создать новый массив без удаляемого ученика
    students = students.filter(student => student.id !== id);
    renderJournal();
    saveJournal();
}
// Функция рендеринга журнала
function renderJournal() {
    journalTableBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span>${student.name}</span>
                <button class="delete-btn" data-id="${student.id}">Удалить</button>
            </td>
            <td data-subject="math"><input type="number" class="grade-input" value="${student.grades.math || ''}" min="1" max="5"></td>
            <td data-subject="history"><input type="number" class="grade-input" value="${student.grades.history || ''}" min="1" max="5"></td>
            <td data-subject="physics"><input type="number" class="grade-input" value="${student.grades.physics || ''}" min="1" max="5"></td>
            <td class="average-score"></td>
        `;
        journalTableBody.appendChild(row);
        // Добавляем обработчик для кнопки "Удалить"
        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (event) => {
            // dataset.id позволяет получить значение из атрибута data-id
            const studentId = parseInt(event.target.dataset.id);
            deleteStudent(studentId);
        });
        const inputs = row.querySelectorAll('.grade-input');
        inputs.forEach(input => {
            input.addEventListener('input', (event) => {
                const subject = event.target.parentElement.dataset.subject;
                const newGrade = parseInt(event.target.value);
                student.grades[subject] = newGrade;
                calculateAverage(student, row);
                saveJournal();
            });
        });


}