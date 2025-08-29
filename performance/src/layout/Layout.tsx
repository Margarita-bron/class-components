import { Suspense, useState } from 'react';
import SearchBar from '../components/table/filtration/search-bar/SearchBar';
import Table from '../components/table/Table';
export default function Layout() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <Suspense fallback={<div className="spinner">Loading data...</div>}>
        <Table query={query} />
      </Suspense>
    </div>
  );
}
