import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./slices/foodSlice";
import comparisonReducer from "./slices/comparisonSlice";
import errorReducer from "./slices/errorSlice";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    comparison: comparisonReducer,
    error: errorReducer,
  },
});
