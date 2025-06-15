import React, { useEffect, useState, useMemo } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { PieChart } from "@mui/icons-material";
import { IPDCPieChart, SquareChartContainer } from "../../../../../components/Charts";
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";

export default function LandUseProportionDetailCard({ parkId = null }) {
  const [parkProportionData, setParkProportionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkOccupancyData = async () => {
      setLoading(true);
      try {
        const data = await GetDataFromApiWithParams(`dashboard/mp/landUseProportion`, { parkId });
        setParkProportionData(transformParkData(data) || []);
      } catch (error) {
        console.error("Error fetching land use proportion data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchParkOccupancyData();
  }, [parkId]);

  // Memoize the data transformation
  const transformParkData = useMemo(
    () => data => {
      if (!data) return null; // Handle case where data might be null
      const parkMap = {};
      data.forEach(({ park_id, park_name, category, area }) => {
        if (!parkMap[park_id]) {
          parkMap[park_id] = { park_id, park_name, detail: [] };
        }
        parkMap[park_id].detail.push({
          category,
          area: parseFloat(area) || 0,
        });
      });
      return Object.values(parkMap).length > 0 ? Object.values(parkMap) : null; // Return null if no valid data
    },
    [],
  );

  // Memoize the filtering function
  const getFilteredData = useMemo(
    () => parkOccupancyData =>
      parkOccupancyData ? parkOccupancyData.filter(item => item.category !== "Total Park Area") : [],
    [],
  );

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <CircularProgress />
        </Grid>
      ) : parkProportionData?.length > 0 ? (
        parkProportionData.map(parkData => (
          <Grid item xs={12} md={6} key={parkData.park_id}>
            <SquareChartContainer
              THECHART={
                parkData.detail &&
                parkData.detail.length > 0 && (
                  <IPDCPieChart
                    data={getFilteredData(parkData.detail)}
                    showButton={false}
                    nameKey="category"
                    dataKey="area"
                    withHole={true}
                    showLabel={true}
                  />
                )
              }
              title={parkData.park_name}
              showMoreButton={false}
              avatar={<PieChart sx={{ fill: "red" }} />}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <p>No data available</p>
        </Grid>
      )}
    </Grid>
  );
}
