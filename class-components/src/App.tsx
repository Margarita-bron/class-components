import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/searchBar/SearchBar';
import { fetchBooks } from './service/books-api';
import type { Book } from './types/books-app-types';
import Catalog from './components/catalog/Catalog';
import ErrorButton from './components/errorButton/ErrorButton';

const App: React.FC = () => {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [resultData, setResultData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentQuery(localStorage.getItem('searchQuery') || '');
    if (currentQuery) {
      handleFetchBooks(currentQuery);
    }
  }, []);

  const handleChangeSearchQuery = async (query: string): Promise<void> => {
    localStorage.setItem('searchQuery', query);
    setCurrentQuery(query);
    handleFetchBooks(query);
  };

  const handleFetchBooks = async (query?: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchBooks(query ?? '');
      setResultData(response.resultData);
      setLoading(false);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        setError(error.message);
      } else {
        setLoading(false);
        setError(String(error));
      }
    }
  };
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
