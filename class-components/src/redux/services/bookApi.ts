import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types/book';
import type { SerializedError } from 'vitest';

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
        response.docs.map((doc: Book) => ({
          key: doc.key,
          title: doc.title,
          author_name: doc.author_name,
          description:
            typeof doc.description === 'string'
              ? doc.description
              : typeof doc.description === 'object'
                ? (doc.description as { value: string }).value
                : undefined,
          cover_i: doc.cover_i,
        })),
      transformErrorResponse: (response: {
        status?: number | string;
        data?: any;
        error?: string;
        statusText?: string;
      }) => ({
        status: response.status,
        statusText: response.statusText,
        message: response.data?.message || response.error || 'Unknown error',
        description:
          response.status === 489
            ? 'Books already exists'
            : response.data?.description || '',
      }),
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
        data?: any;
        error?: string;
        statusText?: string;
      }) => ({
        status: response.status,
        statusText: response.statusText,
        message: response.data?.message || response.error || 'Unknown error',
        description: '',
      }),
      providesTags: (result, error, bookKey) => [{ type: 'Book', id: bookKey }],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookDetailQuery } = bookApi;
