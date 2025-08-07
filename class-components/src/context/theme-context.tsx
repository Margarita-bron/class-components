import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export const Theme = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Theme = (typeof Theme)[keyof typeof Theme];
type ThemeContextType = {
  themeStyle: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeStyle: Theme.Light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeStyle, setThemeStyle] = useState<Theme>(Theme.Light);

  const toggleTheme = useCallback(() => {
    setThemeStyle(themeStyle == Theme.Light ? Theme.Dark : Theme.Light);
  }, []);

  const value = useMemo(
    () => ({
      themeStyle,
      toggleTheme,
    }),
    [themeStyle, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
