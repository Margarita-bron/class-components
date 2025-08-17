'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getInitialValueFromLocalStorage } from '../hooks/utils/get-initial-value-from-local-storage';

export default function QueryInitializer() {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) {
      const initialValue = getInitialValueFromLocalStorage(
        'searchQuery',
        'book'
      );
      router.replace(`/?query=${encodeURIComponent(initialValue)}&page=1`);
    }
  }, [router, searchParams]);

  return null;
}
