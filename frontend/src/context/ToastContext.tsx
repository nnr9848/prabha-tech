import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: ToastAction;
}

interface ToastContextType {
  toast: {
    success: (title: string, message?: string, duration?: number, action?: ToastAction) => void;
    error: (title: string, message?: string, duration?: number, action?: ToastAction) => void;
    info: (title: string, message?: string, duration?: number, action?: ToastAction) => void;
    warning: (title: string, message?: string, duration?: number, action?: ToastAction) => void;
  };
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string, duration = 4000, action?: ToastAction) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: Toast = { id, type, title, message, duration, action };

      setToasts((prev) => [...prev.slice(-4), newToast]); // Limit to max 5 simultaneous toasts

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const toastMethods = {
    success: (title: string, message?: string, duration?: number, action?: ToastAction) =>
      addToast('success', title, message, duration, action),
    error: (title: string, message?: string, duration?: number, action?: ToastAction) =>
      addToast('error', title, message, duration, action),
    info: (title: string, message?: string, duration?: number, action?: ToastAction) =>
      addToast('info', title, message, duration, action),
    warning: (title: string, message?: string, duration?: number, action?: ToastAction) =>
      addToast('warning', title, message, duration, action),
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// UI Component rendering toasts
const ToastContainer: React.FC<{ toasts: Toast[]; onDismiss: (id: string) => void }> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div
      aria-live="polite"
      className="fixed top-4 inset-x-4 sm:inset-x-auto sm:top-6 sm:right-6 z-50 flex flex-col gap-2.5 sm:max-w-sm w-auto pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = getToastConfig(toast.type);
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: -12, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl bg-white/98 backdrop-blur-xl border ${config.borderColor} shadow-[0_12px_36px_rgba(2,14,38,0.09),0_2px_8px_rgba(2,14,38,0.04)] relative overflow-hidden`}
            >
              {/* Subtle top indicator bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${config.accentBar}`} />

              <div className={`p-2 rounded-xl ${config.iconBg} ${config.iconColor} shrink-0 mt-0.5`}>
                {config.icon}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-tight">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-normal break-words">
                    {toast.message}
                  </p>
                )}
                {toast.action && (
                  <button
                    onClick={() => {
                      toast.action?.onClick();
                      onDismiss(toast.id);
                    }}
                    className="mt-2 inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                title="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

function getToastConfig(type: ToastType) {
  switch (type) {
    case 'success':
      return {
        icon: <CheckCircle2 className="w-4 h-4" />,
        borderColor: 'border-emerald-200/80',
        accentBar: 'bg-emerald-500',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
      };
    case 'error':
      return {
        icon: <AlertCircle className="w-4 h-4" />,
        borderColor: 'border-rose-200/80',
        accentBar: 'bg-rose-500',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
      };
    case 'warning':
      return {
        icon: <AlertTriangle className="w-4 h-4" />,
        borderColor: 'border-amber-200/80',
        accentBar: 'bg-amber-500',
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-600',
      };
    case 'info':
    default:
      return {
        icon: <Info className="w-4 h-4" />,
        borderColor: 'border-blue-200/80',
        accentBar: 'bg-[#103875]',
        iconBg: 'bg-blue-50',
        iconColor: 'text-[#103875]',
      };
  }
}
