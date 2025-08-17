'use client';
import { useEffect, useState, type ChangeEvent } from 'react';
import './search-bar.css';
import classes from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export type SearchBarProps = {
  currentQuery: string;
};

export type SearchBarState = {
  query: string;
};

export const SearchBar = ({ currentQuery }: SearchBarProps) => {
  const t = useTranslations('MainPage');
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;

  const [query, setQuery] = useState(currentQuery);

  const handleQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearchButton = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', query);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div
      className={classes(
        'search-wrapper search-wrapper__theme-light dark:search-wrapper__theme-dark'
      )}
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
        {t('Search.searchButton')}
      </button>
    </div>
  );
};
