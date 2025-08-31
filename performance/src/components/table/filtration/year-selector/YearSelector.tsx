import { getAllYears } from '../additional-functions/get-all-years';
import type { CountryData } from '../../../../types/json';

export type YearSelectorProps = {
  data: CountryData[] | undefined;
  year: number;
  setYear: (value: number) => void;
};

export default function YearSelector({
  data,
  year,
  setYear,
}: YearSelectorProps) {
  const yearArray: number[] | undefined = getAllYears(data);

  return (
    <>
      <span>Choose a year</span>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        <option value="" disabled>
          year
        </option>
        {yearArray && (
          <>
            {yearArray.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </>
        )}
      </select>
    </>
  );
}
