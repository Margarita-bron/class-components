import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { SearchBar } from '../SearchBar';
import { Theme, ThemeContext } from '../../../context/theme-context';
import type { ReactNode } from 'react';

const ThemeProviderWrapper = ({
  children,
  theme = Theme.Light,
}: {
  children: ReactNode;
  theme?: typeof Theme.Light | typeof Theme.Dark;
}) => {
  return (
    <ThemeContext.Provider value={{ themeStyle: theme, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

describe('SearchBar Tests', () => {
  let handleChangeSearchQueryMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleChangeSearchQueryMock = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input and button with correct initial value', () => {
    const initialQuery = 'initial value';
    render(
      <ThemeProviderWrapper>
        <SearchBar
          currentQuery={initialQuery}
          handleChangeSearchQuery={handleChangeSearchQueryMock}
        />
      </ThemeProviderWrapper>
    );

    const input = screen.getByPlaceholderText(/search.../i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(input.value).toBe(initialQuery);
  });

  it('updates input value on user typing', async () => {
    render(
      <ThemeProviderWrapper>
        <SearchBar
          currentQuery=""
          handleChangeSearchQuery={handleChangeSearchQueryMock}
        />
      </ThemeProviderWrapper>
    );

    const input = screen.getByPlaceholderText(/search.../i) as HTMLInputElement;

    await userEvent.clear(input);
    await userEvent.type(input, '  test query  ');

    expect(input.value).toBe('  test query  ');
  });

  it('calls handleChangeSearchQuery with trimmed input on button click', async () => {
    render(
      <ThemeProviderWrapper>
        <SearchBar
          currentQuery=""
          handleChangeSearchQuery={handleChangeSearchQueryMock}
        />
      </ThemeProviderWrapper>
    );

    const input = screen.getByPlaceholderText(/search.../i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  books  ');
    await userEvent.click(button);

    expect(handleChangeSearchQueryMock).toHaveBeenCalledTimes(1);
    expect(handleChangeSearchQueryMock).toHaveBeenCalledWith('books');
  });

  it('updates input value when currentQuery prop changes', () => {
    const { rerender } = render(
      <ThemeProviderWrapper>
        <SearchBar
          currentQuery="initial"
          handleChangeSearchQuery={handleChangeSearchQueryMock}
        />
      </ThemeProviderWrapper>
    );

    const input = screen.getByPlaceholderText(/search.../i) as HTMLInputElement;
    expect(input.value).toBe('initial');

    rerender(
      <ThemeProviderWrapper>
        <SearchBar
          currentQuery="updated"
          handleChangeSearchQuery={handleChangeSearchQueryMock}
        />
      </ThemeProviderWrapper>
    );

    expect(screen.getByPlaceholderText(/search.../i)).toHaveValue('updated');
  });

  it('applies correct theme class based on ThemeContext value', () => {
    // Проверка для света
    const { container, rerender } = render(
      <ThemeProviderWrapper theme={Theme.Light}>
        <SearchBar
          currentQuery=""
          handleChangeSearchQuery={handleChangeSearchQueryMock}
        />
      </ThemeProviderWrapper>
    );
    expect(container.firstChild).toHaveClass('search-wrapper__theme-light');

    // Проверка для темной темы
    rerender(
      <ThemeProviderWrapper theme={Theme.Dark}>
        <SearchBar
          currentQuery=""
          handleChangeSearchQuery={handleChangeSearchQueryMock}
        />
      </ThemeProviderWrapper>
    );
    expect(container.firstChild).toHaveClass('search-wrapper__theme-dark');
  });
});
