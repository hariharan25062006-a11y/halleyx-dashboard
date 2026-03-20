import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Settings2, Package, LogOut, Network, ChevronLeft, ChevronRight } from 'lucide-react';
import { getInitials } from '../../utils/formatters';

const NAV_ITEMS = [
  { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/app/config', label: 'Config Dashboard', icon: Settings2 },
  { path: '/app/orders', label: 'Customer Orders', icon: Package },
];

const Sidebar = ({ className = '' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`flex flex-col h-full bg-card border-r border-border transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[250px]'} ${className}`}>
      {/* Brand */}
      <div className="h-[72px] shrink-0 border-b border-border flex items-center px-5 relative group">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shrink-0 shadow-card">
            <Network size={18} strokeWidth={2.5} />
          </div>
          <span className={`font-display text-lg font-bold text-text-primary whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
            Halleyx<span className="text-primary">.</span>
          </span>
        </div>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute -right-3 top-6 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary shadow-sm transition-all z-10 opacity-0 group-hover:opacity-100 ${collapsed ? 'opacity-100 rotate-180' : ''}`}
        >
          <ChevronLeft size={14} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 flex flex-col gap-1.5 px-3 overflow-y-auto">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
              ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-text-secondary hover:bg-surface hover:text-text-primary font-medium'}
            `}
            title={collapsed ? label : undefined}
          >
            {(props) => (
              <>
                <Icon size={20} className={`shrink-0 ${props.isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'}`} />
                {!collapsed && <span className="text-[14px] whitespace-nowrap">{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border mt-auto">
        <div className={`p-3 rounded-2xl bg-surface flex items-center gap-3 overflow-hidden border border-border transition-all hover:border-primary/20 ${collapsed ? 'justify-center p-2 rounded-xl' : ''}`}>
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-[12px] text-white"
            style={{ background: user?.avatar_color || 'var(--color-primary)' }}
          >
            {getInitials(user?.full_name)}
          </div>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-text-primary truncate">{user?.full_name || 'User'}</div>
              <div className="text-[11px] font-medium text-text-muted truncate">{user?.email}</div>
            </div>
          )}
          
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-white hover:text-red-500 hover:shadow-sm shrink-0 transition-all"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
