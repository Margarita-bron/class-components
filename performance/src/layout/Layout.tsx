import { useState } from 'react';
import Table from '../components/table/Table';
import FiltrationNav from '../components/table/filtration/FiltrationNav';
import { useCountries } from '../hooks/use-countries-hook';
import Modal from '../components/modal/Modal';
import React from 'react';

export type SortOption =
  | 'name_asc'
  | 'name_desc'
  | 'population_asc'
  | 'population_desc';

const MemoizedTable = React.memo(Table);
const MemoizedFiltrationNav = React.memo(FiltrationNav);
const MemoizedModal = React.memo(Modal);

export default function Layout() {
  const { data: countries } = useCountries();

  const [query, setQuery] = useState('');
  const [year, setYear] = useState(2023);
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  return (
    <>
      <MemoizedFiltrationNav
        data={countries}
        query={query}
        setQuery={setQuery}
        year={year}
        setYear={setYear}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setModalOpen={setModalOpen}
      />
      <MemoizedTable
        data={countries}
        query={query}
        year={year}
        sortOption={sortOption}
        selectedFields={selectedFields}
      />
      <MemoizedModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedFields={selectedFields}
        onChange={setSelectedFields}
      />
    </>
  );
}
