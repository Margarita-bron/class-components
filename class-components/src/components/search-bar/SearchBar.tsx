import { useEffect, useState, type ChangeEvent } from 'react';
import './search-bar.css';

export type SearchBarProps = {
  currentQuery: string;
  handleChangeSearchQuery: (_query: string) => void;
};

export type SearchBarState = {
  query: string;
};

export const SearchBar = ({
  currentQuery,
  handleChangeSearchQuery,
}: SearchBarProps) => {
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearchButton = (): void => {
    const pureQuery = query.trim();
    handleChangeSearchQuery(pureQuery);
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        name="Search Books Input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQuery}
      />
      <button className="search-button" onClick={handleSearchButton}>
        Search
      </button>
    </div>
  );
};
