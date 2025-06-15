import { Container, Grid } from "@mui/material";

import { IPDCWelcomeMessage } from "../../../../components"; //IPDCMessageCard
import {
  BPRequestVsResponseCard,
  OPRequestVsResponseCard,
  ShedParcelRatioCard,
  ImportedAndEditedCard,
  LandUseProportionCard,
} from "./DashboardDetail";

import ViewMessageList from "../../Shared/Message/ViewMessageList";

export default function LandInfraDevelopmentDashboard() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="L & I Development" />
        </Grid>
        <Grid item xs={12} md={6}>
          <BPRequestVsResponseCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <OPRequestVsResponseCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ImportedAndEditedCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <LandUseProportionCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ShedParcelRatioCard />
        </Grid>

        <Grid item xs={12}>
          <ViewMessageList isSearchable={true} />
        </Grid>
      </Grid>
    </Container>
  );
}
