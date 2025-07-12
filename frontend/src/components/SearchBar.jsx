import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFoodResults } from "../store/slices/foodSlice";
import useNutritionixApi from "../hooks/useNutritionixApi";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { loading, error, instantSearch } = useNutritionixApi();

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const { data, error: apiError } = await instantSearch(searchTerm);
      if (data) {
        dispatch(setFoodResults([...data.common, ...data.branded]));
      } else if (apiError) {
        console.error("Search API Error:", apiError);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box display="flex" gap={2} mb={4}>
      <TextField
        label="Search for food..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />
      <Button variant="contained" onClick={handleSearch} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Search"}
      </Button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </Box>
  );
}

export default SearchBar;
