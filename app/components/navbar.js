'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply the dark mode class to the <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 shadow-lg px-8 py-4 flex justify-between items-center text-white">
      <h1 className="text-2xl font-bold tracking-wide">Dashboard </h1>
      <div className="flex items-center space-x-6">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md"
        >
          {isDarkMode ? '☀️ ' : '🌙 '}
        </button>
        <span className="text-sm font-medium"></span>
        <Image
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </header>
  );
}