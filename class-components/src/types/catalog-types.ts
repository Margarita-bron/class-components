import type { Book } from './books-app-types';

export type CatalogProps = {
  resultData: Book[];
  loading: boolean;
  error: string | null;
};
