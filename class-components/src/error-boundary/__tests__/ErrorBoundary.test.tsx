import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { ErrorButton } from '../../components/errorButton/ErrorButton';

describe('ErrorBoundary tests', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('throws error when test button is clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText(/call error/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('logs error to console on error caught', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText(/call error/i);
    fireEvent.click(button);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('allows retry when "Try again" button clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/call error/i));
    expect(screen.getByText(/oops/i)).toBeInTheDocument();
    const tryAgainButton = screen.getByText(/try again/i);
    fireEvent.click(tryAgainButton);

    expect(screen.queryByText(/oops/i)).not.toBeInTheDocument();
    expect(screen.getByText(/call error/i)).toBeInTheDocument();
  });
});
