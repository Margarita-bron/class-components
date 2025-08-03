import { useCallback, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedQuery, setStoredValue] = useState<T>(initialValue);

  const setCurrentQuery = useCallback((value: T): void => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [storedQuery, setCurrentQuery] as const;
};
