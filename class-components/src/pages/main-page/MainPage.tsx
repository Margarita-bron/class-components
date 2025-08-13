import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/use-local-storage.ts';
import { BookCard } from '../../components/book-card/bookCard.tsx';
import { Pagination } from '../../components/pagination/Pagination.tsx';
import { SearchBar } from '../../components/search-bar/SearchBar.tsx';
import { Catalog } from '../../components/catalog/Catalog.tsx';
import { getInitialValueFromLocalStorage } from '../../hooks/utils/get-initial-value-from-local-storage.ts';
import { Modal } from './components/modal/Modal.tsx';
import type { Nullable } from '../../types/common.ts';
import { useGetBooksQuery } from '../../redux/services/bookApi.ts';
import { limit } from '../../constants/book-constants.ts';

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValue = getInitialValueFromLocalStorage('searchQuery', 'book');
  const [currentQuery, setCurrentQuery] = useLocalStorage<string>(
    'searchQuery',
    initialValue
  );
  const queryFromUrl = searchParams.get('query') || initialValue;

  const pageFromUrl = Number(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const detailsKey = searchParams.get('details') || null;
  const [selectedDetail, setSelectedDetail] =
    useState<Nullable<string>>(detailsKey);

  const {
    data: books = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetBooksQuery({ query: currentQuery, limit, page: currentPage });

  useEffect(() => {
    if (queryFromUrl !== currentQuery) {
      setCurrentQuery(queryFromUrl);
      setCurrentPage(1);
    }
  }, [queryFromUrl]);

  useEffect(() => {
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, [pageFromUrl]);

  useEffect(() => {
    if (detailsKey !== selectedDetail) {
      setSelectedDetail(detailsKey);
    }
  }, [detailsKey]);

  const pageUrlParams = (currentPage: number): URLSearchParams => {
    const params = new URLSearchParams();
    params.set('query', currentQuery);
    if (currentPage !== 1) {
      params.set('page', currentPage.toString());
    }
    if (selectedDetail) params.set('details', selectedDetail);
    setSearchParams(params, { replace: true });
    return params;
  };

  useEffect(() => {
    if (!currentQuery) return;
    pageUrlParams(currentPage);
  }, [currentQuery, currentPage]);

  const openDetails = (key: string): void => {
    setSelectedDetail(key);
    pageUrlParams(currentPage);
  };

  const closeDetails = (): void => {
    setSelectedDetail('');
    pageUrlParams(currentPage);
  };

  const onPageChange = (page: number): void => {
    if (page >= 1) setCurrentPage(page);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeDetails();
  };

  const handleChangeSearchQuery = async (query: string): Promise<void> => {
    setCurrentQuery(query);
    setCurrentPage(1);
  };

  return (
    <>
      <div
        className="app-wrapper"
        onClick={selectedDetail ? handleOutsideClick : undefined}
      >
        <SearchBar
          currentQuery={currentQuery}
          handleChangeSearchQuery={handleChangeSearchQuery}
        />
        {!isFetching && !isLoading && !error && (
          <button onClick={() => refetch()} disabled={isLoading}>
            <p>Update data...</p>
          </button>
        )}
        <div
          className={
            selectedDetail && !error
              ? 'catalog-detail-wrapper'
              : 'catalog-main-wrapper'
          }
        >
          <Catalog
            resultData={books}
            loading={isLoading}
            error={error}
            onSelectItem={openDetails}
            isFetching={isFetching}
          />
          {selectedDetail && !error && (
            <BookCard bookKey={selectedDetail} onClose={closeDetails} />
          )}
        </div>

        {!isLoading && !error && !isFetching && (
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={onPageChange}
          />
        )}
        <Modal />
      </div>
    </>
  );
};
