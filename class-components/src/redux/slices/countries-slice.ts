import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Country = {
  code: string;
  name: string;
};

const initialState: { list: Country[] } = {
  list: [],
};

export const fetchCountries = createAsyncThunk<Country[]>(
  'countries/fetchCountries',
  async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    return data.map((country) => ({
      code: country.cca2,
      name: country.name.common,
    }));
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCountries.fulfilled,
      (state, action: PayloadAction<Country[]>) => {
        state.list = action.payload;
      }
    );
  },
});

export const countriesReducer = countriesSlice.reducer;
