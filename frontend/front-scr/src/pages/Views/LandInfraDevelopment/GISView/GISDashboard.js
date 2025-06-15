import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { Map, RoundaboutLeft } from "@mui/icons-material";
import { IPDCWelcomeMessage } from "../../../../components";
import ViewMessageList from "../../Shared/Message/ViewMessageList";
import { infraImg, cadastreImg, planningImg } from "../../../../assets/image/dashboard";
import { WideChartContainer } from "../../../../components/Charts";

export default function GISDashboard() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="GIS Expert" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Link to="/viewCadastreMap">
            <WideChartContainer
              THECHART={<img src={cadastreImg} alt="Cadastre" height={150} width="100%" />}
              title="Cadastre"
              link="/viewCadastreMap"
              showMoreButton={false}
              avatar={<Map />}
            />
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link to="/infrastructureMap">
            <WideChartContainer
              THECHART={<img src={infraImg} alt={"Infrastructure"} height={150} width="100%" />}
              title="Infrastructure"
              link="/infrastructureMap"
              showMoreButton={false}
              avatar={<RoundaboutLeft />}
            />
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link to="/viewPlanningMap">
            <WideChartContainer
              THECHART={<img src={planningImg} alt={"Planning"} height={150} width="100%" />}
              title="Planning"
              link="/viewPlanningMap"
              showMoreButton={false}
              avatar={<RoundaboutLeft />}
            />
          </Link>
        </Grid>
        <Grid item xs={12} md={12}>
          <ViewMessageList />
        </Grid>
      </Grid>
    </Container>
  );
}
