import { availableFields } from '../../../../constants/table';
import type { YearCO2Stats } from '../../../../types/json';

type AdditionalTableProps = {
  item: YearCO2Stats[];
  selectedFields: string[];
};

export default function AdditionalTable({
  item,
  selectedFields,
}: AdditionalTableProps) {
  const sortByYear = item.sort((a, b) => b.year - a.year);
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>CO2 per capita</th>
          {selectedFields.map((field) => {
            const label =
              availableFields.find((f) => f.value === field)?.label ?? field;
            return <th key={field}>{label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {sortByYear.map((yearData: YearCO2Stats) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{yearData.population ?? 'N/A'}</td>
            <td>{yearData.cement_co2 ?? 'N/A'}</td>
            <td>{yearData.cement_co2_per_capita ?? 'N/A'}</td>
            {selectedFields.map((field) => (
              <td key={field}>
                {yearData[field as keyof typeof yearData] ?? 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
