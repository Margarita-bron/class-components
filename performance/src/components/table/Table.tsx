import { useState } from 'react';
import type { CountryData } from '../../types/json';
import './table.css';
import React from 'react';

type TableProps = {
  data?: CountryData[];
  query: string;
  year: number;
};

export default function Table({ data, query, year }: TableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = data
    ?.filter((c) => c.name.toLowerCase().startsWith(query.trim().toLowerCase()))
    .filter((c) => c.data.find((d) => d.year === year))
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
          <th>Country</th>
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
              <React.Fragment key={item.id}>
                <tr onClick={() => toggleExpanded(item.id)}>
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
                {expandedId && (
                  <tr>
                    <td colSpan={6}>
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
                          {item.data.map((yearData) => (
                            <tr key={yearData.year}>
                              <td>{yearData.year}</td>
                              <td>{yearData.population ?? 'N/A'}</td>
                              <td>{yearData.cement_co2 ?? 'N/A'}</td>
                              <td>{yearData.cement_co2_per_capita ?? 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
      </tbody>
    </table>
  );
}
