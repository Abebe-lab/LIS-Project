import { Link } from "react-router-dom";

import { Container, Grid } from "@mui/material";
import { Map, RoundaboutLeft } from "@mui/icons-material";

import { IPDCWelcomeMessage } from "../../../../components"; //IPDCMessageCard
import { WideChartContainer } from "../../../../components/Charts";
import { ShedParcelRatioCard, ImportedAndEditedCard, LandUseProportionCard } from "../Head/DashboardDetail";
import { infraImg, cadastreImg, planningImg } from "../../../../assets/image/dashboard";
import ViewMessageList from "../../Shared/Message/ViewMessageList";

export default function MasterPlanHeadDashboard() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <IPDCWelcomeMessage messageTitle="MP & LB" />
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
        <Grid item xs={12} md={4}>
          <LandUseProportionCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <ShedParcelRatioCard />
        </Grid>

        <Grid item xs={12} md={4}>
          <ImportedAndEditedCard />
        </Grid>

        <Grid item xs={12}>
          <ViewMessageList isSearchable={true} />
        </Grid>
      </Grid>
    </Container>
  );
}
