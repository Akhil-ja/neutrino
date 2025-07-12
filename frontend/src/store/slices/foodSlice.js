import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foodResults: [],
    selectedFood: null,
    sortBy: "name_asc",
    filterType: "all",
  },
  reducers: {
    setFoodResults: (state, action) => {
      state.foodResults = action.payload;
    },
    setSelectedFood: (state, action) => {
      state.selectedFood = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const { setFoodResults, setSelectedFood, setSortBy, setFilterType } =
  foodSlice.actions;
export default foodSlice.reducer;
