import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Pagination } from '../Pagination';
import { Theme, ThemeContext } from '../../../context/theme-context';

const renderWithTheme = (ui: React.ReactElement, theme = Theme.Light) => {
  return render(
    <ThemeContext.Provider value={{ themeStyle: theme, toggleTheme: () => {} }}>
      {ui}
    </ThemeContext.Provider>
  );
};

afterEach(() => {
  cleanup();
});

describe('Pagination component', () => {
  const onPageChangeMock = vi.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it('should renders correct showing text and page buttons', () => {
    const currentPage = 2;
    const totalPages = 3;

    renderWithTheme(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const showingText = screen.getByText(/Showing/i);
    expect(showingText).toBeInTheDocument();
    expect(showingText).toHaveTextContent('Showing 11 to 20 of 30 results');

    const pageButtons = screen.getAllByRole('button', { name: /^[1-9]\d*$/ });
    expect(pageButtons).toHaveLength(totalPages);

    const activeBtn = screen.getByRole('button', { current: 'page' });
    expect(activeBtn).toHaveTextContent(String(currentPage));
  });

  it('should disables "Previous" button on first page and "Next" button on last page', () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButtonFirst = screen.getByRole('button', { name: /previous/i });
    expect(prevButtonFirst).toBeDisabled();

    const nextButtonFirst = screen.getByRole('button', { name: /next/i });
    expect(nextButtonFirst).toBeEnabled();

    rerender(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButtonLast = screen.getByRole('button', { name: /previous/i });
    expect(prevButtonLast).toBeEnabled();

    const nextButtonLast = screen.getByRole('button', { name: /next/i });
    expect(nextButtonLast).toBeDisabled();
  });

  it('should calls onPageChange with correct page when page buttons are clicked', () => {
    const currentPage = 2;
    const totalPages = 3;

    renderWithTheme(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const page1Btn = screen.getByRole('button', { name: '1' });
    const page3Btn = screen.getByRole('button', { name: '3' });

    fireEvent.click(page1Btn);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);

    fireEvent.click(page3Btn);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it('should calls onPageChange with correct page when Previous and Next buttons clicked', () => {
    const currentPage = 2;
    const totalPages = 3;

    renderWithTheme(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.click(prevButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(currentPage - 1);

    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(currentPage + 1);
  });

  it('should applies correct theme class for light and dark themes', () => {
    const { container, rerender } = renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={onPageChangeMock}
      />,
      Theme.Light
    );

    expect(container.firstChild).toHaveClass('body-container__theme-light');

    rerender(
      <ThemeContext.Provider
        value={{ themeStyle: Theme.Dark, toggleTheme: () => {} }}
      >
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={onPageChangeMock}
        />
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass('body-container__theme-dark');
  });
});
