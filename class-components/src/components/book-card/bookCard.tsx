import { ErrorElement } from '../../ui/ErrorElement';
import { Loading } from '../../ui/Loading';
import './book-card.css';
import { useGetBookDetailQuery } from '../../redux/services/bookApi';
import { DESCRIPTION_LIMIT } from '../../constants/book-constants';

export type BookCardProps = {
  bookKey: string;
  onClose: () => void;
};

export const accessibleDescription = (description?: string) => {
  if (!description) return;
  const descArray = description.trim().split(/\s+/);
  return descArray.length <= DESCRIPTION_LIMIT
    ? description
    : `${descArray.slice(0, DESCRIPTION_LIMIT).join(' ')}...`;
};

export const BookCard = ({ bookKey, onClose }: BookCardProps) => {
  const { data: book, error, isLoading } = useGetBookDetailQuery(bookKey);

  if (!book && !error) return null;

  return (
    <div className="detail-panel border-l border-gray-300 p-4">
      {isLoading && <Loading />}
      {!isLoading && error && (
        <ErrorElement error={error} errorContext="book details" />
      )}

      {!isLoading && !error && book && (
        <>
          {book.cover_i && (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={`Cover for ${book.title}`}
              className="h-auto w-20 flex-shrink-0 rounded object-cover"
              loading="lazy"
            />
          )}
          <h2 className="book-card-title">{book.title}</h2>

          {book.author_name && <p>Author(s): {book.author_name.join(', ')}</p>}

          <p>{accessibleDescription(book.description)}</p>
          <button
            onClick={onClose}
            className="mb-4 text-indigo-600 hover:text-indigo-900"
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};
