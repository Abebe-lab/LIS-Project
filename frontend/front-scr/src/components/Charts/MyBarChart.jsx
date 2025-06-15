import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import StringToColor from './StringToColor'; // Assuming StringToColor is in a separate file

const MyBarChart = ({ data, dataKeys, labelKey }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Create a color scale function using StringToColor
  const colorScale = (key) => StringToColor(key);

  useEffect(() => {
    const labels = data.map((item) => item[labelKey]);
    const datasets = dataKeys.map((key) => ({
      name: key,
      data: data.map((item) => item[key]),
      fill: colorScale(key), // Assign color based on label
    }));

    setChartData({ labels, datasets });
  }, [data, dataKeys, labelKey]);

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="data" />
    </BarChart>
  );
};

export default MyBarChart;