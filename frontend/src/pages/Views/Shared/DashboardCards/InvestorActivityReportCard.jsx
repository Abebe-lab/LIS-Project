import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinearProgress, Typography } from "@mui/material";
import { TransferWithinAStation } from "@mui/icons-material";

import { IPDCFinalTable } from "../../../../components";
import WideChartContainer from "../../../../components/Charts/WideChartContainer";

import {ExecuteApiRequest, GetDataFromApiWithParams} from "../../../../services/api/ExecuteApiRequests";

const InvestorActivityReportCard = () => {
  const [activitiesSummary, setActivitiesSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivitiesSummary = async () => {
      setIsLoading(true);
      try {
        const response = await GetDataFromApiWithParams("dashboard/executives/activitiesSummary");
        
        setActivitiesSummary(response || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching activities summary:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivitiesSummary();
  }, []);

  return (
    <Link to="/execActivities">
      {
        <WideChartContainer
          THECHART={
            isLoading ? (
              <LinearProgress />
            ) : (
              <>
                {activitiesSummary && activitiesSummary.length > 0 ?(
                  <IPDCFinalTable
                    data={activitiesSummary}
                    setData={setActivitiesSummary}
                    showHeader={false}
                    isSearchable={false}
                  />
                ):<Typography>There is no activity data yet.</Typography>}
              </>
            )
          }
          title="Investor Activity Report"
          link="/execActivities"
          showMoreButton={false}
          avatar={<TransferWithinAStation />}
        />
      }
    </Link>
  );
};

export default InvestorActivityReportCard;
//import { DashboardProvider } from "../../../services/contexts/DashboardProvider";
//import { useDashboardData } from "../../../services/hooks/useDashboardData";

/*const SummaryReport = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Export Summary
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.exportSummary}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Import Summary
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.importSummary}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Employment Summary
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.employmentSummary}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Import Substitution
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.importSubstitution}</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="subtitle1" component="div">
          Linkage
        </Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography variant="body1">{data.linkage}</Typography>
      </Grid>
    </Grid>
  );
};*/
