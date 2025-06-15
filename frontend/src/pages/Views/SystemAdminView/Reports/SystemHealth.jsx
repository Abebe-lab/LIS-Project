import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
//import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";
//import IPDCFormHeader from "../../../../components/Forms/IPDCFormHeader";

function SystemHealth() {
  const [systemStatus, setSystemStatus] = useState("healthy");
  const [statusColor, setStatusColor] = useState("green");

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        //const status=await GetDataFromApiWithParams("");
        //console.log(status);

        //if(status){
        setSystemStatus("healthy");
        setStatusColor("green");
        /*}else{
//          setSystemStatus("Network interupted");
  //        setStatusColor("error");
    //    }*/
      } catch (error) {
        setSystemStatus("Network interupted");
        setStatusColor("red");
      }
    };

    const intervalId = setInterval(checkNetwork, 5000); // Check network every 50 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", sm: "50%" },
        verticalAlign: "middle",
        maxWidth: "400px",
        margin: "0 auto", // centers the paper if less than full width
      }}
    >
      <Box p={{ xs: 2, md: 10 }} m={1}>
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontSize: { xs: "1rem", sm: "1.5rem" },
            color: statusColor,
          }}
        >
          System Status:
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="center" spacing={1}>
          <HealthAndSafetyIcon fontSize="large" sx={{ fill: statusColor }} />
          <Chip
            label={systemStatus}
            variant="outlined"
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          />
        </Stack>
      </Box>
    </Paper>
  );
}

export default SystemHealth;
