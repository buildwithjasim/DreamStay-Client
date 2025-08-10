import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/ThemeContext';

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'luxury-dark'
          ? 'bg-base-100 text-luxury' // dark mode bg & text (from your CSS variables)
          : 'bg-luxury text-luxury' // light mode bg & text
      }`}
    >
      <Navbar />
      <main className="min-h-[calc(100vh-200px)] p-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
