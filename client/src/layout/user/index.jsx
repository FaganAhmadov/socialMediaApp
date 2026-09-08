import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './nav';
import Sidebar from './sidebar';
import Footer from './footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-3 py-4 sm:px-4 lg:flex-row lg:px-6 lg:py-6">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;