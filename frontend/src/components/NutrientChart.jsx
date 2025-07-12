import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FF8A65"];

function NutrientChart({ protein, carbs, fat }) {
  const data = [
    { name: "Protein", value: protein || 0 },
    { name: "Carbohydrates", value: carbs || 0 },
    { name: "Fat", value: fat || 0 },
  ];

  const filteredData = data.filter((entry) => entry.value > 0);

  if (filteredData.length === 0) {
    return <p>No macronutrient data available for chart.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={filteredData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value.toFixed(2)}g`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default NutrientChart;
