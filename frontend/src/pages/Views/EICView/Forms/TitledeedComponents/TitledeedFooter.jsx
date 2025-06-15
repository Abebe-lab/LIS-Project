import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const TitledeedFooter = ({ dataToPrint }) => {
  const { entryDate, endingDate, encumbranceNature, documentNo } = dataToPrint;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        ሐ. ክልከላና ኃላፊነት ክፍል
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        C. Restriction & Responsibility Section
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h6">ግዴታ የተገባበት ቀን</Typography>
          <Typography variant="body1">Entry Date:</Typography>
          <Typography variant="h5">{entryDate}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">ግዴታው የሚያበቃበት ቀን</Typography>
          <Typography variant="body1">Date of Finishing:</Typography>
          <Typography variant="h5">{endingDate}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">የግዴታው ዓይነት</Typography>
          <Typography variant="body1">Nature of Encumbrance:</Typography>
          <Typography variant="h5">{encumbranceNature}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">ግዴታው የተመዘገበበት ሰነድ ቁጥር</Typography>
          <Typography variant="body1">Document No:</Typography>
          <Typography variant="h5">{documentNo}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TitledeedFooter;
