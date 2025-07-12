import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNaturalNutrients,
  getItemById,
} from "../../services/nutritionixApi";

export const fetchProteinForFood = createAsyncThunk(
  "food/fetchProteinForFood",
  async (food) => {
    let protein = 0;
    if (food.nix_item_id) {
      const response = await getItemById(food.nix_item_id);
      if (response.foods && response.foods.length > 0) {
        protein = response.foods[0].nf_protein || 0;
      }
    } else {
      const response = await getNaturalNutrients(food.food_name);
      if (response.foods && response.foods.length > 0) {
        protein = response.foods[0].nf_protein || 0;
      }
    }
    return {
      food_name: food.food_name,
      nix_item_id: food.nix_item_id,
      nf_protein: protein,
    };
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foodResults: [],
    selectedFood: null,
    sortBy: "name_asc",
    filterType: "all",
    proteinFetching: {},
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteinForFood.pending, (state, action) => {
        const foodId = action.meta.arg.nix_item_id || action.meta.arg.food_name;
        state.proteinFetching[foodId] = true;
      })
      .addCase(fetchProteinForFood.fulfilled, (state, action) => {
        const { food_name, nix_item_id, nf_protein } = action.payload;
        const foodId = nix_item_id || food_name;
        state.proteinFetching[foodId] = false;
        const index = state.foodResults.findIndex(
          (food) =>
            (food.nix_item_id === nix_item_id && nix_item_id) ||
            (food.food_name === food_name && !nix_item_id)
        );
        if (index !== -1) {
          state.foodResults[index].nf_protein = nf_protein;
        }
      })
      .addCase(fetchProteinForFood.rejected, (state, action) => {
        const foodId = action.meta.arg.nix_item_id || action.meta.arg.food_name;
        state.proteinFetching[foodId] = false;
        console.error("Failed to fetch protein for food:", action.error);
      });
  },
});

export const { setFoodResults, setSelectedFood, setSortBy, setFilterType } =
  foodSlice.actions;
export default foodSlice.reducer;
