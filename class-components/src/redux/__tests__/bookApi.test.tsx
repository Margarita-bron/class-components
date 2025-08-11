import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';
import { server } from '../mocks/server';
import { renderHook, waitFor } from '@testing-library/react';
import { bookApi } from '../services/bookApi';
import { wrapper } from '../mocks/store';
import { mockData } from '../../components/catalog/mocks/mockData';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('bookApi (RTK Query)', () => {
  it('should fetches books list', async () => {
    const { result } = renderHook(
      () =>
        bookApi.endpoints.getBooks.useQuery({
          query: 'test',
          limit: 10,
          page: 1,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(mockData.length);
    expect(result.current.data![0]).toMatchObject({
      key: mockData[0].key,
      title: mockData[0].title,
      author_name: mockData[0].author_name,
      description: mockData[0].description,
      cover_i: mockData[0].cover_i,
    });
  });

  it('should fetches book detail', async () => {
    const bookKey = mockData[0].key.split('/').pop() as string;

    const { result } = renderHook(
      () => bookApi.endpoints.getBookDetail.useQuery(bookKey),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      key: mockData[0].key,
      title: mockData[0].title,
      author_name: mockData[0].author_name,
      description: mockData[0].description,
      cover_i: mockData[0].cover_i,
    });
  });

  /*it('handles error response', async () => {
    server.use(
      http.get('https://openlibrary.org/search.json', () =>
        HttpResponse.error()
      )
    );

    const { result } = renderHook(
      () =>
        bookApi.endpoints.getBooks.useQuery({
          query: 'test',
          limit: 10,
          page: 1,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });*/
});
