import { Suspense } from 'react';
import { Loading } from '../../ui/Loading';
import MainPageCatalog from './MainPageCatalog';

export type pageParams = {
  query: string;
  page: string;
  details: string | null;
};

export async function generateStaticParams() {
  return [{ query: 'book', page: '1', details: null }];
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
    details?: string | null;
  }>;
}) {
  const params = await searchParams;
  const query = params.query ?? 'book';
  const page = params.page ?? '1';
  const details = params.details ?? null;

  return (
    <Suspense fallback={<Loading />}>
      <MainPageCatalog query={query} page={page} details={details} />
    </Suspense>
  );
}
