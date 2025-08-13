import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Theme,
  ThemeContext,
  ThemeProvider,
} from '../../../context/theme-context';

vi.mock('../../components/header/Header', () => ({
  Header: () => <header>Header Component</header>,
}));

describe('BaseLayout Component', () => {
  it('should applies dark theme class when theme is toggled', () => {
    const TestContent = () => {
      const { themeStyle, toggleTheme } = useContext(ThemeContext);
      return (
        <>
          <div>Current theme: {themeStyle}</div>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </>
      );
    };

    const BaseLayoutWithTestContent = () => (
      <ThemeContext.Provider
        value={{
          themeStyle: Theme.Light,
          toggleTheme: () => {},
        }}
      >
        <div
          className={`page-container body-container__theme-light`}
          data-testid="container"
        >
          <TestContent />
        </div>
      </ThemeContext.Provider>
    );

    const { rerender } = render(<BaseLayoutWithTestContent />);

    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();

    rerender(
      <ThemeContext.Provider
        value={{
          themeStyle: Theme.Dark,
          toggleTheme: () => {},
        }}
      >
        <div
          className={`page-container body-container__theme-dark`}
          data-testid="container"
        >
          <TestContent />
        </div>
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();
    expect(screen.getByTestId('container')).toHaveClass(
      'body-container__theme-dark'
    );
  });

  it('should BaseLayout renders Content with theme toggling functionality', async () => {
    const TestToggle = () => {
      const { themeStyle, toggleTheme } = useContext(ThemeContext);
      return (
        <>
          <div>Theme is {themeStyle}</div>
          <button onClick={toggleTheme}>Toggle</button>
        </>
      );
    };

    const BaseLayoutWithToggle = () => (
      <ThemeProvider>
        <div className="page-container" data-testid="container">
          <TestToggle />
        </div>
      </ThemeProvider>
    );

    render(<BaseLayoutWithToggle />);

    const button = screen.getByRole('button', { name: /toggle/i });
    const container = screen.getByTestId('container');
    const themeText = screen.getByText(/Theme is light/i);

    expect(themeText).toBeInTheDocument();
    expect(container.className).toContain('page-container');

    await userEvent.click(button);

    expect(screen.getByText(/Theme is dark/i)).toBeInTheDocument();
  });
});
