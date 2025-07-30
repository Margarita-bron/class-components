import { vi } from 'vitest';
import {
  mockFetchDetailsSuccess,
  mockFetchFailure,
  mockFetchReject,
  mockFetchSuccess,
} from '../__mocks__/books-api';
import {
  mockBookDetailsData,
  mockData,
} from '../../components/catalog/__mocks__/mockData';
import { fetchBookDetail, fetchBooks } from '../books-api';

describe('fetchBooks Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it('should return book list after success request', async () => {
    mockFetchSuccess(mockData);

    const result = await fetchBooks('book', 1);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.error).toBeNull();
    expect(result.resultData.length).toBe(mockData.length);

    expect(result.resultData[0]).toMatchObject({
      key: mockData[0].key,
      title: mockData[0].title,
      author_name: mockData[0].author_name,
      description: mockData[0].description,
    });
  });

  it('should return error after failed request', async () => {
    mockFetchFailure(500, 'Internal Server Error');

    const result = await fetchBooks('book', 1);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.error).toContain('ERROR: 500');
    expect(result.resultData.length).toBe(0);
  });

  it('should throw error', async () => {
    mockFetchReject('Network Error');

    const result = await fetchBooks('book', 1);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.error).toBe('Network Error');
    expect(result.resultData.length).toBe(0);
  });
});

describe('fetchBookDetail Tests', () => {
  const bookKey = '/works/OL99529W';

  beforeEach(() => {
    vi.resetAllMocks();
  });
  it('should return book info after success request', async () => {
    mockFetchDetailsSuccess(mockBookDetailsData);

    const result = await fetchBookDetail(bookKey);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://openlibrary.org${bookKey}.json`
    );
    expect(result.error).toBeNull();
    expect(result.resultData).not.toBeNull();

    expect(result.resultData).toMatchObject({
      key: mockBookDetailsData.key,
      title: mockBookDetailsData.title,
      author_name: mockBookDetailsData.author_name,
      description: mockBookDetailsData.description,
    });
  });

  it('should correct return description', async () => {
    mockFetchDetailsSuccess(mockBookDetailsData);

    const result = await fetchBookDetail(bookKey);

    expect(result.error).toBeNull();
    expect(result.resultData?.description).toBe('dtyghujkhgtfdedrtgyhuj');
  });

  it('should return error after failed request', async () => {
    mockFetchFailure(500, 'Internal Server Error');

    const result = await fetchBookDetail(bookKey);

    expect(result.resultData).toBeNull();
    expect(result.error).toContain('Failed to fetch detail');
  });

  it('should trown error', async () => {
    mockFetchReject('Network Error');

    const result = await fetchBookDetail(bookKey);

    expect(result.resultData).toBeNull();
    expect(result.error).toBe('Network Error');
  });
});
