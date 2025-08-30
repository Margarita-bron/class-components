import { Suspense, useState } from 'react';
import Table from '../components/table/Table';
import TableSkeleton from '../loading/table-loading/TableSkeleton';
import FiltrationNav from '../components/table/filtration/FiltrationNav';
import { useCountries } from '../hooks/use-countries-hook';

export default function Layout() {
  const { data: countries } = useCountries();

  const [query, setQuery] = useState('');
  const [year, setYear] = useState(2024);

  return (
    <div>
      <FiltrationNav
        data={countries}
        query={query}
        setQuery={setQuery}
        year={year}
        setYear={setYear}
      />
      <Suspense fallback={<TableSkeleton />}>
        <Table data={countries} query={query} year={year} />
      </Suspense>
    </div>
  );
}
