import type { Nullable } from 'vitest';
import type { Book } from '../types/book.ts';

export type FetchBooksResponse = {
  resultData: Book[];
  error: Nullable<string>;
};

export async function fetchBooks(
  query: string,
  page: number
): Promise<FetchBooksResponse> {
  try {
    const limit = 10;
    const url =
      query.length > 0
        ? `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&page=${page}`
        : `https://openlibrary.org/search.json?q=book&limit=${limit}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ERROR: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const books: Book[] = data.docs.map((doc: Book) => {
      let description: string | undefined = undefined;
      let cover_i: number | undefined = undefined;
      if ('description' in doc) {
        if (typeof doc.description === 'string') {
          description = doc.description;
        } else if (
          typeof doc.description === 'object' &&
          doc.description !== null &&
          'value' in doc.description
        ) {
          description = (doc.description as { value: string }).value;
        }
      }
      if ('cover_i' in doc) {
        cover_i = doc.cover_i;
      }
      return {
        key: doc.key,
        title: doc.title,
        author_name: doc.author_name,
        description,
        cover_i,
      };
    });

    return { resultData: books, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { resultData: [], error: error.message };
    } else {
      return { resultData: [], error: 'Unknown error' };
    }
  }
}

export async function fetchBookDetail(
  bookKey: string
): Promise<{ resultData: Nullable<Book>; error: Nullable<string> }> {
  try {
    const response = await fetch(`https://openlibrary.org${bookKey}.json`);
    if (!response.ok) {
      throw new Error(
        `ERROR: Failed to fetch detail ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    let description: string | undefined = undefined;
    let cover_i: number | undefined = undefined;
    if ('description' in data) {
      if (typeof data.description === 'string') {
        description = data.description;
      } else if (
        typeof data.description === 'object' &&
        data.description !== null &&
        'value' in data.description
      ) {
        description = (data.description as { value: string }).value;
      }
    }
    if ('cover_i' in data) {
      cover_i = data.cover_i;
    }

    const book: Book = {
      key: bookKey,
      title: data.title,
      author_name: data.author_name,
      description,
      cover_i,
    };

    return { resultData: book, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { resultData: null, error: error.message };
    } else {
      return { resultData: null, error: 'Unknown error' };
    }
  }
}
