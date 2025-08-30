import type { CountryData } from '../../../../types/json';

export function getAllYears(countries?: CountryData[]): number[] | undefined {
  if (countries) {
    const allYears = new Set<number>();
    Object.values(countries).forEach((countryData) => {
      countryData.data.forEach((entry) => {
        if (entry.year !== undefined) allYears.add(entry.year);
      });
    });
    return Array.from(allYears).sort((a, b) => a - b);
  }
}
