import { Container, Grid } from "@mui/material"; // Grid version 2
import { IPDCWelcomeMessage } from "../../../../components";
import "./DACDashboard.css";
import { BPRequestVsResponseCard, OPRequestVsResponseCard } from "../Head/DashboardDetail";
import ViewMessageList from "../../Shared/Message/ViewMessageList";

export default function DaMDashboard() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="Design Management" />
        </Grid>
        <Grid item xs={12} md={6}>
          <BPRequestVsResponseCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <OPRequestVsResponseCard />
        </Grid>
        <Grid item xs={12}>
          <ViewMessageList isSearchable={true} />
        </Grid>
      </Grid>
    </Container>
  );
}
