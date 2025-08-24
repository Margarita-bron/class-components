'use client';
import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from './services/bookApi';
import { selectedBooksReducer } from './slices/selected-books-slice';
import { countriesReducer } from './slices/countries-slice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    selectedBooks: selectedBooksReducer,
    countries: countriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
