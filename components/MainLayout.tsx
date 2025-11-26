import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto pb-24 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;