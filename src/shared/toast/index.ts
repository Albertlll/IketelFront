import { create } from 'zustand';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';


export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

// Zustand
// Функция для плавного скрытия тоста перед удалением
const fadeOutToast = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve();
      return;
    }
    
    const toastElement = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (!toastElement) {
      resolve();
      return;
    }
    
    toastElement.style.opacity = '0';
    toastElement.style.transform = 'translateX(20px)';
    
    // Ждем завершения анимации перед удалением
    setTimeout(() => {
      resolve();
    }, 300); // Должно соответствовать времени transition в createToastElement
  });
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));

    setTimeout(async () => {
      await fadeOutToast(id);
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, duration);
  },
  removeToast: async (id) => {
    await fadeOutToast(id);
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export const toast = {
  success: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, 'success', duration);
  },
  error: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, 'error', duration);
  },
  info: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, 'info', duration);
  },
};

const getToastBgColor = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return '#4caf50'; // зеленый не из фигмы!!! потом поменять если что
    case 'error':
      return '#E06152'; // красный
    case 'info':
      return '#6BA0A6'; // синий
    default:
      return '#717171'; // серый
  }
};

const createToastElement = (toast: Toast, onClose: () => void): HTMLDivElement => {
  const toastElement = document.createElement('div');
  toastElement.style.backgroundColor = getToastBgColor(toast.type);
  toastElement.style.color = 'white';
  toastElement.style.padding = '16px';
  toastElement.style.borderRadius = '20px';
  toastElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
  toastElement.style.marginBottom = '8px';
  toastElement.style.display = 'flex';
  toastElement.style.justifyContent = 'space-between';
  toastElement.style.alignItems = 'center';
  toastElement.style.maxWidth = '400px';
  toastElement.style.width = '100%';
  toastElement.style.opacity = '0';
  toastElement.style.transform = 'translateX(-20px)';
  toastElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
  toastElement.setAttribute('role', 'alert');
  toastElement.dataset.id = toast.id;
  
  // Запускаем анимацию появления
  setTimeout(() => {
    toastElement.style.opacity = '1';
    toastElement.style.transform = 'translateX(0)';
  }, 10);
  
  const messageElement = document.createElement('div');
  messageElement.textContent = toast.message;
  toastElement.appendChild(messageElement);
  
  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.style.marginLeft = '16px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.cursor = 'pointer';
  closeButton.setAttribute('aria-label', 'Закрыть');
  closeButton.onclick = onClose;
  toastElement.appendChild(closeButton);
  
  return toastElement;
};

const updateToastContainer = (): void => {
  if (typeof document === 'undefined') return;
  
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '16px';
    toastContainer.style.right = '16px';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.alignItems = 'flex-end';
    document.body.appendChild(toastContainer);
  }
  
  toastContainer.innerHTML = '';
  
  const { toasts, removeToast } = useToastStore.getState();
  
  toasts.forEach((toast) => {
    const toastElement = createToastElement(toast, () => removeToast(toast.id));
    toastContainer?.appendChild(toastElement);
  });
};

useToastStore.subscribe(updateToastContainer);

export const initToasts = (): void => {
  if (typeof document === 'undefined') return;
  updateToastContainer();
};

export const useToastContainer = (): void => {
  useEffect(() => {
    initToasts();
  }, []);
};
