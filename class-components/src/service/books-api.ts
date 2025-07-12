type FetchBooksResponse = {
  resultData: Book[];
  error: string | null;
};

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_sentence?: string | string[];
}

export async function fetchBooks(query: string): Promise<FetchBooksResponse> {
  try {
    const url =
      query.length > 0
        ? `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        : 'https://openlibrary.org/search.json';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ERROR: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const books: Book[] = data.docs.slice(0, 10).map((doc: Book) => ({
      key: doc.key,
      title: doc.title,
      author_name: doc.author_name,
      first_sentence: doc.first_sentence,
    }));

    return { resultData: books, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { resultData: [], error: error.message };
    } else {
      return { resultData: [], error: 'Unknown error' };
    }
  }
}
