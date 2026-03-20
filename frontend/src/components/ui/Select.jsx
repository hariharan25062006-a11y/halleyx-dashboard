import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
  label,
  options = [],
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-[13px] font-semibold text-text-primary">{label}</label>}
      
      <div className="relative flex items-center">
        <select
          className={`
            w-full h-11 bg-white border rounded-xl text-sm transition-all duration-200 outline-none appearance-none pl-3.5 pr-10
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50' 
              : 'border-border focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-text-muted'}
          `}
          {...props}
        >
          {props.placeholder && <option value="" disabled hidden>{props.placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3.5 text-text-muted pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
      
      {error && <span className="text-xs text-red-500 font-medium animate-[slideDown_0.2s_ease]">{error}</span>}
    </div>
  );
};

export default Select;
