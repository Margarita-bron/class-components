import './table-loading.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function TableSkeleton() {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
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
              <th>
                <Skeleton width={40} />
              </th>
              <th>
                <Skeleton width={100} />
              </th>
              <th>
                <Skeleton width={50} />
              </th>
              <th>
                <Skeleton width={80} />
              </th>
              <th>
                <Skeleton width={60} />
              </th>
              <th>
                <Skeleton width={90} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </SkeletonTheme>
  );
}
