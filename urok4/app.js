const app = Vue.createApp({
    data() {
        return {
            name: 'Ваше Имя',
            profession: 'Frontend Developer | Vue.js | JavaScript',
            about: 'Я — веб-разработчик с опытом создания современных и удобных интерфейсов на Vue.js.',
            projects: [
                {
                    id: 1,
                    title: 'Проект 1',
                    description: 'Описание первого проекта на Vue.js.',
                    url: '#',
                    image: 'https://picsum.photos/400/200?random=1'
                },
                {
                    id: 2,
                    title: 'Проект 2',
                    description: 'Описание второго проекта.',
                    url: '#',
                    image: 'https://picsum.photos/400/200?random=2'
                }
            ], 
            skills: [
                { id: 1, name: 'JavaScript', level: 90 },
                { id: 2, name: 'Vue.js', level: 85 },
                { id: 3, name: 'HTML5', level: 95 },
                { id: 4, name: 'CSS3', level: 80 },
                { id: 5, name: 'Git', level: 75 }
            ],
            contacts: {
                email: 'your@email.com',
                github: 'https://github.com/yourusername',
                telegram: 'https://t.me/yourusername'
            } 
        };
    }
});

app.mount('#app');