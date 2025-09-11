let students = [];

const studentNameInput = document.getElementById('studentNameInput');
const addStudentBtn = document.getElementById('addStudentBtn');
const journalTableBody = document.querySelector('#journalTable tbody');

function loadJournal() {
    const savedData = localStorage.getItem('journalData');
    if (savedData) {
        students = JSON.parse(savedData);
        renderJournal();
    }
}

function saveJournal() {
    localStorage.setItem('journalData', JSON.stringify(students));
}

// ✅ Новая функция: удаляет ученика по его ID
function deleteStudent(id) {
    // Используем метод filter(), чтобы создать новый массив без удаляемого ученика
    students = students.filter(student => student.id !== id);
    renderJournal();
    saveJournal();
}

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

        //  Добавляем обработчик для кнопки "Удалить"
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
        
        calculateAverage(student, row);
    });
}

function calculateAverage(student, row) {
    const grades = Object.values(student.grades).filter(grade => !isNaN(grade) && grade >= 1 && grade <= 5);
    const average = grades.length ? (grades.reduce((sum, grade) => sum + grade, 0) / grades.length) : NaN;
    
    const averageEl = row.querySelector('.average-score');
    averageEl.textContent = isNaN(average) ? '-' : average.toFixed(1);
    
    // ✅ Новая логика для смены цвета
    averageEl.classList.remove('good', 'satisfactory', 'bad');
    if (average >= 4.5) {
        averageEl.classList.add('good');
    } else if (average >= 3.5) {
        averageEl.classList.add('satisfactory');
    } else if (!isNaN(average)) {
        averageEl.classList.add('bad');
    }
}

addStudentBtn.addEventListener('click', () => {
    const studentName = studentNameInput.value.trim();
    if (studentName) {
        const newStudent = {
            id: Date.now(),
            name: studentName,
            grades: {
                math: null,
                history: null,
                physics: null
            }
        };
        students.push(newStudent);
        studentNameInput.value = '';
        renderJournal();
        saveJournal();
    }
    studentNameInput.focus();
});

//  Новый обработчик: добавляет ученика по нажатию Enter
studentNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addStudentBtn.click();
    }
});

loadJournal();