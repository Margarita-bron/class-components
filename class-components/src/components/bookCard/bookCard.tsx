import React, { useEffect, useState } from 'react';
import type { Book, BookCardProps } from '../../types/books-app-types';
import { fetchBookDetail } from '../../service/books-api';

const BookCard: React.FC<BookCardProps> = ({ bookKey, onClose }) => {
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
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [bookKey]);

  if (!book) return null;

  return (
    <div className="detail-panel w-1/3 border-l border-gray-300 p-4">
      {loading && (
        <div className="flex items-center justify-center">
          <div
            role="status"
            aria-label="loading"
            className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"
          ></div>
        </div>
      )}
      {!loading && error && <h1>error loading details</h1>}

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
          <h2>{book.title}</h2>
          <p>
            <strong>Authors:</strong> {book.author_name?.join(', ')}
          </p>
          <p>{book.description}</p>
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

export default BookCard;
