import type { RootState } from '../store';

export const selectedBooksSelector = (state: RootState) =>
  state.selectedBooks.books;
