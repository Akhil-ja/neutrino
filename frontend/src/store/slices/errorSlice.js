import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    message: null,
    open: false,
  },
  reducers: {
    showError: (state, action) => {
      state.message = action.payload;
      state.open = true;
    },
    hideError: (state) => {
      state.message = null;
      state.open = false;
    },
  },
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;
