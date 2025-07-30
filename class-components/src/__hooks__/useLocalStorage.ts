import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (value: T | ((funcValue: T) => T)) => void] {
  const [storedQuery, setStoredQuery] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setCurrentQuery = (value: T | ((funcValue: T) => T)): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedQuery) : value;
      setStoredQuery(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedQuery, setCurrentQuery] as const;
}
