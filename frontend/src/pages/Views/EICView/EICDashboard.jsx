import { Container, Grid } from "@mui/material";
import { IPDCWelcomeMessage } from "../../../components";
import ViewMessageList from "../Shared/Message/ViewMessageList";
import { ParksByOccupancyCard, ParksBySectorCard, ReferredResponseCard } from "../Shared/DashboardCards";
// FinanceSummaryCard,
//InvestorActivityReportCard,
export default function EICDashboard() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="E.I.C." />
        </Grid>
        <Grid item xs={12} md={12}>
          <ReferredResponseCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ParksBySectorCard wrapLegendText={true} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ParksByOccupancyCard />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ViewMessageList isSearchable={true} />
      </Grid>
    </Container>
  );
}
