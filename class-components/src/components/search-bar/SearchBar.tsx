import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import './search-bar.css';
import { Theme, ThemeContext } from '../../context/theme-context';
import classes from 'classnames';
import '../../index.css';

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
  const { themeStyle } = useContext(ThemeContext);

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
    <div
      className={classes('search-wrapper', {
        'search-wrapper__theme-light': themeStyle ==== Theme.Light,
        'search-wrapper__theme-dark': themeStyle ==== Theme.Dark,
      })}
    >
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
