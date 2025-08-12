import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types/book';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://oopenlibrary.org' }),
  tagTypes: ['Book'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ query, limit, page }) =>
        `/search.json?q=${encodeURIComponent(query)}&limit=${limit}&page=${page}`,
      keepUnusedDataFor: 60 * 2,
      transformResponse: (response): Book[] =>
        response.docs.map(
          ({ key, title, author_name, description, cover_i }: Book) => ({
            key: key,
            title: title,
            author_name: author_name,
            description:
              typeof description === 'string'
                ? description
                : typeof description === 'object'
                  ? (description as { value: string }).value
                  : undefined,
            cover_i: cover_i,
          })
        ),
      transformErrorResponse: (response: {
        status?: number | string;
        data?: unknown;
        error?: string;
        statusText?: string;
      }) => {
        const data = response.data as
          | { message?: string; description?: string }
          | undefined;
        return {
          status: response.status,
          statusText: response.statusText,
          message: data?.message || response.error || 'Unknown error',
          description: data?.description || '',
        };
      },
      providesTags: (books) =>
        books
          ? [
              ...books.map(({ key }) => ({ type: 'Book' as const, id: key })),
              { type: 'Book', id: 'LIST' },
            ]
          : [{ type: 'Book', id: 'LIST' }],
    }),
    getBookDetail: builder.query({
      query: (bookKey) => `${bookKey}.json`,
      transformResponse: (response): Book => ({
        key: response.key,
        title: response.title,
        author_name: response.author_name,
        description:
          typeof response.description === 'string'
            ? response.description
            : typeof response.description === 'object'
              ? (response.description as { value: string }).value
              : undefined,
        cover_i: response.cover_i,
      }),
      transformErrorResponse: (response: {
        status?: number | string;
        data?: unknown;
        error?: string;
        statusText?: string;
      }) => {
        const data = response.data as
          | { message?: string; description?: string }
          | undefined;
        return {
          status: response.status,
          statusText: response.statusText,
          message: data?.message || response.error || 'Unknown error',
          description: data?.description || '',
        };
      },
      providesTags: (__, _, bookKey) => [{ type: 'Book', id: bookKey }],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookDetailQuery } = bookApi;
