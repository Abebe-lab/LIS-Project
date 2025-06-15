import React, { useEffect, useState, useMemo } from "react";
import { Factory } from "@mui/icons-material";
import { IPDCPieChart, SquareChartContainer } from "../../../../../components/Charts";
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";
import { Link } from "react-router-dom";

export default function ShedParcelRatioCard({ parkId = null }) {
  const [parcelVsShed, setParcelVsShed] = useState([]);

  // Move the function definition above where it's used
  const getSummarizedData = data => {
    const summary = [
      { category: "parcel", count: 0 },
      { category: "shed", count: 0 },
    ];

    data.forEach(park => {
      summary[0].count += parseInt(park["ready_parcels_count"], 10) || 0;
      summary[1].count += parseInt(park["shed_count"], 10) || 0;
    });

    return summary;
  };

  useEffect(() => {
    const fetchParkOccupancyData = async () => {
      try {
        const data = await GetDataFromApiWithParams(`dashboard/mp/parcelVsShedRatio`);
        setParcelVsShed(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchParkOccupancyData();
  }, [parkId]);

  // Use useMemo to memoize the summarized data computation
  const summarizedData = useMemo(() => getSummarizedData(parcelVsShed), [parcelVsShed]);

  return (
    <>
      {parcelVsShed?.length > 0 && (
        //<Link to="/shedParcelRatio">
        <SquareChartContainer
          THECHART={
            <IPDCPieChart data={summarizedData} showButton={false} nameKey="category" dataKey="count" withHole={true} />
          }
          title="Shed/Parcel Ratio"
          link="/shedParcelRatio"
          showMoreButton={false}
          avatar={<Factory />}
        />
       // </Link>
      )}
    </>
  );
}
