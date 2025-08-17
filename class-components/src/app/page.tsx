import { Suspense } from 'react';
import { Loading } from '../ui/Loading';
import MainPageCatalog from './MainPageCatalog';

export type pageParams = {
  query: string;
  page: string;
  details: string | null;
}

export async function generateStaticParams() {
  return [
    { query: 'book', page: '1', details: null }
  ];
}
export default function Page({
  searchParams,
}: {
  searchParams: { query?: string; page?: string; details?: string | null };
}) {
  const query = searchParams.query ?? 'book';
  const page = searchParams.page ?? '1';
  const details = searchParams.details ?? null;

  return (
    <Suspense fallback={<Loading />}>
      <MainPageCatalog query={query} page={page} details={details} />
    </Suspense>
  );
}
