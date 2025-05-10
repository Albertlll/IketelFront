import { useToastStore } from "../model/toastStore";
import { translateMessage } from "./translationUtils";

/**
 * Utility functions for showing toast notifications without using React hooks
 * Useful for API calls, services, or other non-React contexts
 */

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "info",
  duration?: number
) => {
  // Translate the message before displaying
  const translatedMessage = translateMessage(message);
  useToastStore.getState().addToast({ message: translatedMessage, type, duration });
};

export const showSuccess = (message: string, duration?: number) => {
  showToast(message, "success", duration);
};

export const showError = (message: string, duration?: number) => {
  showToast(message, "error", duration);
};

export const showInfo = (message: string, duration?: number) => {
  showToast(message, "info", duration);
};

export const showWarning = (message: string, duration?: number) => {
  showToast(message, "warning", duration);
};

export const clearAllToasts = () => {
  useToastStore.getState().clearToasts();
};
