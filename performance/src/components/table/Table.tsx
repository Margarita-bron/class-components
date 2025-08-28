import { fetchData } from '../../json/json-parse';
import type { CountryData } from '../../types/json';
import { useEffect, useState } from 'react';
import './table.css';

export default function Table() {
  const [data, setData] = useState<CountryData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data: CountryData[] = (await fetchData()) ?? [];
        setData(data);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (error) return <>error</>;

  return (
    <table className="table-auto countries-table-wrapper">
      <thead>
        <tr>
          <th className="">Name</th>
          <th>ISO</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        {loading && <>Loading..</>}
        {data.length > 0 &&
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.iso_code}</td>
              <td>
                {item.data.length > 0
                  ? item.data[item.data.length - 1].population
                  : 'N/A'}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
