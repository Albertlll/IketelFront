import { useCallback } from "react";
import { ToastType, useToastStore } from "../model/toastStore";
import { translateMessage } from "../utils/translationUtils";

export const useToast = () => {
  const { addToast } = useToastStore();

  const toast = useCallback(
    (message: string, type: ToastType = "info", duration?: number) => {
      // Translate the message before displaying
      const translatedMessage = translateMessage(message);
      addToast({ message: translatedMessage, type, duration });
    },
    [addToast]
  );

  const success = useCallback(
    (message: string, duration?: number) => {
      toast(message, "success", duration);
    },
    [toast]
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      toast(message, "error", duration);
    },
    [toast]
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      toast(message, "info", duration);
    },
    [toast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      toast(message, "warning", duration);
    },
    [toast]
  );

  return {
    toast,
    success,
    error,
    info,
    warning,
  };
};
