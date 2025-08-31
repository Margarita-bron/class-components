import { useState } from 'react';
import Table from '../components/table/Table';
import FiltrationNav from '../components/table/filtration/FiltrationNav';
import { useCountries } from '../hooks/use-countries-hook';
import Modal from '../components/modal/Modal';

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

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  return (
    <>
      <FiltrationNav
        data={countries}
        query={query}
        setQuery={setQuery}
        year={year}
        setYear={setYear}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setModalOpen={setModalOpen}
      />
      <Table
        data={countries}
        query={query}
        year={year}
        sortOption={sortOption}
        selectedFields={selectedFields}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedFields={selectedFields}
        onChange={setSelectedFields}
      />
    </>
  );
}
