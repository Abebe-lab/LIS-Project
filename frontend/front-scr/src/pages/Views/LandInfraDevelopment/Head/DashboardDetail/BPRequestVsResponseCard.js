import { useEffect, useState } from "react";
import { ImportExportOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IPDCLineChart, WideChartContainer } from "../../../../../components/Charts";

import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";

export default function PBRequestVsResponseCard({ parkId = null }) {
  const [referredResponses, setReferredResponses] = useState([]);

  useEffect(() => {
    const fetchBPRequestVsResponse = async () => {
      try {
        const referredRes = await GetDataFromApiWithParams(
          parkId
            ? `dashboard/designManagement/bprequestVsResponse/${parkId}`
            : `dashboard/designManagement/bprequestVsResponse`,
        );
        console.log(referredRes);
        setReferredResponses(referredRes || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBPRequestVsResponse();
  }, [parkId]);

  return (
    <Link to="/listBPermit">
      {referredResponses && referredResponses?.length > 0 ? (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={referredResponses}
              xDataKeys="month_name"
              yDataKeys={["request", "response"]}
              showButton={false}
            />
          }
          title="Building Permit"
          link="/listBPermit"
          showMoreButton={false}
          avatar={<ImportExportOutlined />}
        />
      ) : (
        <WideChartContainer
          THECHART={
            <IPDCLineChart
              data={referredResponses}
              xDataKeys="month_name"
              yDataKeys={["request", "response"]}
              showButton={false}
            />
          }
          title="Occupancy Permit"
          link="/listOPermit"
          showMoreButton={false}
          avatar={<ImportExportOutlined />}
        />
      )}
    </Link>
  );
}
