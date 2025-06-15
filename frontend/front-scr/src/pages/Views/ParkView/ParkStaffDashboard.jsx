import { Container, Grid } from "@mui/material";

import { IPDCWelcomeMessage } from "../../../components"; //IPDCMessageCard
import {
  ParksBySectorCard,
  ParksByOccupancyCard,
  HandoverCard
} from "../Shared/DashboardCards";
import ViewMessageList from "../Shared/Message/ViewMessageList";
import useDecodedUser from "../../../services/hooks/useDecodedUser";
export default function ParkStaffDashboard() {
  const decodedUser = useDecodedUser();
  //console.log(decodedUser);
    return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="Park Staff" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ParksByOccupancyCard />
        </Grid>
        <Grid item xs={12} md={6}>
        <ParksBySectorCard parkId={decodedUser?.park_id} wrapLegendText={true} />
        </Grid>
        <Grid item xs={12} md={12}>
          <HandoverCard/>
        </Grid>

        <Grid item xs={12}>
          <ViewMessageList isSearchable={true} />
        </Grid>
      </Grid>
    </Container>
  );
}
