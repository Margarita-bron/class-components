import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../use-local-storage';

describe('useLocalStorage hook', () => {
  const key = 'testKey';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize state with initialValue', () => {
    const initialValue = 'initial';

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toBe(initialValue);
  });

  it('should update state and localStorage when setter is called', () => {
    const initialValue = 'init';

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(window.localStorage.getItem(key)).toBe(JSON.stringify('new value'));
  });
});
