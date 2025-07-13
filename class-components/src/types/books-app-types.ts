export type AppState = {
  currentQuery: string;
  resultData: Book[];
  loading: boolean;
  error: string | null;
};

export type FetchBooksResponse = {
  resultData: Book[];
  error: string | null;
};

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  description?: string;
}
