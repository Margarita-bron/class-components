import FiltrationSkeleton from './filtration-loading/FiltrationSkeleton';
import TableSkeleton from './table-loading/TableSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <>
      <FiltrationSkeleton />
      <TableSkeleton />
    </>
  );
}
