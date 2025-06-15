import React, { useState, useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";
import { IPDCReportTemplate } from "../../../../components";
import { GetBuildingPermitsReport } from "../../Shared/CommonData/ActivitiesData";
export default function BuildingPermitList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const newData = await GetBuildingPermitsReport();
      newData && setData(newData);
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
        <IPDCReportTemplate
          defaultTitle={"Building Permit List"}
          data={data}
          setData={setData}
          isPrintable={true}
          showHeader={false}
        />
      ) : (
        <>{"No Data"}</>
      )}
    </Container>
  );
}
