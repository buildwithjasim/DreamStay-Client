import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Navbar />
      <main className="min-h-[calc(100vh-200px)] p-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
