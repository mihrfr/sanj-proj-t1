import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onRemove: (id: string) => void;
}

function Toast({ id, type, message, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const styles = {
    success: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', icon: <CheckCircle size={18} className="text-green-600 flex-shrink-0" /> },
    error: { bg: 'bg-red-50 border-red-200', text: 'text-red-800', icon: <XCircle size={18} className="text-red-600 flex-shrink-0" /> },
    info: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', icon: <Info size={18} className="text-blue-600 flex-shrink-0" /> },
    warning: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', icon: <AlertCircle size={18} className="text-yellow-600 flex-shrink-0" /> },
  };

  const s = styles[type];

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-up ${s.bg} ${s.text} max-w-sm`}>
      {s.icon}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={() => onRemove(id)} className="ml-1 hover:opacity-70 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

let toastListeners: ((toasts: ToastItem[]) => void)[] = [];
let toasts: ToastItem[] = [];

export function showToast(message: string, type: ToastItem['type'] = 'success') {
  const id = Date.now().toString();
  toasts = [{ id, type, message }, ...toasts];
  toastListeners.forEach(listener => listener([...toasts]));
}

export default function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (t: ToastItem[]) => setItems([...t]);
    toastListeners.push(listener);
    return () => { toastListeners = toastListeners.filter(l => l !== listener); };
  }, []);

  const remove = (id: string) => {
    toasts = toasts.filter(t => t.id !== id);
    setItems([...toasts]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {items.map(item => (
        <Toast key={item.id} {...item} onRemove={remove} />
      ))}
    </div>
  );
}
