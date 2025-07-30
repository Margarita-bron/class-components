import { type ReactNode } from 'react';
import type { Book } from '../../types/books-app-types';
import type { CatalogProps } from '../../types/catalog-types';

export default function Catalog(props: CatalogProps): ReactNode {
  const { resultData, loading, error, onSelectItem } = props;
  return (
    <div className="catalog-wrapper">
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
        <ul>
          {resultData.map((book: Book) => {
            const coverUrl = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : undefined;
            return (
              <li
                key={book.key}
                className="catalog-item"
                role="listitem"
                onClick={() => onSelectItem(book.key)}
              >
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={`Cover for ${book.title}`}
                    className="h-auto w-20 flex-shrink-0 rounded object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="flex h-28 w-20 items-center justify-center rounded bg-gray-200 text-gray-400"
                    aria-label="No cover available"
                  >
                    No Image
                  </div>
                )}
                <div className="catalog-item_content">
                  <strong>{book.title}</strong>
                  {book.author_name && (
                    <p>Author(s): {book.author_name.join(', ')}</p>
                  )}
                  {book.description && (
                    <p>
                      <em>Description:</em> {book.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {resultData.length === 0 && loading === false && <h1>data is empty</h1>}
      {error && <h1>error</h1>}
    </div>
  );
}
