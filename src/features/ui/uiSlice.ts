// src/features/ui/uiSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Filter = 'all' | 'todo' | 'done';

interface UiState { filter: Filter; }
const initialState: UiState = { filter: 'all' };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = uiSlice.actions;
export default uiSlice.reducer;