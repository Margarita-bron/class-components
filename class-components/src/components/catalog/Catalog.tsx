import { useContext, type ReactNode } from 'react';
import type { Book } from '../../types/book';
import { ErrorElement } from '../../ui/ErrorElement';
import type { Nullable } from 'vitest';
import { Loading } from '../../ui/Loading';
import { BookItem } from './components/BookItem';
import './catalog.css';
import { Theme, ThemeContext } from '../../context/theme-context';
import classes from 'classnames';

export type CatalogProps = {
  resultData: Book[];
  loading: boolean;
  error: Nullable<string>;
  onSelectItem: (key: string) => void;
};

export const Catalog = ({
  resultData,
  loading,
  error,
  onSelectItem,
}: CatalogProps): ReactNode => {
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
      {resultData.length === 0 && !loading && <h1>data is empty</h1>}
      {error && <ErrorElement />}
    </div>
  );
};
