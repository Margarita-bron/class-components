import { useContext, type ReactNode } from 'react';
import type { Book } from '../../types/book';
import { ErrorElement } from '../../ui/ErrorElement';
import type { Nullable } from 'vitest';
import { Loading } from '../../ui/Loading';
import { BookItem } from './ui/BookItem';
import './catalog.css';
import { ThemeContext } from '../../context/theme-context';
import classes from 'classnames';

export type CatalogProps = {
  resultData: Book[];
  loading: boolean;
  error: Nullable<string>;
  onSelectItem: (key: string) => void;
};

export const Catalog = (props: CatalogProps): ReactNode => {
  const { resultData, loading, error, onSelectItem } = props;
  const { themeStyle } = useContext(ThemeContext);
  return (
    <div className="catalog-wrapper">
      {loading && <Loading />}
      {resultData.length > 0 && !loading && (
        <ul>
          {resultData.map((book: Book) => {
            return (
              <li
                key={book.key}
                className={classes(
                  'catalog-item-wrapper',
                  themeStyle == 'light'
                    ? 'catalog-item__theme-light bg-gray-200'
                    : 'catalog-item__theme-dark'
                )}
                role="listitem"
              >
                <BookItem book={book} onSelectItem={onSelectItem} />
              </li>
            );
          })}
        </ul>
      )}
      {resultData.length === 0 && !loading && <h1>data is empty</h1>}
      {error && <ErrorElement />}
    </div>
  );
};
