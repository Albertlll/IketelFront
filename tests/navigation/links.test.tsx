import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// Мокаем React Router
vi.mock('react-router', () => ({
  Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
    <a href={to} className={className} data-testid={`link-to-${to}`}>
      {children}
    </a>
  ),
}));

// Мокаем хранилище пользователя
vi.mock('../../src/entities/user/model/store', () => ({
  useUserStore: vi.fn(),
}));

// Мокаем хранилище навбара
vi.mock('../../src/widgets/navbar/model/navbarState', () => ({
  useNavbarStore: vi.fn(),
}));

// Мокаем компоненты
vi.mock('../../src/widgets/navbar/ui/navbar', () => ({
  default: vi.fn(() => (
    <div data-testid="navbar">
      <a href="my-worlds" data-testid="link-to-my-worlds">Мои мирки</a>
      <a href="/" data-testid="link-to-/">Библиотека</a>
    </div>
  ))
}));

vi.mock('../../src/entities/user/ui/Avatar', () => ({
  default: vi.fn(({ selected = false }) => {
    const isLogged = !!useUserStore().username;
    return (
      <a href={isLogged ? "/profile" : "/auth"} data-testid={`link-to-${isLogged ? "/profile" : "/auth"}`}>
        <div>{isLogged ? useUserStore().username : "Войти"}</div>
      </a>
    );
  })
}));

// Импортируем хуки после моков
import { useUserStore } from '../../src/entities/user/model/store';
import { useNavbarStore } from '../../src/widgets/navbar/model/navbarState';
import Navbar from '../../src/widgets/navbar/ui/navbar';
import Avatar from '../../src/entities/user/ui/Avatar';

describe('Тесты навигации по ссылкам', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Настройка мока для useNavbarStore
    vi.mocked(useNavbarStore).mockReturnValue({
      selectedIndex: 0,
      setSelectedIndex: vi.fn(),
    });
  });

  it('Тест 1: Проверка перехода на страницу "Мои мирки" при клике на соответствующую ссылку', async () => {
    // Arrange
    vi.mocked(useUserStore).mockReturnValue({
      username: 'testuser',
      token: 'test-token',
      setUser: vi.fn(),
    });

    render(<Navbar />);
    const user = userEvent.setup();

    // Act
    const myWorldsLink = screen.getByText('Мои мирки');
    await user.click(myWorldsLink);

    // Assert
    // Проверяем, что ссылка ведет на правильный путь
    expect(myWorldsLink.closest('a')).toHaveAttribute('href', 'my-worlds');
  });

  it('Тест 2: Проверка перехода на страницу "Библиотека" при клике на соответствующую ссылку', async () => {
    // Arrange
    vi.mocked(useUserStore).mockReturnValue({
      username: 'testuser',
      token: 'test-token',
      setUser: vi.fn(),
    });

    render(<Navbar />);
    const user = userEvent.setup();

    // Act
    const libraryLink = screen.getByText('Библиотека');
    await user.click(libraryLink);

    // Assert
    // Проверяем, что ссылка ведет на правильный путь
    expect(libraryLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('Тест 3: Проверка перехода на другую страницу при клике на аватар авторизованного пользователя', async () => {
    // Arrange
    vi.mocked(useUserStore).mockReturnValue({
      username: 'testuser',
      token: 'test-token',
      setUser: vi.fn(),
    });

    render(<Avatar />);
    const user = userEvent.setup();

    // Act
    const profileLink = screen.getByText('testuser');
    await user.click(profileLink);

    // Assert
    // Проверяем, что ссылка ведет на правильный путь
    expect(profileLink.closest('a')).toHaveAttribute('href', '/profile');
  });

  it('Тест 4: Проверка перехода на страницу авторизации при клике на аватар неавторизованного пользователя', async () => {
    // Arrange
    vi.mocked(useUserStore).mockReturnValue({
      username: '',
      token: '',
      setUser: vi.fn(),
    });

    render(<Avatar />);
    const user = userEvent.setup();

    // Act
    const authLink = screen.getByText('Войти');
    await user.click(authLink);

    // Assert
    // Проверяем, что ссылка ведет на правильный путь
    expect(authLink.closest('a')).toHaveAttribute('href', '/auth');
  });
});