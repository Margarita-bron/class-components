import type { CountryData } from '../../../types/json';
import SearchBar from './search-bar/SearchBar';
import YearSelector from './year-selector/YearSelector';

type FiltrationNavProps = {
  data: CountryData[] | undefined;
  query: string;
  setQuery: (value: string) => void;
  year: number;
  setYear: (value: number) => void;
};

export default function FiltrationNav({
  data,
  query,
  setQuery,
  year,
  setYear,
}: FiltrationNavProps) {
  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <YearSelector data={data} year={year} setYear={setYear} />
    </>
  );
}
