import { useEffect, useState } from "react";
import { IPDCPieChart, SquareChartContainer } from "../../../../../components/Charts";
import { Factory } from "@mui/icons-material";
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";

export default function ShedParcelRatioCardDetail({ parkId = null }) {
  const [parkOccupancyData, setParkOccupancyData] = useState([]);

  useEffect(() => {
    const fetchParkOccupancyData = async () => {
      try {
        const parkOccupancy = await GetDataFromApiWithParams(`reports/gis/reportType/shedVSParcelDevelopment`);
        //console.log(parkOccupancy);
        setParkOccupancyData(parkOccupancy || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchParkOccupancyData();
  }, [parkId]);
  const getVacantAndOccupied = data => {
    // Step 1: Filter out "Total Parcels"
    const filteredData = parkOccupancyData.filter(item => item.category !== "Total Parcels");
    // Step 2: Calculate the sum of the remaining non-vacant parcels (Occupied Parcels)
    const occupiedCount = filteredData
      .filter(item => item.category !== "Vacant Parcels" && item.category !== "Reserved Parcels")
      .reduce((sum, item) => sum + parseInt(item.count, 10), 0);
    // Step 3: Construct the final result
    const finalData = [
      ...filteredData.filter(item => item.category === "Vacant Parcels"),
      {
        category: "Occupied Parcels",
        count: occupiedCount.toString(),
      },
    ];
    return finalData;
  };
  return (
    <>
      {parkOccupancyData && (
        <SquareChartContainer
          THECHART={
            <IPDCPieChart
              data={getVacantAndOccupied(parkOccupancyData)}
              showButton={false}
              nameKey="category"
              dataKey="count"
              withHole={true}
            />
          }
          title="Shed/Parcel Ratio"
          link="/shedParcelRatio"
          showMoreButton={false}
          avatar={<Factory />}
        />
      )}
    </>
  );
}
