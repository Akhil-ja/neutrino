import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  searchInstant,
  getNaturalNutrients,
  getItemById,
} from "../services/nutritionixApi";
import { showError } from "../store/slices/errorSlice";

const useNutritionixApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const execute = useCallback(
    async (apiCall, ...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCall(...args);
        setLoading(false);

        const normalizeNutrients = (food) => ({
          ...food,
          common_type:
            food.common_type || (food.nix_item_id ? "branded" : "common"),
          nf_calories: food.nf_calories || 0,
          nf_protein: food.nf_protein || 0,
          nf_total_carbohydrate: food.nf_total_carbohydrate || 0,
          nf_total_fat: food.nf_total_fat || 0,
        });

        if (response && response.foods) {
          response.foods = response.foods.map(normalizeNutrients);
        }

        return { data: response, error: null };
      } catch (err) {
        setLoading(false);
        setError(err);
        dispatch(showError(err.message));
        return { data: null, error: err };
      }
    },
    [dispatch]
  );

  const instantSearch = useCallback(
    (query) => execute(searchInstant, query),
    [execute]
  );
  const naturalNutrients = useCallback(
    (query) => execute(getNaturalNutrients, query),
    [execute]
  );
  const itemById = useCallback(
    (itemId) => execute(getItemById, itemId),
    [execute]
  );

  return { loading, error, instantSearch, naturalNutrients, itemById };
};

export default useNutritionixApi;
