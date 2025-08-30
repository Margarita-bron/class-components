import { Suspense, useState } from 'react';
import Table from '../components/table/Table';
import TableSkeleton from '../loading/table-loading/TableSkeleton';
import FiltrationNav from '../components/table/filtration/FiltrationNav';
import { useCountries } from '../hooks/use-countries-hook';

export type SortOption =
  | 'name_asc'
  | 'name_desc'
  | 'population_asc'
  | 'population_desc';

export default function Layout() {
  const { data: countries } = useCountries();

  const [query, setQuery] = useState('');
  const [year, setYear] = useState(2024);
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');

  return (
    <div>
      <FiltrationNav
        data={countries}
        query={query}
        setQuery={setQuery}
        year={year}
        setYear={setYear}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Suspense fallback={<TableSkeleton />}>
        <Table
          data={countries}
          query={query}
          year={year}
          sortOption={sortOption}
        />
      </Suspense>
    </div>
  );
}
