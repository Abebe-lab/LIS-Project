import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts"; //for pie-chart
import { BarChart, Bar } from "recharts"; //for bar chart

const IPDCLineChart = ({ data, showButton }) => {
  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="collection" stroke="green" />
        <Line type="monotone" dataKey="arrears" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const IPDCPieChart = ({ data, COLORS, showButton, dataKey = "value", nameKey = "" }) => {
  const COLORSTOUSE = COLORS ? COLORS : ["#0088FE", "#FFBB28"];
  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      <PieChart margin={0}>
        <Pie
          data={data}
          cx={50}
          cy={50}
          innerRadius={30}
          outerRadius={40}
          fill="#8884d8"
          paddingAngle={1}
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORSTOUSE[index % COLORSTOUSE.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="right" verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
};
//todo: make data dynamic, key being a factor
const IPDCBarChart = ({ data, showButton }) => {
  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      <BarChart data={data} margin={0}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="export" stackId="a" fill="#8884d8" />
        <Bar dataKey="import" stackId="a" fill="#82ca9d" />
        <Bar dataKey="substitution" stackId="a" fill="#ffc658" />
        <Bar dataKey="linkage" stackId="a" fill="grey" />
      </BarChart>
    </ResponsiveContainer>
  );
};
const IPDCBarChartTwo = ({ data, showButton }) => {
  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      <BarChart data={data} margin={0}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="referred" fill="#8884d8" />
        <Bar dataKey="handedOver" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
const SystemHealthChart = ({ data, showButton }) => {
  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      <LineChart data={data} margin={0}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="responseTime" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="errorRate" stroke="#ffc658" />
        <Line type="monotone" dataKey="uptime" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
const UserStatisticsChart = ({ data, showButton }) => (
  <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
    <LineChart data={data} margin={0}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Active Users" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="New Users" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Avg Duration" stroke="#ffc658" />
    </LineChart>
  </ResponsiveContainer>
);
const IPDCChartSelctor = ({ contentType, data, showButton = true }) => {
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const selectChart = () => {
      switch (contentType) {
        case "special-health":
          setChart(<SystemHealthChart data={data} showButton={showButton} />);
          break;
        case "chart":
          setChart(<IPDCLineChart data={data} showButton={showButton} />);
          break;
        case "chart-pie":
          setChart(<IPDCPieChart data={data} showButton={showButton} />);
          break;
        case "chart-bar":
          setChart(<IPDCBarChart data={data} showButton={showButton} />);
          break;
        case "chart-bar-two":
          setChart(<IPDCBarChartTwo data={data} showButton={showButton} />);
          break;
        case "user-statistics":
          setChart(<UserStatisticsChart data={data} showButton={showButton} />);
          break;
        default:
          setChart(null);
      }
    };
    selectChart();
  }, [contentType, data, showButton]);
  return <>{chart ? chart : <></>}</>;
};
const IPDCReferVsResponse = ({ data, showButton }) => {
  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      <LineChart width={500} height={300} data={data} margin={0}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="referred" stroke="#8884d8" />
        <Line type="monotone" dataKey="responses" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
const IPDCParkByIndustry = ({ data, showButton }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];
  return (
    <>
      <IPDCPieChart COLORS={COLORS} data={data} showButton={showButton} nameKey="industry" dataKey="value" />
    </>
  );
};
export { IPDCChartSelctor, IPDCReferVsResponse, IPDCParkByIndustry };
