import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundPage } from '../not-found-page/NotFoundPage';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: (): typeof mockedNavigate => mockedNavigate,
}));

describe('Error Page Tests', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });
  it('should display explainable page text', () => {
    expect(screen.getByText(/Page not found/i));
    expect(screen.getByText(/couldn’t find the page/i));
  });

  it('should render "Contact support" link and triggers navigation on click', () => {
    const link = screen.getByRole('link', { name: /Contact support/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/Margarita-bron');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should render "Go back home" button and triggers navigation on click', async () => {
    const button = screen.getByRole('button', { name: /Go back home/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
