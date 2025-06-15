import React from "react";
import { Box, Typography, Grid } from '@mui/material';
import TitleDeedCoordinateTable from './TitleDeedCoordinateTable'; // Assuming this component is separated

const TitledeedBody = ({ dataToPrint }) => {
  const { 
    parkName, region, UPIN, description, natureOfTitle, area, titleDeedNo,
    applicationDate, documentType, serviceType, idOrPassportNo, fullName, address, 
    entryDate, endingDate, encumbranceNature, documentNo, coordinates
  } = dataToPrint;

  return (
    <Box sx={{ padding: 2 }}>
      {/* Here you can structure your content with MUI Grid for better layout management */}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>ሀ. የይዞታ መግለጫ ክፍል</Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>A. PROPERTY SECTION</Typography>
      
      {/* Example of how to structure one section */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h6">እንዱስትሪ ፓርክ ስም</Typography>
          <Typography variant="body1">Industrial Park Name:</Typography>
          <Typography variant="h5">{parkName}</Typography>
        </Grid>
        {/* ... other grid items */}
      </Grid>

      {/* Proprietorship Section */}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>ለ. የባለይዞታው መረጃ ክፍል</Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>B. PROPRIETORSHIP SECTION</Typography>
      <Grid container spacing={2}>
        {/* ... similar structure for other fields */}
        <Grid item xs={12}>
          <TitleDeedCoordinateTable coordinates={coordinates} />
        </Grid>
      </Grid>

      {/* Restriction & Responsibility Section */}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>ሐ. ክልከላና ኃላፊነት ክፍል</Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>C. Restriction & Responsibility Section</Typography>
      <Grid container spacing={2}>
        {/* ... */}
      </Grid>
    </Box>
  );
};

export default TitledeedBody;