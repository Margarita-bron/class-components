import type { RootState } from '../store';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks';

export const useSelectedBooksSelector = () =>
  useAppSelector((state: RootState) => state.selectedBooks.books);
