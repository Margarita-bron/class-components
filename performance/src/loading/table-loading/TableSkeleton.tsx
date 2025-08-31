import './table-loading.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function TableSkeleton() {
  return (
    <SkeletonTheme>
      <table className="skeleton table-auto countries-table-wrapper">
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
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <td key={colIndex}>
                  <Skeleton height={20} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SkeletonTheme>
  );
}
