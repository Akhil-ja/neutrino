import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setFood1,
  setFood2,
  clearFood1,
  clearFood2,
} from "../store/slices/comparisonSlice";
import FoodComparisonCard from "../components/FoodComparisonCard";
import useNutritionixApi from "../hooks/useNutritionixApi";

function CompareFoodsPage() {
  const dispatch = useDispatch();
  const { food1, food2 } = useSelector((state) => state.comparison);

  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const {
    loading: loading1,
    error: error1,
    naturalNutrients: naturalNutrients1,
  } = useNutritionixApi();
  const {
    loading: loading2,
    error: error2,
    naturalNutrients: naturalNutrients2,
  } = useNutritionixApi();

  const handleSearch1 = async () => {
    if (searchTerm1.trim()) {
      const { data, error: apiError } = await naturalNutrients1(searchTerm1);
      if (data && data.foods && data.foods.length > 0) {
        dispatch(setFood1(data.foods[0]));
      } else if (apiError) {
        console.error("Search 1 API Error:", apiError);
      }
    }
  };

  const handleSearch2 = async () => {
    if (searchTerm2.trim()) {
      const { data, error: apiError } = await naturalNutrients2(searchTerm2);
      if (data && data.foods && data.foods.length > 0) {
        dispatch(setFood2(data.foods[0]));
      } else if (apiError) {
        console.error("Search 2 API Error:", apiError);
      }
    }
  };

  const handleClear1 = () => {
    dispatch(clearFood1());
    setSearchTerm1("");
  };

  const handleClear2 = () => {
    dispatch(clearFood2());
    setSearchTerm2("");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Compare Food Items
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Search Food 1..."
                  variant="outlined"
                  fullWidth
                  value={searchTerm1}
                  onChange={(e) => setSearchTerm1(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch1()}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch1}
                  disabled={loading1}
                >
                  {loading1 ? <CircularProgress size={24} /> : "Search"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClear1}
                  disabled={!food1}
                >
                  Clear
                </Button>
              </Box>
              {error1 && (
                <Typography color="error">
                  Error: {error1.message || "Failed to fetch food 1."}
                </Typography>
              )}
              {food1 && <FoodComparisonCard food={food1} compareFood={food2} />}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Search Food 2..."
                  variant="outlined"
                  fullWidth
                  value={searchTerm2}
                  onChange={(e) => setSearchTerm2(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch2()}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch2}
                  disabled={loading2}
                >
                  {loading2 ? <CircularProgress size={24} /> : "Search"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClear2}
                  disabled={!food2}
                >
                  Clear
                </Button>
              </Box>
              {error2 && (
                <Typography color="error">
                  Error: {error2.message || "Failed to fetch food 2."}
                </Typography>
              )}
              {food2 && <FoodComparisonCard food={food2} compareFood={food1} />}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default CompareFoodsPage;
