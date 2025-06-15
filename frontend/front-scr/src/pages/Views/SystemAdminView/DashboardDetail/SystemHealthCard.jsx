import { useEffect, useState } from "react";
import { HealthAndSafety } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IPDCLineChart, WideChartContainer } from "../../../../components/Charts";
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests"; //ExecuteApiRequest,
export default function SystemHealthCard({ parkId = null }) {
  const [healthStatus, setHealthStatus] = useState([]);

  useEffect(() => {
    const fetchReferredResponses = async () => {
      try {
        const healthData = await GetDataFromApiWithParams(`dashboard/sysAdmin/systemHealth`);
        setHealthStatus(healthData || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchReferredResponses();
  }, []);

  return (
    <Link to="/systemHealth">
      {healthStatus && healthStatus.length ? (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={healthStatus}
              xDataKeys="time_slot"
              yDataKeys={["active", "idle"]}
              showButton={false}
            />
          }
          title="System Activity"
          link="/systemHealth"
          showMoreButton={false}
          avatar={<HealthAndSafety />}
        />
      ) : (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={healthStatus}
              xDataKeys="time_slot"
              yDataKeys={["active", "idle"]}
              showButton={false}
            />
          }
          title="System Activity"
          link="/systemHealth"
          showMoreButton={false}
          avatar={<HealthAndSafety />}
        />
      )}
    </Link>
  );
}
