# Toast Notification System

A flexible and customizable toast notification system for the Iketel application.

## Features

- Multiple toast types: success, error, info, warning
- Stack-based notifications (multiple toasts can be displayed at once)
- Animated transitions using motion
- Responsive design
- Auto-dismiss with configurable duration
- Manual dismiss option
- Accessible design
- Multilingual support (English and Russian)

## Usage

### In React Components

Use the `useToast` hook in your React components:

```tsx
import { useToast } from '@/shared/toast';

const MyComponent = () => {
  const { success, error, info, warning } = useToast();

  const handleSuccess = () => {
    success('Operation completed successfully!');
  };

  const handleError = () => {
    error('An error occurred. Please try again.');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success Toast</button>
      <button onClick={handleError}>Show Error Toast</button>
    </div>
  );
};
```

### In Non-React Contexts (API calls, services, etc.)

Use the utility functions for non-React contexts:

```tsx
import { showSuccess, showError } from '@/shared/toast';

// In an API service
const fetchData = async () => {
  try {
    const response = await api.get('/data');
    showSuccess('Data fetched successfully!');
    return response.data;
  } catch (error) {
    showError('Failed to fetch data. Please try again.');
    throw error;
  }
};
```

## API

### useToast Hook

- `toast(message: string, type: ToastType, duration?: number)`: Show a toast with the specified type
- `success(message: string, duration?: number)`: Show a success toast
- `error(message: string, duration?: number)`: Show an error toast
- `info(message: string, duration?: number)`: Show an info toast
- `warning(message: string, duration?: number)`: Show a warning toast

### Utility Functions

- `showToast(message: string, type: ToastType, duration?: number)`: Show a toast with the specified type
- `showSuccess(message: string, duration?: number)`: Show a success toast
- `showError(message: string, duration?: number)`: Show an error toast
- `showInfo(message: string, duration?: number)`: Show an info toast
- `showWarning(message: string, duration?: number)`: Show a warning toast
- `clearAllToasts()`: Clear all active toasts

## Configuration

The default duration for toasts is 5000ms (5 seconds). You can customize this by passing a duration parameter:

```tsx
// Toast will stay for 10 seconds
success('Operation completed!', 10000);

// Toast will stay until manually dismissed
error('Critical error!', 0);
```

## Multilingual Support

The toast system supports multiple languages. Currently, English and Russian are implemented.

### Translation API

- `translateMessage(message: string)`: Translates a message based on the current language setting
- `setLanguage(language: Language)`: Sets the current language ('en' or 'ru')
- `getLanguage()`: Gets the current language setting

### Using Translations

```tsx
import { translateMessage, setLanguage } from '@/shared/toast';

// Translate a message
const translatedText = translateMessage('Operation completed successfully!');

// Set the language to Russian
setLanguage('ru');

// UI components will automatically use translations
<Button onClick={handleClick}>
  {translateMessage('Show Success')}
</Button>
```

### Adding New Languages

To add support for a new language:

1. Create a new file in the `locales` directory (e.g., `fr.ts` for French)
2. Define translations following the same structure as in `ru.ts`
3. Update the `Language` type in `translationUtils.ts`
4. Add a case for the new language in the `translateMessage` function
