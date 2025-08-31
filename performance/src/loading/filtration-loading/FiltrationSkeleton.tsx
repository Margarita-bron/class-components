import Skeleton from 'react-loading-skeleton';

export default function FiltrationSkeleton() {
  return (
    <div className="filtration-section">
      <span>Sort by</span>
      <Skeleton width={100} />
      <div>
        <label htmlFor="search">Search</label>
        <Skeleton width={200} />
      </div>
      <span>Choose a year</span>
      <Skeleton width={50} />
      <button disabled>Add additional fields</button>
    </div>
  );
}
