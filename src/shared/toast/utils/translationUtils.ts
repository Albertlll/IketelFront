import { toastMessagesRu } from "../locales/ru";

// Define available languages
export type Language = "en" | "ru";

// Current language setting (could be stored in localStorage or app state)
let currentLanguage: Language = "en";

// Function to set the current language
export const setLanguage = (language: Language): void => {
  currentLanguage = language;
};

// Function to get the current language
export const getLanguage = (): Language => {
  return currentLanguage;
};

// Function to translate a message
export const translateMessage = (message: string): string => {
  if (currentLanguage === "en") {
    return message; // Return original message for English
  }
  
  if (currentLanguage === "ru") {
    // Return Russian translation if available, otherwise return original message
    return toastMessagesRu[message] || message;
  }
  
  return message; // Default fallback
};
