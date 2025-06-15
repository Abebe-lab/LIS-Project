import React, { useState, useEffect } from "react";
import { CircularProgress,  Container } from "@mui/material";
import { IPDCReportTemplate } from "../../../../components";
import { GetOccupancyPermits } from "../../Shared/CommonData/ActivitiesData";
export default function OccupancyPermitList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const newData = await GetOccupancyPermits();
      if (newData) {
        setData(newData);
      }
      setLoading(false);
      return true;
    };
    fetchUsers();
  }, []);
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Container>
        {data.length > 0 ? (
        <IPDCReportTemplate defaultTitle={"Occupancy Permit List"} data={data} setData={setData} isPrintable={true} showHeader={false} />
      ) : (
        <>{"No Data"}</>
      )}
    </Container>
  );
}
