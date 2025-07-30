import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../__hooks__/useLocalStorage.ts';
import BookCard from '../components/bookCard/bookCard.tsx';
import Catalog from '../components/catalog/Catalog.tsx';
import Pagination from '../components/pagination/Pagination.tsx';
import SearchBar from '../components/searchBar/SearchBar.tsx';
import { fetchBooks } from '../service/books-api.ts';
import type { Book } from '../types/books-app-types.ts';

const MainPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentQuery, setCurrentQuery] = useLocalStorage<string>(
    'searchQuery',
    'book'
  );
  const queryFromUrl = searchParams.get('query') || currentQuery;

  const [resultData, setResultData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageFromUrl = Number(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const detailsKey = searchParams.get('details') || null;
  const [selectedDetail, setSelectedDetail] = useState<string | null>(
    detailsKey
  );

  useEffect(() => {
    if (searchParams.get('query') !== currentQuery) {
      setCurrentQuery(queryFromUrl);
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

  const handleFetchBooks = useCallback(
    async (query: string, page: number): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchBooks(query, page);
        setResultData(response.resultData);
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
    },
    []
  );

  const pageUrlParams = (
    url: URLSearchParams,
    currentPage: number
  ): URLSearchParams => {
    const params = new URLSearchParams();
    params.set('query', currentQuery);
    if (currentPage !== 1) {
      params.set('page', currentPage.toString());
    }
    const details = url.get('details');
    if (details) {
      params.set('details', details);
    }

    return params;
  };

  useEffect(() => {
    if (!currentQuery) return;
    handleFetchBooks(currentQuery, currentPage);
    setSearchParams((url) => {
      return pageUrlParams(url, currentPage);
    });
  }, [currentQuery, currentPage, selectedDetail, setSearchParams]);

  const openDetails = (key: string): void => {
    setSearchParams((url) => {
      url.set('details', key);
      return pageUrlParams(url, currentPage);
    });
  };

  const closeDetails = (): void => {
    setSearchParams((url) => {
      url.delete('details');
      return pageUrlParams(url, currentPage);
    });
  };

  const onPageChange = (page: number): void => {
    if (page >= 1) {
      setCurrentPage(page);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeDetails();
    }
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

        <div className={selectedDetail ? 'catalog-detail-wrapper' : ''}>
          <Catalog
            resultData={resultData}
            loading={loading}
            error={error}
            onSelectItem={openDetails}
          />
          {selectedDetail && (
            <BookCard bookKey={selectedDetail} onClose={closeDetails} />
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={onPageChange}
          loading={loading}
        />
      </div>
    </>
  );
};

export default MainPage;
