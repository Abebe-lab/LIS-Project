import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { IPDCReportTemplate } from "../../../../components";
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

const DisplayAppropriateReport = ({ reportType, department = "finance", title = null }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const result = await GetDataFromApiWithParams(`reports/${department}/reportType/${reportType}`);//console.log(result);
        if (result) setData(result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
      return true;
    };
    fetchReport();
  }, [department, reportType]);

  if (loading) {
    return <CircularProgress />;
  }
  return data && data.length > 0 ? (
    <IPDCReportTemplate defaultTitle={title ? title : department + " Report"} data={data} setData={setData} />
  ) : (
    <>{"No data yet!"}</>
  );
};
export default DisplayAppropriateReport;
