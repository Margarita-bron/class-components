import type { YearCO2Stats } from '../../../../types/json';

type AdditionalTableProps = {
  item: YearCO2Stats[];
};

export default function AdditionalTable({ item }: AdditionalTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>CO2 per capita</th>
        </tr>
      </thead>
      <tbody>
        {item.map((yearData: YearCO2Stats) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{yearData.population ?? 'N/A'}</td>
            <td>{yearData.cement_co2 ?? 'N/A'}</td>
            <td>{yearData.cement_co2_per_capita ?? 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
