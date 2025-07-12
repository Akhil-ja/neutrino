import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, CardMedia } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function FoodComparisonCard({ food, compareFood }) {
  const getComparisonColor = (value, compareValue) => {
    if (!compareFood || value === undefined || compareValue === undefined) return 'inherit';
    if (value > compareValue) return 'green';
    if (value < compareValue) return 'red';
    return 'inherit';
  };

  const getComparisonIndicator = (value, compareValue) => {
    if (!compareFood || value === undefined || compareValue === undefined) return null;
    if (value > compareValue) return ' (Higher)';
    if (value < compareValue) return ' (Lower)';
    return ' (Same)';
  };

  const createChartData = (nutrientKey) => {
    const data = [];
    if (food && food[nutrientKey] !== undefined) {
      data.push({ name: food.food_name, value: food[nutrientKey] });
    }
    if (compareFood && compareFood[nutrientKey] !== undefined) {
      data.push({ name: compareFood.food_name, value: compareFood[nutrientKey] });
    }
    return data;
  };

  const caloriesData = createChartData('nf_calories', 'Calories');
  const proteinData = createChartData('nf_protein', 'Protein');
  const carbsData = createChartData('nf_total_carbohydrate', 'Carbohydrates');
  const fatData = createChartData('nf_total_fat', 'Fat');

  const renderBarChart = (data, title, color) => {
    if (data.length === 0) return null;
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" align="center">{title}</Typography>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip formatter={(value) => `${value.toFixed(2)}`}/>
            <Bar dataKey="value" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {food.food_name} {food.brand_name && `(${food.brand_name})`}
        </Typography>
        {food.photo && food.photo.thumb && (
          <CardMedia
            component="img"
            sx={{ width: 80, height: 80, borderRadius: '4px', mb: 1 }}
            image={food.photo.thumb}
            alt={food.food_name}
          />
        )}
        <Typography variant="body1" sx={{ color: getComparisonColor(food.nf_calories, compareFood?.nf_calories) }}>
          Calories: {food.nf_calories ? food.nf_calories.toFixed(2) : 'N/A'}
          {getComparisonIndicator(food.nf_calories, compareFood?.nf_calories)}
        </Typography>
        <Typography variant="body1" sx={{ color: getComparisonColor(food.nf_protein, compareFood?.nf_protein) }}>
          Protein: {food.nf_protein ? food.nf_protein.toFixed(2) : 'N/A'}g
          {getComparisonIndicator(food.nf_protein, compareFood?.nf_protein)}
        </Typography>
        <Typography variant="body1" sx={{ color: getComparisonColor(food.nf_total_carbohydrate, compareFood?.nf_total_carbohydrate) }}>
          Carbs: {food.nf_total_carbohydrate ? food.nf_total_carbohydrate.toFixed(2) : 'N/A'}g
          {getComparisonIndicator(food.nf_total_carbohydrate, compareFood?.nf_total_carbohydrate)}
        </Typography>
        <Typography variant="body1" sx={{ color: getComparisonColor(food.nf_total_fat, compareFood?.nf_total_fat) }}>
          Fat: {food.nf_total_fat ? food.nf_total_fat.toFixed(2) : 'N/A'}g
          {getComparisonIndicator(food.nf_total_fat, compareFood?.nf_total_fat)}
        </Typography>

        {renderBarChart(caloriesData, 'Calories Comparison', '#8884d8')}
        {renderBarChart(proteinData, 'Protein Comparison', '#82ca9d')}
        {renderBarChart(carbsData, 'Carbohydrates Comparison', '#ffc658')}
        {renderBarChart(fatData, 'Fat Comparison', '#ff7300')}

      </CardContent>
    </Card>
  );
}

export default FoodComparisonCard;
