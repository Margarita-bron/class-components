import type { CountryData, CountryObject } from '../types/json';

export async function fetchData() {
  try {
    const response = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch CO2 data');
    }
    const data = await response.json();
    const countryData: CountryData[] = Object.entries(
      data as Record<string, CountryObject>
    ).map(([name, countryInfo]) => ({
      id: crypto.randomUUID(),
      name: name,
      iso_code: countryInfo.iso_code ?? 'N/A',
      data: countryInfo.data ?? [],
    }));
    return countryData;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCountryData(country: string) {
  try {
    const response = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch CO2 data');
    }
    const data = await response.json();
    const countryData = data[country];
    return countryData;
  } catch (error) {
    console.error(error);
  }
}
