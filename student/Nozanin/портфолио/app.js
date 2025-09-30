new Vue({
  el: '#app',
  data: {
    name: 'Мусоев Мухаммаджон',
    profession: 'Бизнес-аналитик / Frontend-разработчик',
    about: 'Привет! Я занимаюсь аналитикой, программированием и обучением. Создаю проекты, которые помогают людям развиваться и решать реальные задачи.',

    projects: [
      {
        id: 1,
        title: 'Портфолио на Vue.js',
        description: 'Простое и красивое портфолио, созданное с использованием Vue.js и CDN.',
        url: 'https://github.com/yourusername/portfolio-vue',
        image: 'https://picsum.photos/400/200?random=1'
      },
      {
        id: 2,
        title: 'Сайт для банка',
        description: 'Функциональные требования и отчеты для банковской системы ЦФТ.',
        url: 'https://github.com/yourusername/bank-system',
        image: 'https://picsum.photos/400/200?random=2'
      },
      {
        id: 3,
        title: 'Учебный проект',
        description: 'MVP для онлайн-обучения с ИИ-ассистентом.',
        url: 'https://github.com/yourusername/edu-ai',
        image: 'https://picsum.photos/400/200?random=3'
      }
    ],

    contacts: {
      email: 'your_email@example.com',
      github: 'https://github.com/yourusername',
      telegram: 'https://t.me/yourtelegram'
    }
  }
});



 new Vue({
  el: '#app',
  data: { ... }
});

