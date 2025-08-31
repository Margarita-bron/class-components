import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchData } from '../json/json-parse';
import type { CountryData } from '../types/json';

export function useCountries() {
  const result = useSuspenseQuery<CountryData[]>({
    queryKey: ['countries'],
    queryFn: fetchData,
  });
  console.log('Loading state:', !result.data);
  return result;
}
