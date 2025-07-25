import React, { useEffect, useState, type ChangeEvent } from 'react';
import './search-bar.css';
import type { SearchBarProps } from '../../types/search-bar-types.ts';

const SearchBar: React.FC<SearchBarProps> = ({
  currentQuery,
  handleChangeSearchQuery,
}) => {
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

export default SearchBar;
