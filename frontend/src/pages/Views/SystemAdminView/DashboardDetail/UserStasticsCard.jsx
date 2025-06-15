import { useEffect, useState } from "react";
import { ImportExportOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import WideChartContainer from "../../../../components/Charts/WideChartContainer";
import { IPDCLineChart } from "../../../../components/Charts";

import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
export default function UserStasticsCard({ parkId = null }) {
  const [referredResponses, setReferredResponses] = useState([]);

  useEffect(() => {
    const fetchReferredResponses = async () => {
      try {
        const referredRes = await GetDataFromApiWithParams("dashboard/sysAdmin/userStastics");
        setReferredResponses(referredRes || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchReferredResponses();
  }, [parkId]);

  return (
    <Box>
    <Link to="/systemLog">
      {referredResponses && referredResponses.length ? (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={referredResponses}
              xDataKeys="day"
              yDataKeys={["active_users", "average_duration"]}
              showButton={false}
            />
          }
          title="User Stastics"
          link="/systemLog"
          showMoreButton={false}
          avatar={<ImportExportOutlined />}
        />
      ) : (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={referredResponses}
              xDataKeys="day"
              yDataKeys={["active_users", "average_duration"]}
              showButton={false}
            />
          }
          title="User Stastics"
          link="/systemLog"
          showMoreButton={false}
          avatar={<ImportExportOutlined />}
        />
      )}
    </Link>
    </Box>
  );
}
