import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { IPDCCardV2 } from "../../components";
import { ImportExport, Factory } from "@mui/icons-material";
//import {IPDCCharts} from "../Controls";

function ReferedVsResponsePeriodic() {
  /*useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        //TODO: GET THE DATA
        //setReferredResponseData()
        //setParkByIndustryData()
        //setOccupancyData()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);*/
  const [referredResponseData, setReferredResponseData] = useState([
    { month: "January", Referred: 400, responses: 240 },
    { month: "February", Referred: 300, responses: 139 },
    { month: "March", Referred: 500, responses: 350 },
    { month: "April", Referred: 200, responses: 139 },
    { month: "May", Referred: 400, responses: 280 },
    { month: "June", Referred: 120, responses: 300 },
    { month: "July", Referred: 150, responses: 149 },
  ]);

  return (
    <>
      <IPDCCardV2
        title="Referred /Response"
        content={referredResponseData && referredResponseData}
        contentType="chart-eic"
        link="/viewReferredStatus"
        showMoreButton={false}
        avatar={<ImportExport />}
      />
    </>
  );
}
const ParkBySector = () => {
  const [parkByIndustryData, setParkByIndustryData] = useState([
    { industry: "Manufacturing", value: 400 },
    //{ "industry": "IT Services", "value": 300 },
    { industry: "Textile", value: 300 },
    { industry: "ICT", value: 200 },
    { industry: "Agro", value: 100 },
  ]);
  return (
    <>
      <IPDCCardV2
        title="Park by Sector"
        content={parkByIndustryData && parkByIndustryData}
        contentType="chart-park-by-industry"
        link="/viewParkList"
        showMoreButton={false}
        avatar={<Factory />}
      />
    </>
  );
};
const ParkByOccupancy = () => {
  const [occupancyData, setOccupancyData] = useState([
    { name: "Occupied", value: 75 },
    { name: "Vacant", value: 20 },
    { name: "Pending", value: 5 },
    { name: "Reserved", value: 5 },
  ]);
  return (
    <>
      <IPDCCardV2
        title="Occupancy"
        content={occupancyData}
        contentType="chart-pie"
        link="/viewParkList"
        showMoreButton={false}
        avatar={<Factory />}
      />
    </>
  );
};
const FinancialSummary = () => {
  const [occupancyData, setOccupancyData] = useState([
    { name: "Arrear", value: 75 },
    { name: "Collection", value: 20 },
    { name: "Uncollectable", value: 5 },
  ]);
  return (
    <>
      <IPDCCardV2
        title="Financial Summary"
        content={occupancyData}
        contentType="chart-pie"
        link="/viewParkList"
        showMoreButton={false}
        avatar={<Factory />}
      />
    </>
  );
};
const CEOSummaryReport = () => {
  const summaryData = {
    exportSummary: "$10M",
    importSummary: "$8M",
    employmentSummary: "2000 people",
    importSubstitution: "$5M",
    linkage: "200 Associations",
  };
  //get data from backend about export, import, employment, import substitution and linkage
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Export Summary
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.exportSummary}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Import Summary
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.importSummary}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Employment Summary
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.employmentSummary}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Import Substitution
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.importSubstitution}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Linkage
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.linkage}</Typography>
      </Grid>
    </Grid>
  );
};
const SummaryReport = () => {
  const summaryData = {
    exportSummary: "$10M",
    importSummary: "$8M",
    employmentSummary: "2000 people",
    importSubstitution: "$5M",
    linkage: "200 Associations",
  };
  return (
    <>
      {" "}
      <IPDCCardV2
        title="Summary Report"
        content={<SummaryReport data={summaryData} />}
        link="/viewParkList"
        showMoreButton={false}
        avatar={<Factory />}
      />
    </>
  );
};

export {
  ReferedVsResponsePeriodic,
  ParkBySector,
  ParkByOccupancy,
  CEOSummaryReport,
  SummaryReport,
  FinancialSummary,
};
