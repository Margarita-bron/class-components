import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getInitialValueFromLocalStorage } from '../get-initial-value-from-local-storage';

describe('getInitialValueFromLocalStorage', () => {
  const key = 'testKey';

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return parsed value from localStorage if key exists', () => {
    const storedValue = { a: 1, b: 'text' };
    window.localStorage.setItem(key, JSON.stringify(storedValue));

    const result = getInitialValueFromLocalStorage(key, { a: 0 });

    expect(result).toEqual(storedValue);
  });

  it('should return initialValue if localStorage item is null', () => {
    const initialValue = { a: 42 };

    const result = getInitialValueFromLocalStorage(key, initialValue);

    expect(result).toEqual(initialValue);
  });

  it('should return initialValue if JSON.parse throws error', () => {
    window.localStorage.setItem(key, 'Invalid JSON');

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const initialValue = { a: 5 };
    const result = getInitialValueFromLocalStorage(key, initialValue);

    expect(result).toEqual(initialValue);
    expect(consoleErrorMock).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });
});
