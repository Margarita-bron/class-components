import { useDispatch, useSelector } from 'react-redux';
import type { Book } from '../../../types/book';
import type { RootState } from '../../../store/store';
import { toggleItem } from '../../../store/selectedBooksSlice';

const setCoverUrl = (book: Book) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : undefined;
  return coverUrl;
};

type Props = {
  book: Book;
  onSelectItem: (key: string) => void;
};
export const BookItem = ({ book, onSelectItem }: Props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedBooks.books
  );
  const isSelected = selectedItems.some((item) => item.id === book.key);

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        className="book-item-checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        style={{ marginRight: 8 }}
      />
      <div className="catalog-item" onClick={() => onSelectItem(book.key)}>
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
