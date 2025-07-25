import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from './components/searchBar/SearchBar';
import { fetchBooks } from './service/books-api';
import type { Book } from './types/books-app-types';
import Catalog from './components/catalog/Catalog';
import ErrorButton from './components/errorButton/ErrorButton';
import { useLocalStorage } from './__hooks__/useLocalStorage';

const App: React.FC = () => {
  const [currentQuery, setCurrentQuery] = useLocalStorage<string>(
    'searchQuery',
    'book'
  );
  const [resultData, setResultData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentQuery) {
      handleFetchBooks(currentQuery);
    }
  }, []);

  const handleChangeSearchQuery = async (query: string): Promise<void> => {
    setCurrentQuery(query);
    await handleFetchBooks(query);
  };

  const handleFetchBooks = useCallback(
    async (query?: string): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchBooks(query ?? '');
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

  return (
    <div className="app-wrapper">
      <SearchBar
        currentQuery={currentQuery}
        handleChangeSearchQuery={handleChangeSearchQuery}
      />

      <Catalog resultData={resultData} loading={loading} error={error} />

      <ErrorButton />
    </div>
  );
};

export default App;
