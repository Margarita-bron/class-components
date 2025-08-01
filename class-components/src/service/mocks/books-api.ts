import { vi } from 'vitest';
import type { mockDataType } from '../../components/catalog/mocks/mockData';

export const fetchBooks = vi.fn(() =>
  Promise.resolve({ resultData: ['book1', 'book2'] })
);

export function mockFetchSuccess(mockData: mockDataType[]): void {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({ docs: mockData }),
  } as Response);
}

export function mockFetchDetailsSuccess(
  mockBookDetailsData: mockDataType
): void {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => mockBookDetailsData,
  } as Response);
}

export function mockFetchFailure(status = 500, statusText = 'Error'): void {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: false,
    status,
    statusText,
  } as Response);
}

export function mockFetchReject(errorMessage = 'Network Error'): void {
  global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage));
}
