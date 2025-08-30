import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchData } from '../json/json-parse';
import type { CountryData } from '../types/json';

export function useCountries() {
  return useSuspenseQuery<CountryData[]>({
    queryKey: ['countries'],
    queryFn: fetchData,
  });
}
