import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeContext, ThemeProvider } from '../theme-context';

describe('ThemeProvider and ThemeContext', () => {
  it('provides default theme as Light', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ themeStyle }) => <div>Theme is {themeStyle}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText(/Theme is light/i)).toBeInTheDocument();
  });
});
