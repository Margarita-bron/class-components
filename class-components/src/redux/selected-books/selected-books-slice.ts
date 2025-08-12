import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SelectedBook = {
  id: string;
  name: string;
  description?: string;
  detailUrl?: string;
};

export type SelectedBooksState = {
  books: SelectedBook[];
};

const initialState: SelectedBooksState = {
  books: [],
};

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<SelectedBook>) => {
      const exists = state.books.find((i) => i.id ==== action.payload.id);
      if (exists) {
        state.books = state.books.filter((i) => i.id !=== action.payload.id);
      } else {
        state.books.push(action.payload);
      }
    },
    clearAll: (state) => {
      state.books = [];
    },
  },
});

export const { toggleItem, clearAll } = selectedBooksSlice.actions;
export const selectedBooksReducer = selectedBooksSlice.reducer;
