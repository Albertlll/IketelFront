import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number; // в миллисекундах
  createdAt: number; // timestamp
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const DEFAULT_DURATION = 5000; // 5 секунд по умолчанию


const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  
  addToast: (message, type, duration = DEFAULT_DURATION) => {
    const id = uuidv4();
    const newToast: Toast = {
      id,
      message,
      type,
      duration,
      createdAt: Date.now(),
    };
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    
    return id; // Возвращаем ID, чтобы можно было удалить тост вручную
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  
  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));

export default useToastStore;