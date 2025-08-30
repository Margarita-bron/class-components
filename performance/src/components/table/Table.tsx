import type { CountryData } from '../../types/json';
import './table.css';

type TableProps = {
  data?: CountryData[];
  query: string;
};

export default function Table({ data, query }: TableProps) {
  const filtered = data
    ?.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      const startsWithA = nameA.startsWith(query.trim().toLowerCase());
      const startsWithB = nameB.startsWith(query.trim().toLowerCase());

      if (startsWithA && !startsWithB) return -1;
      if (!startsWithA && startsWithB) return 1;

      return nameA.localeCompare(nameB);
    });
  return (
    <table className="table-auto countries-table-wrapper">
      <thead>
        <tr>
          <th>ISO</th>
          <th className="">Country</th>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>CO2 per capita</th>
        </tr>
      </thead>
      <tbody>
        {filtered &&
          filtered.map((item) => {
            const latest = item.data.at(-1) ?? null;
            return (
              <tr key={item.id}>
                <td>{item.iso_code}</td>
                <td>{item.name}</td>
                {latest !== null && (
                  <>
                    <td> {latest.year ?? 'N/A'}</td>
                    <td>{latest.population ?? 'N/A'}</td>
                    <td> {latest.cement_co2 ?? 'N/A'}</td>
                    <td>{latest.cement_co2_per_capita ?? 'N/A'}</td>
                  </>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
