import { Container, Grid } from "@mui/material";
import { IPDCWelcomeMessage } from "../../../components";
import ViewMessageList from "../Shared/Message/ViewMessageList";
import SystemHealthCard from "./DashboardDetail/SystemHealthCard";
import UserStasticsCard from "./DashboardDetail/UserStasticsCard";

const SystemAdminProfessionalDashboard = () => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="System Administrator" />
        </Grid>
        <Grid item xs={12} md={8}>
         <SystemHealthCard/>
        </Grid>
        <Grid item xs={12} md={4}>
          <UserStasticsCard/>
        </Grid>
      </Grid>
      <Grid container spacing={1} pt={1}>
        <Grid item xs={12}>
          <ViewMessageList isSearchable={false} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default SystemAdminProfessionalDashboard;
