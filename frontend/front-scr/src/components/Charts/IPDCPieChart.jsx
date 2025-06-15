import { PieChart, Pie, Cell } from "recharts";
import { Tooltip, Legend, ResponsiveContainer } from "recharts";
import StringToColor from "../../utils/StringToColor";
import { Box, Container, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";
//prettier-ignore
const IPDCPieChart = ({ data, COLORS, showButton, dataKey = "count", nameKey = "", withHole = false, showLabel = false, wrapLegendText = false }) => {
  const processedData =
    data?.map(item => ({
      ...item,
      [dataKey]: parseInt(item[dataKey], 10)
    })) || [];

  const COLORSTOUSE = COLORS ? COLORS : ["#0088FE", "#FFBB28", "#cccccc"]; // Default colors

  const fetchCellsWithColor = () => {
    if (!processedData || processedData.length === 0) return;
    return processedData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={StringToColor(entry[nameKey]) || COLORSTOUSE[index % COLORSTOUSE.length]} />
    ));
  };

  // Adjust font size based on the number of legend items
  const [fontSize, setFontSize] = useState("12px");
  useEffect(() => {
    if (processedData.length > 5) {
      setFontSize("10px"); // Reduce font size if more than 5 items
    } else {
      setFontSize("12px"); // Default size for 5 or fewer items
    }
  }, [processedData]);

  const renderCustomizedLegend = props => {
    const { payload } = props;
    return (
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          maxHeight: "150px", // Set a max height for the legend
          overflowY: processedData?.length > 7 ? "auto" : "visible", // Add scroll if more than 5 items
        }}
      >
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ fontSize, marginBottom: "5px"}}>
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: entry.color,
                marginRight: "2px",
              }}
            />
            {wrapLegendText && entry.value?.length>15? entry.value.substring(0,15) +"..." : entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      {processedData && processedData.length > 0 ? (
        <PieChart>
          <Pie
            data={processedData}
            dataKey={dataKey}
            cx="50%" // Center the chart horizontally
            cy="50%" // Center the chart vertically
            isAnimationActive={true}
            innerRadius={withHole ? 10 : 0}
            outerRadius={40}
            fill="#8884d8"
            paddingAngle={0}
            label={showLabel ? "label" : null}
            nameKey={nameKey}
          >
            {fetchCellsWithColor()}
          </Pie>
          <Tooltip />
          <Legend
            align="right"
            verticalAlign="middle"
            layout="vertical"
            content={renderCustomizedLegend} // Custom legend with adjustable font size and scrolling
            wrapperStyle={{width: "50%"}}
          />
        </PieChart>
      ) : (
        <Container>
          <Typography>No data available.</Typography>
          <Box mt={2}>
          <InfoIcon style={{ fill: 'green' }}/>
          </Box>
        </Container>
      )}
    </ResponsiveContainer>
  );
};

export default IPDCPieChart;
