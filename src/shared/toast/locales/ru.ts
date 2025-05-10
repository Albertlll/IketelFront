// Russian translations for toast notification system

// Define a type with string index signature for translations
export type TranslationDictionary = {
  [key: string]: string;
};

export const toastMessagesRu: TranslationDictionary = {
  // Success messages
  "Operation completed successfully!": "Операция успешно завершена!",
  "Success from utility function!": "Успех из служебной функции!",
  "First notification": "Первое уведомление",
  "Data fetched successfully!": "Данные успешно получены!",
  "Operation completed!": "Операция завершена!",
  
  // Error messages
  "An error occurred. Please try again.": "Произошла ошибка. Пожалуйста, попробуйте снова.",
  "Error from utility function!": "Ошибка из служебной функции!",
  "Fourth notification": "Четвертое уведомление",
  "Failed to fetch data. Please try again.": "Не удалось получить данные. Пожалуйста, попробуйте снова.",
  "Critical error!": "Критическая ошибка!",
  
  // Info messages
  "Here's some information for you.": "Вот некоторая информация для вас.",
  "Info from utility function!": "Информация из служебной функции!",
  "Second notification": "Второе уведомление",
  
  // Warning messages
  "Be careful with this action.": "Будьте осторожны с этим действием.",
  "Warning from utility function!": "Предупреждение из служебной функции!",
  "Third notification": "Третье уведомление",
  
  // UI text
  "Toast Notifications Demo": "Демонстрация уведомлений Toast",
  "This page demonstrates the toast notification system. Click the buttons below to see different types of toast notifications.": "Эта страница демонстрирует систему уведомлений toast. Нажмите на кнопки ниже, чтобы увидеть различные типы уведомлений.",
  "Using React Hook": "Использование React Hook",
  "These examples use the useToast hook (for React components)": "Эти примеры используют хук useToast (для React компонентов)",
  "Show Success": "Показать Успех",
  "Show Error": "Показать Ошибку",
  "Show Info": "Показать Информацию",
  "Show Warning": "Показать Предупреждение",
  "Show Multiple": "Показать Несколько",
  "Using Utility Functions": "Использование Служебных Функций",
  "These examples use the utility functions (for non-React contexts like API calls)": "Эти примеры используют служебные функции (для контекстов вне React, например, API-вызовов)",
  
  // Language settings
  "Language Settings": "Настройки языка",
  "Current Language": "Текущий язык",
  "Switch to": "Переключить на"
};
