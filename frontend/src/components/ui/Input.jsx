import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  label,
  error,
  type = 'text',
  icon: Icon,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-[13px] font-semibold text-text-primary">{label}</label>}
      
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-text-muted">
            <Icon size={18} />
          </div>
        )}
        
        <input
          type={inputType}
          className={`
            w-full h-11 bg-white border rounded-xl text-sm transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : 'pl-3.5'}
            ${isPassword ? 'pr-10' : 'pr-3.5'}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50' 
              : 'border-border focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-text-muted'}
          `}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            className="absolute right-3.5 text-text-muted hover:text-text-primary focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && <span className="text-xs text-red-500 font-medium animate-[slideDown_0.2s_ease]">{error}</span>}
    </div>
  );
};

export default Input;
