'use client';

import {
  useFormDataSelector,
  useLastAddedIdSelector,
} from '../../../redux/selectors/form-data-selector';
import { useEffect, useState } from 'react';
import styles from './form-records.module.css';
import classes from 'classnames';

export default function FormRecords() {
  const records = useFormDataSelector();
  const lastAddedId = useLastAddedIdSelector();

  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (lastAddedId) {
      setHighlightedId(lastAddedId);
      const timeout = setTimeout(() => setHighlightedId(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [lastAddedId]);

  return (
    <div className={classes(styles.records, 'mt-6 overflow-x-auto')}>
      <table className="min-w-full rounded-lg border border-gray-300 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Age
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Gender
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Country
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((entry, index) => (
            
            <tr
              key={entry.id}
              className={classes(
                'transition-colors duration-500',
                'bg-white',
                entry.id === highlightedId ? styles.highlighted : ''
              )}
            >
              <td className="border-t border-gray-200 px-4 py-2">
                {entry.name}
              </td>
              <td className="border-t border-gray-200 px-4 py-2">
                {entry.age}
              </td>
              <td className="border-t border-gray-200 px-4 py-2">
                {entry.email}
              </td>
              <td className="border-t border-gray-200 px-4 py-2">
                {entry.gender}
              </td>
              <td className="border-t border-gray-200 px-4 py-2">
                {entry.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
