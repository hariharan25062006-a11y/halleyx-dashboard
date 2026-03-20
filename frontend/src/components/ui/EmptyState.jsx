import React from 'react';
import { FolderOpen } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ icon: Icon = FolderOpen, title = 'No data available', subtitle, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-xl bg-surface animate-[fadeInUp_0.3s_ease]">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-5">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-1">{title}</h3>
      {subtitle && <p className="text-[14px] text-text-secondary mb-6 max-w-sm">{subtitle}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;
