import { useState, useCallback } from "react";
import {
  searchInstant,
  getNaturalNutrients,
  getItemById,
} from "../services/nutritionixApi";

const useNutritionixApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(...args);
      setLoading(false);

      if (apiCall === getNaturalNutrients && response && response.foods) {
        response.foods = response.foods.map((food) => ({
          ...food,
          common_type:
            food.common_type || (food.nix_item_id ? "branded" : "common"),
          nf_protein: food.nf_protein || 0,
        }));
      }

      return { data: response, error: null };
    } catch (err) {
      setLoading(false);
      setError(err);
      return { data: null, error: err };
    }
  }, []);

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
