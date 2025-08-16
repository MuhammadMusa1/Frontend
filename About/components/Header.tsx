"use client";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between py-6 px-8 bg-white dark:bg-neutral-900 shadow-md">
      <span className="text-2xl font-bold text-blue-600">Мусоев Мухаммаджон</span>
      <nav className="space-x-6">
        <a href="#about" className="hover:text-blue-600">Обо мне</a>
        <a href="#skills" className="hover:text-blue-600">Навыки</a>
        <a href="#projects" className="hover:text-blue-600">Проекты</a>
        <a href="#contact" className="hover:text-blue-600">Контакты</a>
        <button
          className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-neutral-700"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </nav>
    </header>
  );
}