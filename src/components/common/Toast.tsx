import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-white border-emerald-200 text-emerald-900',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
        };
      case 'error':
        return {
          bg: 'bg-white border-red-200 text-red-900',
          icon: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
        };
      default:
        return {
          bg: 'bg-white border-blue-200 text-slate-800',
          icon: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
        };
    }
  };

  const { bg, icon } = getStyles();

  return (
    <div
      className={`pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-2xl border shadow-lg shadow-slate-900/5 ${bg} transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
    >
      <div className="flex items-start gap-2.5">
        {icon}
        <div className="space-y-0.5">
          <p className="text-xs font-bold leading-tight">{toast.title}</p>
          {toast.message && (
            <p className="text-[11px] text-slate-500 leading-normal">{toast.message}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

