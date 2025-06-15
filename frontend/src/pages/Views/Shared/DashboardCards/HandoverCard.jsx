import { useEffect, useState } from "react";
import {  ImportExportOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import WideChartContainer from "../../../../components/Charts/WideChartContainer";
import { IPDCLineChart } from "../../../../components/Charts";

import {ExecuteApiRequest, GetDataFromApiWithParams} from "../../../../services/api/ExecuteApiRequests";

export default function HandoverCard({ parkId = null }) {
  const [referredResponses, setReferredResponses] = useState([]);

  useEffect(() => {
    const fetchReferredResponses = async () => {
      try {
        const referredRes = await GetDataFromApiWithParams(parkId
          ? `dashboard/executives/referedStatus?parkId=${parkId}`
          : "dashboard/executives/referedStatus");
        setReferredResponses(referredRes || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchReferredResponses();
  }, [parkId]);

  return (
    <Link to="/viewReferredStatus">
      {referredResponses?.length>0 && (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={referredResponses}
              xDataKeys="month"
              yDataKeys={["referred", "responses"]}
              showButton={false}
            />
          }
          title="Handed Over Vs Request"
          link="/parksByIndustry"
          showMoreButton={false}
          avatar={<ImportExportOutlined />}
        />
      )}
    </Link>
  );
}
