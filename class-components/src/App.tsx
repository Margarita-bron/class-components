import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from './components/searchBar/SearchBar';
import { fetchBooks } from './service/books-api';
import type { Book } from './types/books-app-types';
import Catalog from './components/catalog/Catalog';
import ErrorButton from './components/errorButton/ErrorButton';
import { useLocalStorage } from './__hooks__/useLocalStorage';
import Header from './components/header/Header';
import './assets/styles/index.ts';
import { useSearchParams } from 'react-router-dom';
import Pagination from './components/pagination/pagination.tsx';

const App: React.FC = () => {
  const [currentQuery, setCurrentQuery] = useLocalStorage<string>(
    'searchQuery',
    'book'
  );
  const [resultData, setResultData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, [pageFromUrl]);

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

  useEffect(() => {
    if (currentQuery) {
      handleFetchBooks(currentQuery, currentPage);
      setSearchParams((urlPage) => {
        if (currentPage === 1) {
          urlPage.delete('page');
        } else {
          urlPage.set('page', currentPage.toString());
        }
        return urlPage;
      });
    }
  }, [currentQuery, currentPage]);

  const onPageChange = (page: number): void => {
    if (page >= 1) {
      setCurrentPage(page);
    }
  };

  const handleChangeSearchQuery = async (query: string): Promise<void> => {
    setCurrentQuery(query);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="app-wrapper">
        <SearchBar
          currentQuery={currentQuery}
          handleChangeSearchQuery={handleChangeSearchQuery}
        />

        <Catalog resultData={resultData} loading={loading} error={error} />
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={onPageChange}
          loading={loading}
        />
        <ErrorButton />
      </div>
    </>
  );
};

export default App;
