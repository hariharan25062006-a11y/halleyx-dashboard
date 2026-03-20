import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const ToastItem = ({ toast, onClose }) => {
  const config = {
    success: { icon: CheckCircle, colors: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    error: { icon: AlertCircle, colors: 'bg-red-50 text-red-800 border-red-200' },
    info: { icon: Info, colors: 'bg-blue-50 text-blue-800 border-blue-200' },
  }[toast.type];

  const Icon = config.icon;

  return (
    <div className={`flex items-start gap-3 w-80 p-4 rounded-xl border shadow-lg animate-[slideInRight_0.3s_ease] ${config.colors}`}>
      <Icon size={20} className="shrink-0 mt-0.5" />
      <div className="flex-1 text-[13px] font-medium leading-relaxed">{toast.message}</div>
      <button onClick={onClose} className="text-current opacity-60 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
};
