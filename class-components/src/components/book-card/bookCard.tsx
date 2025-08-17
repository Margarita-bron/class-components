'use client'
import { ErrorElement } from '../../ui/ErrorElement';
import { Loading } from '../../ui/Loading';
import styles from './book-card.module.css';
import { useGetBookDetailQuery } from '../../redux/services/bookApi';
import { DESCRIPTION_LIMIT } from '../../constants/book-constants';
import { useRouter, useSearchParams } from 'next/navigation';

export type BookCardProps = {
  bookKey: string;
};

export const accessibleDescription = (description?: string) => {
  if (!description) return;
  const descArray = description.trim().split(/\s+/);
  return descArray.length <= DESCRIPTION_LIMIT
    ? description
    : `${descArray.slice(0, DESCRIPTION_LIMIT).join(' ')}...`;
};

export const BookCard = ({ bookKey }: BookCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;

  const closeDetails = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`)
  };
  
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
          <h2 className={styles.title}>{book.title}</h2>

          {book.author_name && <p>Author(s): {book.author_name.join(', ')}</p>}

          <p>{accessibleDescription(book.description)}</p>
          <button
            onClick={() => closeDetails()}
            className="mb-4 text-indigo-600 hover:text-indigo-900"
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};
