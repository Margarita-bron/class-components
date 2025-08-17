'use client'
import { ErrorElement } from '../../ui/ErrorElement';
import { Loading } from '../../ui/Loading';
import styles from './book-card.module.css';
import { useGetBookDetailQuery } from '../../redux/services/bookApi';
import { DESCRIPTION_LIMIT } from '../../constants/book-constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Book } from '../../types/book';


export const accessibleDescription = (description?: string|object) => {
  if (!description) return;
  typeof description === 'object' ? 
    description = (description as { value: string }).value : description;
  const descArray = description.trim().split(/\s+/);
  return descArray.length <= DESCRIPTION_LIMIT
    ? description
    : `${descArray.slice(0, DESCRIPTION_LIMIT).join(' ')}...`;
};

export const BookCard = ({ book }) => {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;
  const detailsKey = searchParams.get('details') ?? undefined;

  const closeDetails = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`)
  };

  return (
    <div className="detail-panel border-l border-gray-300 p-4">

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
    </div>
  );
};
