import React, { useState, useRef, useEffect } from "react";
import { TextField, Grid, Typography, Box, Button, Paper, Container, CircularProgress } from "@mui/material";
import { Print, Search } from "@mui/icons-material";
import ReactToPrint from "react-to-print";

import DeedToPrint from "./DeedToPrint";
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
import AgreementPrintLayout from "./TitleDeedFinal/AgreementPrintLayout";

export default function PrintDeedForm() {
  const contentRef = useRef();

  const [data, setData] = useState(null);
  const [spatialInfo, setSpatialInfo] = useState(null);
  const [agreementId, setAgreementId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    //todo: find the appropriate information first
    //todo: get the data from the server, including spatial info

    //ownership type has to be: Developed Land Lease
    try {
      const fullInfo = await GetDataFromApiWithParams(`agreements/${agreementId}`);
      if (fullInfo && fullInfo?.length > 0) {
        //console.log("full info: ", fullInfo);
        const specificInfo = fullInfo[0];
//        console.log("specific info: ",specificInfo);

        const parcelInfo = await GetDataFromApiWithParams(`parcels/${specificInfo?.upin}`);
        console.log("Parcel info\n", parcelInfo[0]);
        setSpatialInfo(parcelInfo[0]);
        const proprietorInfo = await GetDataFromApiWithParams(`investors/${specificInfo?.company_id}`);
        console.log("tenant info\n", proprietorInfo[0]);
        if (specificInfo?.ownership_type !== "Developed Land Lease") {
          setResponseMessage("Not land ownership type");
          setLoading(false);
          return;
        } else {
          const sanitizedData = {
            UPIN: specificInfo?.UPIN,
            parkName: specificInfo?.park_name,
            region: specificInfo?.park_region,
            block: parcelInfo?.block_no,
            code: specificInfo?.local_shed_no,
            description: "",
            natureOfTitle: "Lease",
            area: specificInfo?.area_on_deed,
            titleDeedNo: "",
            applicationDate: specificInfo?.contract_issued_on,
            documentType: "",
            serviceType: specificInfo?.investment_type,
            idOrPassportNo: specificInfo?.company_id,
            fullName: specificInfo?.company_name,
            address: specificInfo?.park_region,
            entryDate: specificInfo?.contract_issued_on,
            endingDate: specificInfo?.contract_issued_on,
            encumbranceNature: "",
            documentNo: "",
            coordinates: parcelInfo?.geometry?.coordinates || [[]],
          };
          setData(sanitizedData);
        }
        setShowSearchResult("Success");
        setResponseMessage("");
      } else {
        setResponseMessage("No Such Agreement Found, Please Try Again!");
      }
    } catch (e) {
      console.log(e);
      setShowSearchResult("Failed");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("search changed");
  }, [data]);

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch();
  };
  //if (loading) return <><CircularProgress/></>
  return (
    <Container>
      <Paper
        sx={{ width: "100vw", maxWidth: showSearchResult ? "100vw" : 400 }}
        elevation={3}
        display="flex"
        flexDirection="row"
      >
        <Box component="form" onSubmit={handleSubmit} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" noWrap>
                Re/Print Deed
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Agreement ID"
                variant="outlined"
                value={agreementId}
                onChange={e => setAgreementId(e.target.value)}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSearch} startIcon={<Search />}>
                Search
              </Button>
            </Grid>
            {responseMessage && (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  {responseMessage}
                </Typography>
              </Grid>
            )}
            {loading && <CircularProgress sx={{ fill: "green" }} />}
            {showSearchResult && (
              <Grid item xs={12}>
                <ReactToPrint
                  trigger={() => (
                    <Button variant="contained" color="primary" startIcon={<Print />}>
                      <Box px={2} color="white">
                        {"Print"}
                      </Box>
                    </Button>
                  )}
                  content={() => contentRef.current}
                />
                {data ? <AgreementPrintLayout agreementDetail={data} spatialInfo={spatialInfo} ref={contentRef} /> : "No Data Found!" }
                {
                  //<DeedToPrint dataToPrint={data} ref={contentRef} /> : "No Data Found!"
                  }
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
