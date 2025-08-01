import type { Book } from '../../../types/book';

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
  const coverUrl = setCoverUrl(book);
  return (
    <>
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
    </>
  );
};
