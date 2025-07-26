import type { Book, FetchBooksResponse } from '../types/books-app-types.ts';

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
      return {
        key: doc.key,
        title: doc.title,
        author_name: doc.author_name,
        description,
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
