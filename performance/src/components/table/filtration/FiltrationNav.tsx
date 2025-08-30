import { useState } from 'react';
import type { CountryData } from '../../../types/json';
import FilterSection from './filter-section/FilterSection';
import SearchBar from './search-bar/SearchBar';
import YearSelector from './year-selector/YearSelector';

type FiltrationNavProps = {
  data: CountryData[] | undefined;
  query: string;
  setQuery: (value: string) => void;
  year: number;
  setYear: (value: number) => void;
};

export type SortOption =
  | 'name_asc'
  | 'name_desc'
  | 'population_asc'
  | 'population_desc';

export default function FiltrationNav({
  data,
  query,
  setQuery,
  year,
  setYear,
}: FiltrationNavProps) {
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');
  return (
    <>
      <FilterSection sortOption={sortOption} setSortOption={setSortOption} />
      <SearchBar query={query} setQuery={setQuery} />
      <YearSelector data={data} year={year} setYear={setYear} />
    </>
  );
}
