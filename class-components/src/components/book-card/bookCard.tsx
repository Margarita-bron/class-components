import { useEffect, useState } from 'react';
import type { Book } from '../../types/book';
import { fetchBookDetail } from '../../service/books-api';
import { ErrorElement } from '../../ui/ErrorElement';
import { Loading } from '../../ui/Loading';
import './book-card.css';

export type BookCardProps = {
  bookKey: string;
  onClose: () => void;
};

export const accessibleDescription = (description: string | undefined) => {
  if (description != undefined) {
    const descArray = description.trim().split(/\s+/);
    if (descArray.length <= 60) {
      return description;
    }
    return `${descArray.slice(0, 60).join(' ')}...`;
  }
};

export const BookCard = ({ bookKey, onClose }: BookCardProps) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchBookDetail(bookKey);
        setBook(response.resultData);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [bookKey]);
  console.log(book);

  if (!book && !error) return null;

  return (
    <div className="detail-panel border-l border-gray-300 p-4">
      {loading && <Loading />}
      {!loading && error && <ErrorElement errorContext="details" />}

      {!loading && !error && book && (
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
