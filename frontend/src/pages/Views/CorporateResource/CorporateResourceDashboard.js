import { Grid } from "@mui/material";
import { FinanceSummaryCard, FinanceArrearCard, FinanceQuarterlyCollectionVsArrear } from "../Shared/DashboardCards";
import { IPDCWelcomeMessage } from "../../../components";
import ViewMessageList from "../Shared/Message/ViewMessageList";
import { Container } from "@mui/material";

export default function CorporateResourceDashboard() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="Corporate Resource Management" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FinanceSummaryCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <FinanceArrearCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <FinanceQuarterlyCollectionVsArrear />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <ViewMessageList isSearchable={true} />
        </Grid>
      </Grid>
    </Container>
  );
}
