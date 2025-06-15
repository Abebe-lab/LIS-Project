import React, { useEffect, useState, useMemo } from "react";
import { PieChart } from "@mui/icons-material";
import { IPDCPieChart, SquareChartContainer } from "../../../../../components/Charts";
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";
import { Link } from "react-router-dom";

export default function LandUseProportionCard({ parkId = null }) {
  const [parkProportionData, setParkProportionData] = useState([]);

  useEffect(() => {
    const fetchParkOccupancyData = async () => {
      try {
        const data = await GetDataFromApiWithParams(`dashboard/mp/landUseProportion`);
        setParkProportionData(sumOccupancies(data) || []);
      } catch (error) {
        console.error("Error fetching land use proportion data:", error);
      }
    };

    fetchParkOccupancyData();
  }, [parkId]);

  // Memoize sumOccupancies to avoid unnecessary recalculations
  const sumOccupancies = useMemo(() => {
    return (data) => {
      data = data || [];
      const sumMap = new Map();

      data.forEach(item => {
        if (item.category !== "Total Park Area") {
          const category = item.category.split(" ")[0]; // Assumes the first word defines the type
          const currentSum = sumMap.get(category) || 0;
          sumMap.set(category, currentSum + item.area);
        }
      });

      // Convert Map to Array of objects
      return Array.from(sumMap, ([category, area]) => ({ category, area }));
    };
  }, []);

  return (
    <>
      {parkProportionData?.length > 0 && (
        <Link to="/landUseProportionDetail">
          <SquareChartContainer
            THECHART={
              <IPDCPieChart
                data={parkProportionData}
                showButton={false}
                nameKey="category"
                dataKey="area"
                withHole={true}
              />
            }
            title="Land Use Proportion"
            link="/landUseProportionDetail"
            showMoreButton={false}
            avatar={<PieChart sx={{ fill: "red" }} />}
          />
        </Link>
      )}
    </>
  );
}