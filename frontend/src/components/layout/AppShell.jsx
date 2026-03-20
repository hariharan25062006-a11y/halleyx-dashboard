import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AppShell = () => {
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar className="w-64 shrink-0 bg-card border-r border-border" />
      <div className="flex-1 flex flex-col relative min-w-0">
        <Topbar className="h-16 shrink-0 bg-card border-b border-border z-10" />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
