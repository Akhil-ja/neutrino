import React, { useMemo, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortBy,
  setFilterType,
  fetchProteinForFood,
} from "../store/slices/foodSlice";

function FoodSearchPage() {
  const dispatch = useDispatch();

  const { foodResults, sortBy, filterType } = useSelector(
    (state) => state.food
  );

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    dispatch(setSortBy(newSortBy));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilterType(event.target.value));
  };

  const filteredAndSortedFood = useMemo(() => {
    let filtered = foodResults;

    if (filterType === "common") {
      filtered = filtered.filter((food) => !food.nix_item_id);
    } else if (filterType === "branded") {
      filtered = filtered.filter((food) => food.nix_item_id);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name_asc") {
        return a.food_name.localeCompare(b.food_name);
      } else if (sortBy === "name_desc") {
        return b.food_name.localeCompare(a.food_name);
      } else if (sortBy === "brand_asc") {
        const brandA = a.brand_name || "";
        const brandB = b.brand_name || "";
        return brandA.localeCompare(brandB);
      } else if (sortBy === "brand_desc") {
        const brandA = a.brand_name || "";
        const brandB = b.brand_name || "";
        return brandB.localeCompare(brandA);
      }
      return 0;
    });
    return sorted;
  }, [foodResults, sortBy, filterType]);

  return (
    <Container maxWidth="xl" sx={{ px: 3 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Neutrino - Food Search
        </Typography>
        <SearchBar />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="name_asc">Name (A-Z)</MenuItem>
              <MenuItem value="name_desc">Name (Z-A)</MenuItem>
              <MenuItem value="brand_asc">Brand Name (A-Z)</MenuItem>
              <MenuItem value="brand_desc">Brand Name (Z-A)</MenuItem>
            </Select>
          </FormControl>

          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="filter-type"
              name="filter-type-group"
              value={filterType}
              onChange={handleFilterChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="common"
                control={<Radio />}
                label="Common"
              />
              <FormControlLabel
                value="branded"
                control={<Radio />}
                label="Branded"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <FoodList foodResults={filteredAndSortedFood} />
      </Box>
    </Container>
  );
}

export default FoodSearchPage;
