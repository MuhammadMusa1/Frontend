// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Display"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
      },
      gradient: {
        'hero': 'linear-gradient(135deg, #f5f7fa 0%, #eef1f5 100%)',
      }
    },
  },
  plugins: [],
}