'use client';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">Мусоев Мухаммаджон Насимджонович</h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Business/System Analyst & Full-Stack Developer
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:shadow-lg transition-shadow">
              Посмотреть проекты
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-full font-medium hover:shadow-md transition-shadow">
              Связаться
            </button>
          </div>
        </motion.div>
        <ThemeToggle />
      </div>
    </div>
  );
}