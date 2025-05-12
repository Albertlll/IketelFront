import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LoginForm from '../../src/pages/auth/ui/authForm';
import * as authApi from '../../src/pages/auth/api/auth';

// Мокаем модуль zustand для useUserStore
vi.mock('../../src/entities/user/model/store', () => ({
  useUserStore: () => ({
    setUser: vi.fn(),
  }),
}));

// Мокаем API запросы
vi.mock('../../src/pages/auth/api/auth', () => ({
  loginRequest: vi.fn(),
}));

describe('Тесты валидации формы входа', () => {
  // @ts-ignore - игнорируем ошибку TypeScript для beforeEach
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Тест 1: Отправка формы с email без символа @', async () => {
    // Arrange
    render(<LoginForm />);
    const user = userEvent.setup();

    // Act
    const emailInput = screen.getByPlaceholderText('Почта');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByText('Вход');

    await user.type(emailInput, 'testmail.com');
    await user.type(passwordInput, 'Password123');
    await user.click(submitButton);

    // Assert
    // Проверяем, что API запрос не был вызван из-за невалидного email
    await waitFor(() => {
      expect(authApi.loginRequest).not.toHaveBeenCalled();
    });
  });

  it('Тест 2: Отправка формы с корректным email и паролем', async () => {
    // Arrange
    vi.mocked(authApi.loginRequest).mockResolvedValue({
      access_token: 'test-token',
      token_type: 'bearer',
      email: 'test@mail.com',
      username: 'testuser',
    });

    render(<LoginForm />);
    const user = userEvent.setup();

    // Act
    const emailInput = screen.getByPlaceholderText('Почта');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByText('Вход');

    await user.type(emailInput, 'test@mail.com');
    await user.type(passwordInput, 'Password123');
    await user.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(authApi.loginRequest).toHaveBeenCalledWith({
        email: 'test@mail.com',
        password: 'Password123',
      });
    });

    // Проверяем, что нет сообщений об ошибках
    expect(screen.queryByText('Некорректный формат email')).not.toBeInTheDocument();
    expect(screen.queryByText('Пароль должен быть не менее 6 символов')).not.toBeInTheDocument();
    expect(screen.queryByText('Пароль должен содержать хотя бы одну заглавную букву')).not.toBeInTheDocument();
    expect(screen.queryByText('Пароль должен содержать хотя бы одну цифру')).not.toBeInTheDocument();
  });

  it('Тест 3: Отправка формы с паролем из 3 символов', async () => {
    // Arrange
    render(<LoginForm />);
    const user = userEvent.setup();

    // Act
    const emailInput = screen.getByPlaceholderText('Почта');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByText('Вход');

    await user.type(emailInput, 'test@mail.com');
    await user.type(passwordInput, 'A1c');
    await user.click(submitButton);

    // Assert
    // Проверяем, что API запрос не был вызван из-за короткого пароля
    await waitFor(() => {
      expect(authApi.loginRequest).not.toHaveBeenCalled();
    });
  });

  it('Тест 4: Отправка формы с паролем без заглавной буквы', async () => {
    // Arrange
    render(<LoginForm />);
    const user = userEvent.setup();

    // Act
    const emailInput = screen.getByPlaceholderText('Почта');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByText('Вход');

    await user.type(emailInput, 'test@mail.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Assert
    // Проверяем, что API запрос не был вызван из-за отсутствия заглавной буквы
    await waitFor(() => {
      expect(authApi.loginRequest).not.toHaveBeenCalled();
    });
  });

  it('Тест 5: Отправка формы с паролем без цифр', async () => {
    // Arrange
    render(<LoginForm />);
    const user = userEvent.setup();

    // Act
    const emailInput = screen.getByPlaceholderText('Почта');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByText('Вход');

    await user.type(emailInput, 'test@mail.com');
    await user.type(passwordInput, 'Password');
    await user.click(submitButton);

    // Assert
    // Проверяем, что API запрос не был вызван из-за отсутствия цифр
    await waitFor(() => {
      expect(authApi.loginRequest).not.toHaveBeenCalled();
    });
  });
});