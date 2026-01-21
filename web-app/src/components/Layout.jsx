import { clsx } from 'clsx';
import { Calendar, Dumbbell } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      {/* Desktop Sidebar / Header */}
      <nav className="hidden md:flex flex-col w-64 border-r border-gray-800 p-6 space-y-8 bg-gray-900">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
          FitLife
        </h1>
        <div className="space-y-2">
          <NavItem to="/" icon={<Dumbbell />} label="Workouts" />
          <NavItem to="/calendar" icon={<Calendar />} label="History" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-24 md:pb-0">
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around p-4 pb-6 z-50">
        <NavItem to="/" icon={<Dumbbell />} label="Workouts" mobile />
        <NavItem to="/calendar" icon={<Calendar />} label="History" mobile />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, mobile }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        mobile ? "flex-col gap-1 text-xs" : "text-sm font-medium",
        isActive 
          ? "bg-gray-800 text-blue-400 shadow-sm" 
          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
      )}
    >
      {React.cloneElement(icon, { size: mobile ? 20 : 20 })}
      <span>{label}</span>
    </NavLink>
  );
}
