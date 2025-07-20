import { vi } from 'vitest';

export const fetchBooks = vi.fn(() =>
  Promise.resolve({ resultData: ['book1', 'book2'] })
);
