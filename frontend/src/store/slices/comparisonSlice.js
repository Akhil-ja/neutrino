import { createSlice } from '@reduxjs/toolkit';

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState: {
    food1: null,
    food2: null,
  },
  reducers: {
    setFood1: (state, action) => {
      state.food1 = action.payload;
    },
    setFood2: (state, action) => {
      state.food2 = action.payload;
    },
    clearFood1: (state) => {
      state.food1 = null;
    },
    clearFood2: (state) => {
      state.food2 = null;
    },
  },
});

export const { setFood1, setFood2, clearFood1, clearFood2 } = comparisonSlice.actions;
export default comparisonSlice.reducer;
