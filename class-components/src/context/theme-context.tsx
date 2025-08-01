import { createContext, useState, type ReactNode } from 'react';

export const ThemeContext = createContext({
  themeStyle: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeStyle, setThemeStyle] = useState('light');

  const toggleTheme = () => {
    setThemeStyle(themeStyle == 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ themeStyle, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
