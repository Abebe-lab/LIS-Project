import React, { useEffect, useState } from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ConsultantList, ContractorList } from "../../../../Shared/PreRenderedComponents";

import { GetDataFromApiWithParams } from "../../../../../../services/api/ExecuteApiRequests";

const requestTypes = ["New", "Modification", "Extension", "Maintenance", "Demolition"];
const initialSearchResult = {
  titleDeedNo: "",
  park: "",
  upin: "",
  investor: "",
  tin_no: "",
};

function GeneralInfoTab({
  requestDate,
  setRequestDate,
  requestType,
  setRequestType,
  agreementId,
  setAgreementId,
  consultant,
  setConsultant,
  contractor,
  setContractor,
}) {
  const [infoFromAgreement, setInfoFromAgreement] = useState(initialSearchResult);

  const handleAgreementInfoSearch = async () => {
    try {
      if (agreementId) {
        const resultRow = await GetDataFromApiWithParams(`agreements/${agreementId}`, null);
        //console.log(resultRow);
        if (resultRow && resultRow.length) {
          const data = resultRow[0];
          setInfoFromAgreement({
            titleDeedNo: (data.titleDeedNo && data.titleDeedNo) || "",
            park: data.park_name || "",
            upin: data.upin || "",
            investor: data.company_name || "",
          });
        } else {
          setInfoFromAgreement(initialSearchResult);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Log the changes to ensure the state is updating
    console.log("infoFromAgreement updated:", infoFromAgreement);
  }, [infoFromAgreement]);

  return (
    <Grid container spacing={2} paddingLeft={6} paddingRight={6}>
      <Grid item xs={12} md={12}>
        <TextField
          label="Request Date"
          type="date"
          value={requestDate}
          onChange={e => setRequestDate(e.target.value)}
          fullWidth={true}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl fullWidth={true}>
          <InputLabel>Type of Request</InputLabel>
          <Select value={requestType} onChange={e => setRequestType(e.target.value)} required>
            {requestTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={10} md={10}>
        <TextField
          label="Agreement ID"
          value={agreementId}
          onChange={e => setAgreementId(e.target.value)}
          fullWidth={true}
        />
      </Grid>
      <Grid item xs={2} md={2} alignContent={"center"}>
        <Button variant="outlined" endIcon={<Search />} onClick={handleAgreementInfoSearch}>
          Find
        </Button>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField label="UPIN" value={infoFromAgreement.upin} fullWidth={true} disabled />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField label="Investor" value={infoFromAgreement.investor} fullWidth={true} disabled />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField label="Title Deed No" value={infoFromAgreement.titleDeedNo} fullWidth={true} disabled />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField label="Park" value={infoFromAgreement.park} fullWidth={true} disabled />
      </Grid>
      <Grid item xs={12} md={6}>
        <ConsultantList selectedConsultant={consultant} setSelectedConsultant={setConsultant} />
        <Link to="/registerConsultant" style={{ marginLeft: "10px" }}>
          Register Consultant
        </Link>
      </Grid>
      <Grid item xs={12} md={6}>
        <ContractorList selectedContractor={contractor} setSelectedContractor={setContractor} />
        <Link to="/registerContractor" style={{ marginLeft: "10px" }}>
          Register Contractor
        </Link>
      </Grid>
    </Grid>
  );
}

export default GeneralInfoTab;
