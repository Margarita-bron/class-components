import { Suspense } from 'react';
import { BASE_URL, limit } from '../../constants/book-constants';
import { Loading } from '../../ui/Loading';
import { ErrorElement } from '../../ui/ErrorElement';
import { BookCard } from '../../components/book-card/bookCard';
import { Catalog } from '../../components/catalog/Catalog';
import { Pagination } from '../../components/pagination/Pagination';
import { SearchBar } from '../../components/search-bar/SearchBar';
import { Book } from '../../types/book';

async function fetchBooks(query: string, page: string) {
  const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&page={page}`;
  const res = await fetch(url, { next: { revalidate: 120 } });
  if (!res.ok) throw new Error('Fetching books error');
  const data = await res.json();
  return data.docs;
}

async function fetchBookDetails(bookId: string) {
  const url = `${BASE_URL}${bookId}.json`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error('Fetching book details error');
  return res.json();
}

export default async function MainPageCatalog({
  query,
  page,
  details,
}: {
  query?: string;
  page?: string;
  details?: string | null;
}) {
  let books = [];
  let bookDetails = null;
  let errorLoadingBooks = null;
  let errorLoadingDetails = null;

  const queryFromUrl = query || 'book';
  const pageFromUrl = page || '1';
  const detailsKey = details || null;

  try {
    books = await fetchBooks(queryFromUrl, pageFromUrl);
  } catch (error) {
    errorLoadingBooks = error;
  }

  if (detailsKey) {
    try {
      bookDetails = await fetchBookDetails(detailsKey);
    } catch (error) {
      errorLoadingDetails = error;
    }
  }

  return (
    <>
      <div className="app-wrapper">
        <Suspense fallback={<Loading />}>
          <SearchBar currentQuery={queryFromUrl} />
        </Suspense>

        <div
          className={
            bookDetails && !errorLoadingBooks
              ? 'catalog-detail-wrapper'
              : 'catalog-main-wrapper'
          }
        >
          {errorLoadingBooks ? (
            <ErrorElement error={errorLoadingBooks} errorContext="catalog" />
          ) : (
            <Catalog resultData={books} />
          )}
          {bookDetails && !errorLoadingDetails && (
            <BookCard book={bookDetails} />
          )}
        </div>

        <Pagination currentPage={Number(pageFromUrl)} totalPages={10} />
      </div>
    </>
  );
}
