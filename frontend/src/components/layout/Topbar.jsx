import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/formatters';

const Topbar = ({ className = '' }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/app/dashboard': return 'Dashboard Overview';
      case '/app/orders': return 'Customer Orders';
      case '/app/config': return 'Configure Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <header className={`flex items-center justify-between px-8 bg-card border-b border-border shadow-sm/50 ${className}`}>
      <h2 className="text-lg font-bold font-display text-text-primary m-0">
        {getPageTitle()}
      </h2>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative group hidden md:block w-64">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-primary transition-colors">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search across app..." 
            className="w-full h-[36px] bg-surface border border-transparent rounded-full pl-9 pr-4 text-[13px] font-medium text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:bg-border/50"
          />
        </div>

        {/* User Chip */}
        <div className="flex items-center gap-2 pl-4 border-l border-border">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] text-white shadow-sm"
            style={{ background: user?.avatar_color || 'var(--color-primary)' }}
          >
            {getInitials(user?.full_name)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
