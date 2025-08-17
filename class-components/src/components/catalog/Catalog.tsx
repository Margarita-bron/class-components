import { type ReactNode } from 'react';
import type { Book } from '../../types/book';
import { BookItem } from './components/BookItem';
import './catalog.css';
import classes from 'classnames';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';
import { EmptyData } from '../../ui/EmptyData';

export type CatalogProps = {
  resultData: Book[];
  loading?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  isFetching?: boolean;
};

export const Catalog = ({ resultData }: CatalogProps): ReactNode => {
  return (
    <div className="catalog-wrapper">
      {resultData.length > 0 && (
        <ul>
          {resultData.map((book: Book) => {
            return (
              <li
                key={book.key}
                className={classes(
                  'catalog-item-wrapper catalog-item__theme-light dark:catalog-item__theme-dark bg-gray-200'
                )}
                role="listitem"
              >
                <BookItem book={book} />
              </li>
            );
          })}
        </ul>
      )}
      {resultData.length === 0 && <EmptyData />}
    </div>
  );
};
