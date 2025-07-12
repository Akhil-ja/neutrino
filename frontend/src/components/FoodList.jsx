import React from "react";
import { useSelector } from "react-redux";
import {
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

function FoodList({ foodResults }) {
  const { loading, error } = useSelector((state) => state.food);

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
        Error: {error.message || "Something went wrong"}
      </Typography>
    );
  }

  if (foodResults.length === 0) {
    return (
      <Typography align="center" color="textSecondary">
        No food items found. Try searching for something!
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {foodResults.map((food, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ display: "flex", height: "100%" }}>
            <CardActionArea
              component={Link}
              to={`/food/${encodeURIComponent(food.food_name)}/${food.nix_item_id ? "branded" : "common"}${food.nix_item_id ? "/" + food.nix_item_id : ""}`}
            >
              {food.photo && food.photo.thumb && (
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, flexShrink: 0 }}
                  image={food.photo.thumb}
                  alt={food.food_name}
                />
              )}
              <Box
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography component="div" variant="h6">
                    {food.food_name}
                  </Typography>
                  {food.brand_name && (
                    <Typography variant="subtitle1" color="text.secondary">
                      {food.brand_name}
                    </Typography>
                  )}
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default FoodList;
