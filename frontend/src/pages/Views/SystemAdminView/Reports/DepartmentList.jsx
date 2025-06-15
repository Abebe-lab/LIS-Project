import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { IPDCReportTemplate } from "../../../../components";
import { GetDepartments } from "../../Shared/CommonData/CommonData";
import { Add } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
export default function DepartmentList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const newData = await GetDepartments();
      if (newData) {
        setData(newData);
        console.log(newData);
      }
      setLoading(false);
      return true;
    };
    fetchUsers();
  }, []);
  useEffect(() => {}, [data]);
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
     <Container>
        
          <NavLink style={{ position: "relative" }} to="/registerDepartment">
            <Button startIcon={<Add sx={{ fill: "white" }} />} variant="contained" color="success">
              Add new Department
            </Button>
          </NavLink>
        
      </Container>
    <Box>
      {data && data.length > 0 ? (
        <IPDCReportTemplate
          title={"System Users"}
          data={data}
          setData={setData}
          isPrintable={false}
          isEditable={true}
          showHeader={false}
          isDeletable={true}
        />
      ) : (
        <>{"No Data"}</>
      )}
    </Box>
    </>
  );
}

