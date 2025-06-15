import React from "react";
import { Grid, Box, Typography, Divider } from "@mui/material";

const SignatureSection = () => (
  <Grid container spacing={4} sx={{ mt: 4 }}>
    {[
      { role: "Prepared by" },
      { role: "Checked by" },
      { role: "Approved by" },
    ].map((signatory, index) => (
      <Grid item xs={4} key={index}>
        <Box>
          <Typography variant="body2" align="center" sx={{ fontWeight: "bold" }}>
            {signatory.role}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Name:
            </Typography>
            <Divider sx={{ borderBottomWidth: 1, mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              Position:
            </Typography>
            <Divider sx={{ borderBottomWidth: 1, mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              Signature:
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }} />
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default SignatureSection;
