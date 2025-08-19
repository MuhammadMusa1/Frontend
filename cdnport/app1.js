const { createApp } = Vue;
createApp({
  data() {
    return {
      name: 'Ваше Имя',
      title: 'Frontend Developer | Vue.js | JavaScript',
      about: 'Я — веб-разработчик с опытом создания современных и удобных интерфейсов на Vue.js.',
      skills: ['JavaScript', 'Vue.js', 'HTML5', 'CSS3', 'Git'],
      projects: [
        {
          name: 'Проект 1',
          description: 'Описание первого проекта на Vue.js.',
          link: '#'
        },
        {
          name: 'Проект 2',
          description: 'Описание второго проекта.',
          link: '#'
        }
      ],
      email: 'your@email.com',
      github: 'https://github.com/yourusername',
    }
  },
  computed: {
    githubUser() {
      return this.github.replace('https://github.com/', '');
    }
  }
}).mount('#app');