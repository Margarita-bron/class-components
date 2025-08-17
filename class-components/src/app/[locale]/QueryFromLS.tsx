'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getInitialValueFromLocalStorage } from '../../hooks/utils/get-initial-value-from-local-storage';

export default function QueryInitializer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const query = searchParams.get('query');
    const page = searchParams.get('page');
    const details = searchParams.get('details');

    if (pathname === '/' && !query && !page && !details) {
      const initialValue = getInitialValueFromLocalStorage(
        'searchQuery',
        'book'
      );
      router.replace(`/?query=${encodeURIComponent(initialValue)}&page=1`);
    }
  }, [router, searchParams, pathname]);

  return null;
}
