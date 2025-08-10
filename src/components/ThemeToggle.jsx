import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-sm btn-outline transition-colors duration-300 ${
        theme === 'luxury-light'
          ? 'border-primary text-primary hover:bg-primary hover:text-base-100'
          : 'border-accent text-accent hover:bg-accent hover:text-base-100'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'luxury-light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}
