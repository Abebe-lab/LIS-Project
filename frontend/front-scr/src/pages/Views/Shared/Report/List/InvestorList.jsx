import React, { useEffect, useState } from "react";
import { GetInvestors } from "../../CommonData/CommonData";
import { NavLink } from "react-router-dom";
import { IPDCReportTemplate } from "../../../../../components";
import { Box, Container, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function InvestorList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      const tempInv = await GetInvestors();
      if (tempInv && tempInv?.length > 0) {
        //        console.log(tempInv);
        setData(await tempInv);
      }
    };

    fetchInvestors();
  }, []);

  useEffect(() => {
    //console.log(data);
    data && data.length > 0 ? setLoading(false) : setLoading(true);
  }, [data]);
  if (loading) return <CircularProgress />;
  return (
    <Container>
      <Box mb={2}>
        <NavLink to="/registerInvestor">
          Add new investor
          <Add />
        </NavLink>
      </Box>
      <>
        {!loading ? (
          <IPDCReportTemplate
            data={data}
            setData={setData}
            defaultTitle="Investors List"
            isEditable={false}
            isPrintable={false}
            showWhatToDisplay={false}
          />
        ) : (
          <div>No Investor</div>
        )}
      </>
    </Container>
  );
}
