# Modern Personal Portfolio

This is a modern personal portfolio website built using Vue.js and styled with TailwindCSS. The design is minimalist yet stylish, showcasing various sections to highlight your skills, projects, and contact information.

## Project Structure

The project is organized as follows:

```
portfolio
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── assets              # Static assets (images, fonts)
│   ├── components          # Vue components for different sections
│   │   ├── About.vue       # About Me section
│   │   ├── Contact.vue     # Contact section
│   │   ├── Footer.vue      # Footer component
│   │   ├── Header.vue      # Navigation header
│   │   ├── Hero.vue        # Main welcome message
│   │   ├── Portfolio.vue    # Project showcase
│   │   └── Skills.vue      # Skills section
│   ├── layouts             # Layout components
│   │   └── DefaultLayout.vue # Main layout for the application
│   ├── pages               # Pages of the application
│   │   ├── Home.vue        # Homepage integrating all components
│   │   └── NotFound.vue    # 404 Not Found page
│   ├── router              # Vue Router setup
│   │   └── index.ts        # Route definitions
│   ├── store               # Vuex store for state management
│   │   └── index.ts        # Store initialization
│   ├── App.vue             # Root component
│   └── main.ts             # Entry point of the application
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080` to view your portfolio.

## Features

- **Responsive Design:** The portfolio is designed to be fully responsive, ensuring a great experience on both desktop and mobile devices.
- **Dynamic Routing:** Utilizes Vue Router for seamless navigation between different sections of the portfolio.
- **State Management:** Vuex is used for managing application state, making it easier to handle data across components.
- **TailwindCSS:** The project leverages TailwindCSS for styling, allowing for rapid design and customization.

## License

This project is licensed under the MIT License. Feel free to modify and use it as you wish.