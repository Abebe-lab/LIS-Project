import { useEffect, useState } from "react";
import { ImportExportOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import WideChartContainer from "../../../../components/Charts/WideChartContainer";
import { IPDCLineChart } from "../../../../components/Charts";

import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
export default function ReferredResponseCard({ parkId = null }) {
  const [referredResponses, setReferredResponses] = useState([]);

  useEffect(() => {
    const fetchReferredResponses = async () => {
      try {
        const referredRes = await GetDataFromApiWithParams(
          parkId ? `dashboard/executives/referedStatus?parkId=${parkId}` : "dashboard/executives/referedStatus",
        );

        setReferredResponses(referredRes || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchReferredResponses();
  }, [parkId]);

  return (
    <Link to="/viewReferredStatus">
      {referredResponses && referredResponses.length ? (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={referredResponses}
              xDataKeys="month"
              yDataKeys={["referred", "responses"]}
              showButton={false}
            />
          }
          title="Referred vs Responses"
          link="/viewReferredStatus"
          showMoreButton={false}
          avatar={<ImportExportOutlined />}
        />
      ) : (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={referredResponses}
              xDataKeys="month"
              yDataKeys={["referred", "responses"]}
              showButton={false}
            />
          }
          title="Referred vs Responses"
          link="/viewReferredStatus"
          showMoreButton={false}
          avatar={<ImportExportOutlined />}
        />
      )}
    </Link>
  );
}
