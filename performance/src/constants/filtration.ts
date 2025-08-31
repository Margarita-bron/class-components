import type { SortOption } from '../layout/Layout';

export const options: { value: SortOption; label: string }[] = [
  { value: 'name_asc', label: 'Country Name Asc' },
  { value: 'name_desc', label: 'Country Name Desc' },
  { value: 'population_asc', label: 'Population Asc' },
  { value: 'population_desc', label: 'Population Desc' },
];
