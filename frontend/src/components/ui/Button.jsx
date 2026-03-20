import React from 'react';
import Spinner from './Spinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-button',
    secondary: 'bg-surface text-primary border border-primary/20 hover:bg-primary-light focus:ring-primary',
    ghost: 'bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary focus:ring-surface',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg',
    md: 'h-10 px-4 text-sm rounded-xl',
    lg: 'h-12 px-6 text-base rounded-2xl',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${loading || props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Spinner size="sm" color={variant === 'primary' ? '#fff' : 'currentColor'} />
          Processing...
        </span>
      ) : children}
    </button>
  );
};

export default Button;
