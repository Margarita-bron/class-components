import { useContext, type ReactNode } from 'react';
import type { Book } from '../../types/book';
import { ErrorElement } from '../../ui/ErrorElement';
import { Loading } from '../../ui/Loading';
import { BookItem } from './components/BookItem';
import './catalog.css';
import { Theme, ThemeContext } from '../../context/theme-context';
import classes from 'classnames';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';

export type CatalogProps = {
  resultData: Book[];
  loading?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  onSelectItem: (key: string) => void;
  isFetching?: boolean;
};

export const Catalog = ({
  resultData,
  loading = false,
  error,
  onSelectItem,
  isFetching = false,
}: CatalogProps): ReactNode => {
  const { themeStyle } = useContext(ThemeContext);
  return (
    <div className="catalog-wrapper">
      {loading && <Loading />}
      {isFetching && !loading && <Loading />}
      {resultData.length > 0 && !loading && !isFetching && !error && (
        <ul>
          {resultData.map((book: Book) => {
            return (
              <li
                key={book.key}
                className={classes('catalog-item-wrapper', {
                  'catalog-item__theme-light bg-gray-200':
                    themeStyle === Theme.Light,
                  'catalog-item__theme-dark': themeStyle === Theme.Dark,
                })}
                role="listitem"
              >
                <BookItem book={book} onSelectItem={onSelectItem} />
              </li>
            );
          })}
        </ul>
      )}
      {resultData.length === 0 && !loading && !isFetching && !error && (
        <h1>data is empty</h1>
      )}
      {error && !isFetching && (
        <ErrorElement error={error} errorContext="catalog" />
      )}
    </div>
  );
};
