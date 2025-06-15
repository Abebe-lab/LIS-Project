import React, { useState, useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";
import { IPDCReportTemplate } from "../../../../components";
import { GetSystemLog } from "../../Shared/CommonData/SAData";
export default function SystemLogSummary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemLog = async () => {
      const newData = await GetSystemLog();
      console.log(newData);
      if (newData) {
        setData(newData);
      }
      setLoading(false);
      return true;
    };
    fetchSystemLog();
  }, []);
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Container>
      {data && data.length > 0 ? (
        <IPDCReportTemplate
          defaultTitle={"System Log Summary Report"}
          data={data}
          setData={setData}
          isEditable={false}
        />
      ) : (
        <>{"No Log Data"}</>
      )}
    </Container>
  );
}
