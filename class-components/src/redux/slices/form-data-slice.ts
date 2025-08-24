import { init } from 'next/dist/compiled/@vercel/og/satori';
import { IFormInput, IFormInputRecord } from '../../types/form';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormDataState = {
  records: IFormInputRecord[];
  lastAddedId?: string | null;
};

const initialState: FormDataState = {
  records: [],
  lastAddedId: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormRecord(state, action: PayloadAction<IFormInputRecord>) {
      state.records.push(action.payload);
      state.lastAddedId = action.payload.id;
    },
  },
});

export const { addFormRecord } = formDataSlice.actions;
export const formDataReducer = formDataSlice.reducer;
