import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import NutrientChart from "../components/NutrientChart";
import useNutritionixApi from "../hooks/useNutritionixApi";
import { useDispatch } from "react-redux";
import { setSelectedFood } from "../store/slices/foodSlice";

function FoodDetail() {
  const { foodName, foodType, itemId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, naturalNutrients, itemById } = useNutritionixApi();
  const [foodDetails, setFoodDetails] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      let response;
      if (foodType === "common") {
        response = await naturalNutrients(decodeURIComponent(foodName));
      } else if (foodType === "branded") {
        response = await itemById(itemId);
      }

      if (
        response &&
        response.data &&
        response.data.foods &&
        response.data.foods.length > 0
      ) {
        setFoodDetails(response.data.foods[0]);
        dispatch(setSelectedFood(response.data.foods[0]));
      } else {
        setFoodDetails(null);
      }
    };

    fetchFoodDetails();
  }, [foodName, foodType, itemId, naturalNutrients, itemById, dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Error: {error.message || "Something went wrong fetching food details."}
      </Typography>
    );
  }

  if (!foodDetails) {
    return (
      <Typography align="center" color="textSecondary">
        No food details found.
      </Typography>
    );
  }

  const {
    food_name,
    brand_name,
    nf_calories,
    nf_protein,
    nf_total_carbohydrate,
    nf_total_fat,
    serving_qty,
    serving_unit,
  } = foodDetails;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {food_name} {brand_name && `(${brand_name})`}
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} md={foodDetails.photo && foodDetails.photo.highres ? 8 : 12}>
              <Typography variant="h6" gutterBottom>
                Nutritional Information
              </Typography>
              <Typography>
                Serving Size: {serving_qty} {serving_unit}
              </Typography>
              <Typography>
                Calories: {nf_calories ? nf_calories.toFixed(2) : "N/A"}
              </Typography>
              <Typography>
                Protein: {nf_protein ? nf_protein.toFixed(2) : "N/A"}g
              </Typography>
              <Typography>
                Carbohydrates:{" "}
                {nf_total_carbohydrate
                  ? nf_total_carbohydrate.toFixed(2)
                  : "N/A"}
                g
              </Typography>
              <Typography>
                Fat: {nf_total_fat ? nf_total_fat.toFixed(2) : "N/A"}g
              </Typography>
            </Grid>
            {foodDetails.photo && foodDetails.photo.highres && (
              <Grid item xs={12} md={4} display="flex" justifyContent="flex-end" alignItems="flex-start">
                <img src={foodDetails.photo.highres} alt={food_name} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              </Grid>
            )}
            <Grid item xs={12} md={foodDetails.photo && foodDetails.photo.highres ? 4 : 6}>
              <Typography variant="h6" gutterBottom align="center">
                Macronutrient Breakdown
              </Typography>
              <NutrientChart
                protein={nf_protein}
                carbs={nf_total_carbohydrate}
                fat={nf_total_fat}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default FoodDetail;
