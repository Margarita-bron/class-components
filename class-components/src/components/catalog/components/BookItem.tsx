'use client'
import type { Book } from '../../../types/book';
import { toggleItem } from '../../../redux/selected-books/selected-books-slice';
import './book-item.css';
import { useSelectedBooksSelector } from '../../../redux/selectors/selected-books-selector';
import { useAppDispatch } from '../../../hooks/typed-react-redux-hooks';
import { useRouter, useSearchParams } from 'next/navigation';

const setCoverUrl = (book: Book) => {
  try {
    return book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : undefined;
  } catch (error) {
    console.error(error);
  }
};

type Props = {
  book: Book;
};

export const BookItem = ({ book }: Props) => {
  const dispatch = useAppDispatch();
  const selectedItems = useSelectedBooksSelector();
  const isSelected = selectedItems.some((item) => item.id === book.key);

  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;

  const openDetails = (key: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', key);
    router.push(`/?${params.toString()}`)
  };
  

  const handleCheckboxChange = () => {
    dispatch(
      toggleItem({
        id: book.key,
        name: book.title,
        description: book.description,
        detailUrl: book.key,
      })
    );
  };
  const coverUrl = setCoverUrl(book);
  return (
    <div className="book-item">
      <input
        type="checkbox"
        className="book-item-checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        style={{ marginRight: 8 }}
      />
      <div className="catalog-item" onClick={() => openDetails(book.key)}>
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
          {book.author_name && <p>Author(s): {book.author_name.join(', ')}</p>}
          {book.description && (
            <p>
              <em>Description:</em> {book.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
