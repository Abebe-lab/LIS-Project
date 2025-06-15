import {Fragment} from "react";
import { Grid, Typography } from "@mui/material";
import { StripUnderscoreAndCapitalizeLeters } from "./Formatting";
export default function DisplayTableInGrid({ data }) {
  return (
    <>
    {(data && data.length) ? <Grid container spacing={1}>
      {Object.entries(data[0]).map(([key, value]) => (
        <Fragment key={key}>
          <Grid item xs={8} md={8}>
            <Typography variant="body1" color="textSecondary">
              {StripUnderscoreAndCapitalizeLeters(key)}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body1">
              {value !== null ? value : "-"}
            </Typography>
          </Grid>
        </Fragment>
      ))}
    </Grid>:<Typography>No Data To fectch!</Typography>}
    </>
  );
}
