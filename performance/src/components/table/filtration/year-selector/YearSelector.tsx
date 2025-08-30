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
    <select defaultValue={year}>
      {yearArray ? (
        <>
          {yearArray.map((item) => {
            <option key={item} onChange={() => setYear(item)}>
              {item}
            </option>;
          })}
        </>
      ) : (
        <p>loading..</p>
      )}
    </select>
  );
}
