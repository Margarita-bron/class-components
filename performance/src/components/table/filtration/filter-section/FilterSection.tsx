import type { SortOption } from '../FiltrationNav';

type FilterSectionProps = {
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
};

const options: { value: SortOption; label: string }[] = [
  { value: 'name_asc', label: 'Country Name Asc' },
  { value: 'name_desc', label: 'Country Name Desc' },
  { value: 'population_asc', label: 'Population Asc' },
  { value: 'population_desc', label: 'Population Desc' },
];

export default function FilterSection({
  sortOption,
  setSortOption,
}: FilterSectionProps) {
  return (
    <>
      <span>Choose a year</span>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value as SortOption)}
      >
        <option value="" disabled>
          Sort
        </option>
        <>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </>
      </select>
    </>
  );
}
