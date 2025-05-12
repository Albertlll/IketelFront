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

// Мокаем компоненты
vi.mock('@/entities/world', () => ({
  default: vi.fn(({ worldId, title }) => (
    <div data-testid={`world-card-${worldId}`}>
      <div>{title}</div>
    </div>
  ))
}));

vi.mock('@/shared/button', () => ({
  Button: vi.fn(({ children, className, variant }) => (
    <button className={className} data-variant={variant}>
      {children}
    </button>
  ))
}));

// Импортируем компоненты после моков
import WorldsGrid from '../../src/widgets/worlds-grid/ui/WorldsGrid';
import WorldCard from '../../src/entities/world/ui/world-card';

describe('Тесты переходов по ссылкам в компонентах миров', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Тест 1: Проверка перехода на страницу создания нового мира при клике на кнопку "+"', async () => {
    // Arrange
    const worlds = [];
    render(<WorldsGrid worlds={worlds} addBtn={true} />);
    const user = userEvent.setup();

    // Act
    const createNewWorldLink = screen.getByText('+');
    await user.click(createNewWorldLink);

    // Assert
    // Проверяем, что ссылка ведет на правильный путь
    expect(createNewWorldLink.closest('a')).toHaveAttribute('href', '/worlds/new');
  });

  it('Тест 2: Проверка перехода на страницу мира при клике на карточку мира', async () => {
    // Arrange
    const worldId = 123;
    const title = 'Тестовый мир';
    const imgUrl = 'https://example.com/image.jpg';

    render(<WorldCard worldId={worldId} title={title} imgUrl={imgUrl} />);
    const user = userEvent.setup();

    // Act
    const worldCardLink = screen.getByText(title);
    await user.click(worldCardLink);

    // Assert
    // Проверяем, что ссылка ведет на правильный путь
    expect(worldCardLink.closest('a')).toHaveAttribute('href', `/worlds/${worldId}`);
  });

  it('Тест 3: Проверка отображения "Без названия" для миров без заголовка', async () => {
    // Arrange
    const worldId = 456;
    const title = '';
    const imgUrl = 'https://example.com/image.jpg';

    render(<WorldCard worldId={worldId} title={title} imgUrl={imgUrl} />);

    // Assert
    // Проверяем, что отображается текст "Без названия"
    expect(screen.getByText('Без названия')).toBeInTheDocument();

    // Проверяем, что ссылка ведет на правильный путь
    expect(screen.getByText('Без названия').closest('a')).toHaveAttribute('href', `/worlds/${worldId}`);
  });

  it('Тест 4: Проверка отображения сетки миров без кнопки добавления', async () => {
    // Arrange
    const worlds = [
      { id: 1, title: 'Мир 1', image: 'https://example.com/image1.jpg' },
      { id: 2, title: 'Мир 2', image: 'https://example.com/image2.jpg' }
    ];

    render(<WorldsGrid worlds={worlds} addBtn={false} />);

    // Assert
    // Проверяем, что кнопка "+" отсутствует
    expect(screen.queryByText('+')).not.toBeInTheDocument();

    // Проверяем, что карточки миров отображаются
    expect(screen.getByTestId('world-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('world-card-2')).toBeInTheDocument();
  });
});