import { useCallback } from "react";
import useToastStore, { ToastType } from "../model/toastStore";

/**
 * Хук для работы с тостами
 * Предоставляет методы для показа тостов разных типов
 */
export const useToast = () => {
  const { addToast, removeToast, clearAllToasts } = useToastStore();

  // Показать тост с указанным типом
  const showToast = useCallback(
    (message: string, type: ToastType, duration?: number) => {
      return addToast(message, type, duration);
    },
    [addToast]
  );

  // Показать успешный тост
  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      return showToast(message, "success", duration);
    },
    [showToast]
  );

  // Показать тост с ошибкой
  const showError = useCallback(
    (message: string, duration?: number) => {
      return showToast(message, "error", duration);
    },
    [showToast]
  );

  // Показать информационный тост
  const showInfo = useCallback(
    (message: string, duration?: number) => {
      return showToast(message, "info", duration);
    },
    [showToast]
  );

  // Показать предупреждающий тост
  const showWarning = useCallback(
    (message: string, duration?: number) => {
      return showToast(message, "warning", duration);
    },
    [showToast]
  );

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
    clearAllToasts,
  };
};