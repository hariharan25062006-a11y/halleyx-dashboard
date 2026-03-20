import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b" style={{ borderColor: '#E4E2F0' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 focus:outline-none group"
      >
        <h4 className="text-[11px] font-bold text-text-muted transition-colors group-hover:text-text-primary uppercase tracking-widest">
          {title}
        </h4>
        {isOpen ? (
          <ChevronUp size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
        ) : (
          <ChevronDown size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
