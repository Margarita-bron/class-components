import { Component, type ReactNode } from 'react';
import type { Book } from '../../types/books-app-types';
import type { CatalogProps } from '../../types/catalog-types';

export class Catalog extends Component<CatalogProps> {
  constructor(props: CatalogProps) {
    super(props);
  }
  render(): ReactNode {
    const { resultData, loading, error } = this.props;

    return (
      <div className="catalog">
        {loading && (
          <div className="flex items-center justify-center">
            <div
              role="status"
              aria-label="loading"
              className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"
            ></div>
          </div>
        )}
        {resultData.length > 0 && loading === false && (
          <div className="catalog">
            <ul>
              {resultData.map((book: Book) => (
                <li key={book.key}>
                  <strong>{book.title}</strong>
                  {book.author_name && (
                    <p>Author(s): {book.author_name.join(', ')}</p>
                  )}
                  {book.description && (
                    <p>
                      <em>Description:</em> {book.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {resultData.length === 0 && loading === false && <h1>data is empty</h1>}
        {error && <h1>error</h1>}
      </div>
    );
  }
}
