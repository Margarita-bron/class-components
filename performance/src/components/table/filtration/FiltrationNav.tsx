import type { CountryData } from '../../../types/json';
import FilterSection from './filter-section/FilterSection';
import SearchBar from './search-bar/SearchBar';
import YearSelector from './year-selector/YearSelector';
import type { SortOption } from '../../../layout/Layout';

type FiltrationNavProps = {
  data: CountryData[] | undefined;
  query: string;
  setQuery: (value: string) => void;
  year: number;
  setYear: (value: number) => void;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
};

export default function FiltrationNav({
  data,
  query,
  setQuery,
  year,
  setYear,
  sortOption,
  setSortOption,
}: FiltrationNavProps) {
  return (
    <div className="filtration-section">
      <FilterSection sortOption={sortOption} setSortOption={setSortOption} />
      <SearchBar query={query} setQuery={setQuery} />
      <YearSelector data={data} year={year} setYear={setYear} />
    </div>
  );
}
