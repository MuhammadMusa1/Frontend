// Плавная прокрутка к секциям
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигационных ссылок
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Учет высоты хедера
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Обновление активной ссылки в навигации
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Функция обновления активной ссылки
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }
    
    // Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project, #skills li');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Установка начальных стилей для анимации
    const projects = document.querySelectorAll('.project');
    const skills = document.querySelectorAll('#skills li');
    
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
        project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    skills.forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        skill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    // Запуск анимации при загрузке и скролле
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Динамическое обновление года в футере
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${currentYear} Бойбобоев Шокир. Все права защищены.`;
    }
    
    // Интерактивные навыки с прогресс-баром
    const skillsData = [
        { name: 'HTML & CSS', level: 85 },
        { name: 'JavaScript (основы)', level: 70 },
        { name: 'Python (основы)', level: 60 }
    ];
    
    // Функция для создания прогресс-баров (опционально)
    function createSkillBars() {
        const skillsList = document.querySelector('#skills ul');
        if (skillsList) {
            skillsList.innerHTML = ''; // Очищаем существующие навыки
            
            skillsData.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.innerHTML = `
                    <div class="skill-container">
                        <span class="skill-name">${skill.name}</span>
                        <div class="skill-bar">
                            <div class="skill-progress" data-level="${skill.level}"></div>
                        </div>
                        <span class="skill-percent">${skill.level}%</span>
                    </div>
                `;
                skillsList.appendChild(skillItem);
            });
            
            // Анимация прогресс-баров
            setTimeout(animateSkillBars, 500);
        }
    }
    
    function animateSkillBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Темная тема (опционально)
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
    
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        
        // Сохранение темы в localStorage
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
    
    // Анимация печатающего текста для заголовка
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Запуск анимации печатающего текста
    const mainTitle = document.querySelector('#about h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        typeWriter(mainTitle, originalText, 150);
    }
    
    // Подсветка активной секции при скролле
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('header').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        updateActiveNavLink(currentSection);
    }
    
    window.addEventListener('scroll', highlightActiveSection);
});

// Дополнительные стили для новых функций
const additionalStyles = `
    /* Стили для активной навигации */
    nav a.active {
        color: #00ff88 !important;
        border-bottom: 2px solid #00ff88;
    }
    
    /* Стили для прогресс-баров навыков */
    .skill-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .skill-bar {
        flex-grow: 1;
        background: #e0e0e0;
        border-radius: 10px;
        height: 8px;
        overflow: hidden;
    }
    
    .skill-progress {
        height: 100%;
        background: #00ff88;
        border-radius: 10px;
        width: 0;
        transition: width 1.5s ease-in-out;
    }
    
    .skill-name {
        min-width: 150px;
        text-align: left;
    }
    
    .skill-percent {
        min-width: 40px;
        text-align: right;
        font-weight: bold;
    }
    
    /* Темная тема */
    body.dark-theme {
        background-color: #1a1a1a;
        color: #ffffff;
    }
    
    body.dark-theme header {
        background-color: #2d2d2d;
    }
    
    body.dark-theme .project {
        background-color: #2d2d2d;
        color: #ffffff;
    }
    
    body.dark-theme footer {
        background-color: #2d2d2d;
    }
    
    body.dark-theme nav a {
        color: #ffffff;
    }
    
    /* Адаптивность для прогресс-баров */
    @media (max-width: 600px) {
        .skill-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .skill-bar {
            width: 100%;
        }
    }
`;

// Добавление стилей в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
