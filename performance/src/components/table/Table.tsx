import { Suspense, useState } from 'react';
import type { CountryData } from '../../types/json';
import './table.module.css';
import React from 'react';
import type { SortOption } from '../../layout/Layout';
import TableSkeleton from '../../loading/table-loading/TableSkeleton';

type TableProps = {
  data?: CountryData[];
  query: string;
  sortOption: SortOption;
  year: number;
};

export default function Table({
  data,
  query,
  sortOption,
  year = 2023,
}: TableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = data
    ?.filter((c) => c.name.toLowerCase().startsWith(query.trim().toLowerCase()))
    .filter((c) => c.data.find((d) => d.year === year))
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => {
      if (sortOption === 'name_asc' || sortOption === 'name_desc') {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return (
          nameA.localeCompare(nameB) * (sortOption === 'name_asc' ? 1 : -1)
        );
      } else {
        const popA = a.data.find((d) => d.year === year)?.population ?? 0;
        const popB = b.data.find((d) => d.year === year)?.population ?? 0;
        return (popA - popB) * (sortOption === 'population_asc' ? 1 : -1);
      }
    });

  return (
    <table className="table-auto table-wrapper">
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
        {!filtered && <Suspense fallback={<TableSkeleton />}></Suspense>}
        {filtered &&
          filtered.map((item) => {
            const displayedYear = year
              ? item.data.find((d) => d.year === year)
              : item.data.at(-1);
            return (
              <React.Fragment key={item.id}>
                <tr onClick={() => toggleExpanded(item.id)}>
                  <td>{item.iso_code}</td>
                  <td>{item.name}</td>
                  {displayedYear && (
                    <>
                      <td> {displayedYear.year ?? 'N/A'}</td>
                      <td>{displayedYear.population ?? 'N/A'}</td>
                      <td> {displayedYear.cement_co2 ?? 'N/A'}</td>
                      <td>{displayedYear.cement_co2_per_capita ?? 'N/A'}</td>
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
