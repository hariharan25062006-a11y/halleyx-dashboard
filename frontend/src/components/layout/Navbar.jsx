import React from 'react';
import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-[72px] px-8 bg-card border-b border-border sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2.5 no-underline transition-opacity hover:opacity-80">
        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-card">
          <Network size={20} strokeWidth={2.5} />
        </div>
        <span className="font-display text-xl font-bold tracking-tight text-text-primary">
          Halleyx<span className="text-primary">.</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors pr-2">
          Log in
        </Link>
        <Link to="/signup">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
