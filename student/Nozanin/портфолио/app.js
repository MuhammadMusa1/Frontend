const { createApp } = Vue;

createApp({
    data() {
        return {
            name: 'Ashurova Nozanin',
            profession: 'Frontend-разработчик',
            about: 'Привет! Я занимаюсь программированием. Создаю проекты, которые помогают людям развиваться и решать реальные задачи.',
            
            projects: [
                {
                    id: 1,
                    title: 'Веб-сайт для небольшого бизнеса',
                    description: 'Этот проект включает создание полноценного сайта с адаптивным дизайном для малого бизнеса.',
                    url: 'https://example.com/project1',
                    image: 'https://picsum.photos/400/200?random=1'
                },
                {
                    id: 2,
                    title: 'Приложение для управления задачами',
                    description: 'Приложение поможет пользователям организовывать свои планы и эффективно планировать время.',
                    url: 'https://example.com/project2',
                    image: 'https://picsum.photos/400/200?random=2'
                },
                {
                    id: 3,
                    title: 'Мини чат-бот',
                    description: 'Интеллектуальный чат-бот для автоматизации ответов на частые вопросы пользователей.',
                    url: 'https://example.com/project3',
                    image: 'https://picsum.photos/400/200?random=3'
                }
            ],
            
            contacts: {
                email: 'your.email@example.com',
                github: 'https://github.com/yourusername',
                telegram: 'https://t.me/yourusername'
            },
            
            form: {
                name: '',
                email: '',
                message: ''
            }
        }
    },
    
    methods: {
        submitForm() {
            // Здесь можно добавить отправку формы на сервер
            console.log('Форма отправлена:', this.form);
            
            // Показываем уведомление
            alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
            
            // Очищаем форму
            this.form = {
                name: '',
                email: '',
                message: ''
            };
        }
    },
    
    mounted() {
        console.log('Портфолио загружено!');
    }
}).mount('#app');