import { Fragment } from 'react/jsx-runtime';
import { fetchData } from '../../json/json-parse';
import type { CountryData } from '../../types/json';

export default async function Table() {
  const data: CountryData[] = (await fetchData()) ?? [];

  return (
    <table>
      <thead>
        <th></th>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((item) => (
            <Fragment key={item.id}>
              <td>{item.name}</td>
              <td>{item.iso_code}</td>
              <td>{item.data}</td>
            </Fragment>
          ))}
      </tbody>
    </table>
  );
}
