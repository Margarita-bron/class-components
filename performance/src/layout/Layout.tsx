import { Suspense, use, useState } from 'react';
import Table from '../components/table/Table';
import TableSkeleton from '../loading/table-loading/TableSkeleton';
import FiltrationNav from '../components/table/filtration/FiltrationNav';
import { fetchData } from '../json/json-parse';

const dataPromise = fetchData();

export default function Layout() {
  const countries = use(dataPromise);
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
        <Table data={countries} query={query} />
      </Suspense>
    </div>
  );
}
