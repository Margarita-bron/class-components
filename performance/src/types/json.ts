export type CountryObject = {
  iso_code: string;
  data: YearCO2Stats[];
};

export type CountryData = {
  id: string;
  name: string;
  iso_code: string;
  data: YearCO2Stats[];
};

export type YearCO2Stats = {
  year: number;
  population?: number;
  cement_co2: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  coal_co2?: number;
  gas_co2?: number;
  co2_growth_prct?: number;
};
