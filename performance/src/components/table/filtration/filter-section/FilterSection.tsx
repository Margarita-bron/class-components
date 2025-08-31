import { options } from '../../../../constants/filtration';
import type { SortOption } from '../../../../layout/Layout';

type FilterSectionProps = {
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
};

export default function FilterSection({
  sortOption,
  setSortOption,
}: FilterSectionProps) {
  return (
    <>
      <span>Sort by</span>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value as SortOption)}
      >
        <option value="" disabled>
          Sort by
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
