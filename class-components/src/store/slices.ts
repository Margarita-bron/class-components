import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Item = {
  id: string; // уникальный id
  name: string;
  description?: string;
  detailUrl?: string;
};

interface SelectedItemsState {
  items: Item[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Item>) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        // Если есть — убираем из выбранных
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        // Если нет — добавляем
        state.items.push(action.payload);
      }
    },
    clearAll: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItem, clearAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
