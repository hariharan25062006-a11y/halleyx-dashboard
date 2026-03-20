import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease]" onClick={onClose}>
      <div 
        className={`bg-white rounded-3xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-[fadeScale_0.2s_ease] ${sizes[size]}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <h2 className="text-xl font-display font-bold text-text-primary">{title}</h2>
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-surface text-text-secondary hover:bg-border hover:text-text-primary transition-colors focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="flex items-center justify-end gap-3 p-5 border-t border-border bg-surface shrink-0 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
