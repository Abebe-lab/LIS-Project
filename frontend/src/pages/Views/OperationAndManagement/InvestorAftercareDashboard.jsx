import React, { useEffect, useState } from "react";
import { IPDCWelcomeMessage } from "../../../components";
import {
  ReferredResponseCard,
  InvestorActivityReportCard,
  ParksByOccupancyCard,
  FinanceSummaryCard,
  ParksBySectorCard,
} from "../Shared/DashboardCards";
import { Container, Grid } from "@mui/material";
import ViewMessageList from "../Shared/Message/ViewMessageList";

export default function InvestorAftercareDashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="Investor Aftercare & Supervison" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FinanceSummaryCard />
          {
            //<IPDCCardV2 title="Investor Activities" content={activitiesData} contentType="chart-bar" link="/#" showMoreButton={false}/>
          }
        </Grid>
        <Grid item xs={12} md={4}>
          <ParksByOccupancyCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ParksBySectorCard wrapLegendText={true} />
        </Grid>

        <Grid item xs={12} md={8}>
          <InvestorActivityReportCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ReferredResponseCard />
        </Grid>
        <Grid item xs={12}>
          <ViewMessageList />
        </Grid>
      </Grid>
    </Container>
  );
}
