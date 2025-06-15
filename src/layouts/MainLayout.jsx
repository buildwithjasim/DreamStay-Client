import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#dbc9fe]">
      <Navbar />

      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
