import React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";

function FoodList({ foodResults }) {
  const { loading, error } = useSelector((state) => state.food);

  const gridItemProps = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    sx: { display: "flex", justifyContent: "center", alignItems: "center" },
  };

  const cardStyle = {
    height: 340,
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e0e0e0",
    width: "100%",
    maxWidth: 180,
    // maxWidth: 180,
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 4,
    },
  };

  if (loading) {
    return (
      <Grid container spacing={2} justifyContent="center">
        {Array.from(new Array(8)).map((_, index) => (
          <Grid item key={index} {...gridItemProps}>
            <Card sx={cardStyle}>
              <Skeleton variant="rectangular" width="100%" height={160} />
              <CardContent
                sx={{
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box>
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="70%" height={18} />
                </Box>
                <Box>
                  <Skeleton variant="text" width="60%" height={16} />
                  <Skeleton variant="text" width="50%" height={16} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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
    <Grid container spacing={2} justifyContent="center">
      {foodResults.map((food, index) => (
        <Grid item key={index} {...gridItemProps}>
          <Card sx={cardStyle}>
            <CardActionArea
              component={Link}
              to={`/food/${encodeURIComponent(food.food_name)}/${food.nix_item_id ? "branded" : "common"}${food.nix_item_id ? "/" + food.nix_item_id : ""}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: 160,
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {food.photo && food.photo.thumb ? (
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                    image={food.photo.thumb}
                    alt={food.food_name}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: food.photo && food.photo.thumb ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "grey.100",
                    color: "grey.500",
                    position:
                      food.photo && food.photo.thumb ? "absolute" : "static",
                    top: 0,
                    left: 0,
                  }}
                >
                  <Typography variant="body2">No Image</Typography>
                </Box>
              </Box>

              <CardContent
                sx={{
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box sx={{ flexGrow: 1, minHeight: 80 }}>
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      height: "2.6em",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                      mb: 1,
                    }}
                    title={food.food_name}
                  >
                    {food.food_name}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.8rem",
                      lineHeight: 1.3,
                      height: "1.3em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      mb: 1,
                    }}
                    title={food.brand_name || "Common Food"}
                  >
                    {food.brand_name || "Common Food"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    minHeight: 40,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: 1.2,
                      height: "1.2em",
                      mb: 0.5,
                    }}
                  >
                    {food.nf_calories !== undefined
                      ? `Calories: ${food.nf_calories.toFixed(0)}`
                      : "Calories: N/A"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: 1.2,
                      height: "1.2em",
                    }}
                  >
                    {food.nf_protein !== undefined
                      ? `Protein: ${food.nf_protein.toFixed(1)}g`
                      : "Protein: N/A"}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default FoodList;
