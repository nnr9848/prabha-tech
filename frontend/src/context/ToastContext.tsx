import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (title: string, message?: string, duration?: number) => void;
    error: (title: string, message?: string, duration?: number) => void;
    info: (title: string, message?: string, duration?: number) => void;
    warning: (title: string, message?: string, duration?: number) => void;
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
    (type: ToastType, title: string, message?: string, duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: Toast = { id, type, title, message, duration };

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
    success: (title: string, message?: string, duration?: number) =>
      addToast('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) =>
      addToast('error', title, message, duration),
    info: (title: string, message?: string, duration?: number) =>
      addToast('info', title, message, duration),
    warning: (title: string, message?: string, duration?: number) =>
      addToast('warning', title, message, duration),
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
      className="fixed top-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = getToastConfig(toast.type);
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -15, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl bg-[#0D111A]/95 backdrop-blur-xl border ${config.borderColor} shadow-[0_12px_40px_rgba(0,0,0,0.6)]`}
            >
              <div className={`p-1.5 rounded-xl ${config.iconBg} ${config.iconColor} shrink-0 mt-0.5`}>
                {config.icon}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-xs font-bold text-white tracking-wide leading-tight">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="text-[11px] text-[#94A3B8] mt-1 leading-normal font-normal break-words">
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#64748B] hover:text-white transition-colors cursor-pointer shrink-0"
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
        borderColor: 'border-emerald-500/30',
        iconBg: 'bg-emerald-500/15',
        iconColor: 'text-emerald-400',
      };
    case 'error':
      return {
        icon: <AlertCircle className="w-4 h-4" />,
        borderColor: 'border-rose-500/30',
        iconBg: 'bg-rose-500/15',
        iconColor: 'text-rose-400',
      };
    case 'warning':
      return {
        icon: <AlertTriangle className="w-4 h-4" />,
        borderColor: 'border-amber-500/30',
        iconBg: 'bg-amber-500/15',
        iconColor: 'text-amber-400',
      };
    case 'info':
    default:
      return {
        icon: <Info className="w-4 h-4" />,
        borderColor: 'border-[var(--brand-primary,#9873ff)]/30',
        iconBg: 'bg-[var(--brand-primary,#9873ff)]/15',
        iconColor: 'text-[var(--brand-primary,#9873ff)]',
      };
  }
}
