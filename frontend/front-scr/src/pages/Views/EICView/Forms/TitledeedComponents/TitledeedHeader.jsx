import React from "react";
import { Box, Typography, Grid } from '@mui/material';
import { EICLogo, Flag } from "../../../../../assets/image/print";


const TitledeedHeader = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box component="img" src={EICLogo} alt="EIC logo" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ</Typography>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>Federal Democratic Republic of Ethiopia</Typography>
        </Grid>
        <Grid item xs={2}>
          <Box component="img" src={Flag} alt="Flag" sx={{ width: 100, height: 100, borderRadius: '50%' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TitledeedHeader;