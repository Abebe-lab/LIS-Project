import { useEffect, useState } from "react";
import { SquareChartContainer, IPDCPieChart } from "../../../../components/Charts";
import { Factory } from "@mui/icons-material";
import { Link } from "react-router-dom";

import {GetDataFromApiWithParams} from "../../../../services/api/ExecuteApiRequests";

export default function ParksBySectorCard({ parkId = null, wrapLegendText = false }) {
  const [parkIndustryData, setParkIndustryData] = useState([]);

  useEffect(() => {
    const fetchParkIndustryData = async () => {
      try {
        const parkIndustry = await GetDataFromApiWithParams(parkId
          ? `dashboard/executives/parkBySector?parkId=${parkId}`
          : `dashboard/executives/parkBySector`);
        setParkIndustryData(parkIndustry || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchParkIndustryData();
  }, [parkId]);

  return (
    <Link to="/parksByIndustry">
      {parkIndustryData && (
        <SquareChartContainer
          THECHART={
            <IPDCPieChart
              data={parkIndustryData.filter(
                (item) => item.category !== "Total Parcels"
              )}
              showButton={false}
              nameKey="category"
              dataKey="count"
              withHole={true}
              wrapLegendText={wrapLegendText}
            />
          }
          title="Park by Sector"
          link="/parksByIndustry"
          showMoreButton={false}
          avatar={<Factory />}
        />
      )}
    </Link>
  );
}
/*{parkIndustryData && (
                <SquareChartContainer
                  THECHART={
                    <IPDCPieChart
                      data={
                        parkIndustryData &&
                        parkIndustryData.filter(
                          (item) => item.category !== "Total Parcels"
                        )
                      }
                      showButton={false}
                      nameKey="category"
                      dataKey="count"
                      withHole={true}
                    />
                  }
                  title="Park by Sector"
                  link="/parksByIndustry"
                  showMoreButton={false}
                  avatar={<Factory />}
                />
              )}*/