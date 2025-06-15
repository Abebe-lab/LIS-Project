import { Container, Grid } from "@mui/material";
import { HealthAndSafety, PeopleAlt } from "@mui/icons-material";
import { IPDCWelcomeMessage, IPDCCardV2 } from "../../../components";
import ViewMessageList from "../Shared/Message/ViewMessageList";
import { Link } from "react-router-dom";

const userStasticsData = [
  { date: "2024-07-17", "Active Users": 1200, "New Users": 50,  "Avg Duration": 300 },
  { date: "2024-07-18", "Active Users": 1300, "New Users": 60, "Avg Duration": 310 },
  { date: "2024-07-19", "Active Users": 1100, "New Users": 45, "Avg Duration": 290 },
  { date: "2024-07-20", "Active Users": 1400, "New Users": 70,  "Avg Duration": 320 },
  { date: "2024-07-21", "Active Users": 1350, "New Users": 65, "Avg Duration": 305 },
  { date: "2024-07-22", "Active Users": 1500, "New Users": 80,  "Avg Duration": 330 },
  { date: "2024-07-23", "Active Users": 1450, "New Users": 75,  "Avg Duration": 315 },
];
const healthData = [
  { date: "2024-07-17", responseTime: 200, errorRate: 1, uptime: 99 },
  { date: "2024-07-18", responseTime: 210, errorRate: 1.5, uptime: 99.5 },
  { date: "2024-07-19", responseTime: 180, errorRate: 1.2, uptime: 99.2 },
  { date: "2024-07-20", responseTime: 190, errorRate: 1, uptime: 99.8 },
  { date: "2024-07-21", responseTime: 220, errorRate: 2, uptime: 98.7 },
  { date: "2024-07-22", responseTime: 170, errorRate: 0.8, uptime: 99.9 },
  { date: "2024-07-23", responseTime: 160, errorRate: 1, uptime: 99.6 },
];
const SystemAdminDashboard = () => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="System Administrator" />
        </Grid>
        <Grid item xs={12} md={8}>
          <Link to="/systemHealth">
            <IPDCCardV2
              title="System Health"
              content={healthData}
              contentType="special-health"
              link="/systemHealth"
              showMoreButton={false}
              avatar={<HealthAndSafety />}
            />
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link to="/SystemLog">
            <IPDCCardV2
              title="User Stastics"
              content={userStasticsData}
              contentType="user-statistics"
              link="/SystemLog"
              showMoreButton={false}
              avatar={<PeopleAlt />}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={1} pt={1}>
        <Grid item xs={12}>
          {/*<IPDCMessageCard cardTitle="Message" cardContent="No Messages" open={true} />*/}
          <ViewMessageList isSearchable={false} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default SystemAdminDashboard;
