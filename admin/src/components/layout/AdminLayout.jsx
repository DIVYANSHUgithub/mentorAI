import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sideBar';
import Header from './header';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
