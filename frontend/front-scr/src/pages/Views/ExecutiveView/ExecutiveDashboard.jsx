import { Container, Grid } from "@mui/material";

import { IPDCWelcomeMessage } from "../../../components"; //IPDCMessageCard
import {
  ParksBySectorCard,
  FinanceSummaryCard,
  InvestorActivityReportCard,
  ReferredResponseCard,
} from "../Shared/DashboardCards";
import ViewMessageList from "../Shared/Message/ViewMessageList";

export default function ExecutiveDashboard() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="" />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReferredResponseCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ParksBySectorCard wrapLegendText={true} />
        </Grid>
        <Grid item xs={12} md={8}>
          <InvestorActivityReportCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <FinanceSummaryCard />
        </Grid>
        <Grid item xs={12}>
          <ViewMessageList isSearchable={true} />
        </Grid>
      </Grid>
    </Container>
  );
}
