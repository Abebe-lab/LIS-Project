import React, { useEffect, useState } from 'react';
import { Button, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import BuildingPermitCertificate from './BpAndOPPrint/BuildingPermitCertificate'; // Assuming this is the name of your component
import { ExecuteApiRequest, ExecutePostWithParams, GetDataFromApiWithParams } from '../../../../services/api/ExecuteApiRequests';

const ApproveAndPrintBP = () => {
  const [buildingPermits, setBuildingPermits] = useState([]);

  useEffect(() => {
    const fetchBuildingPermits = async () => {
      try {
        const response = await GetDataFromApiWithParams(`buildingpermits`);
        setBuildingPermits(response);
      } catch (error) {
        console.error('Error fetching building permits:', error);
      }
    };

    fetchBuildingPermits();
  }, []);

  const handleApproveAndPrint = async (buildingPermit) => {
    // Implement your approval logic here, if needed
    // ...

    try {
      const responseData = await GetDataFromApiWithParams(`buildingpermits/${buildingPermit.id}`);
      console.log("response: ", responseData);
    } catch (error) {
      console.error('Error fetching building permit details:', error);
    }
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Request No.</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildingPermits.map((buildingPermit) => (
            <TableRow key={buildingPermit.id}>
              <TableCell>{buildingPermit.requestNo}</TableCell>
              <TableCell>{buildingPermit.companyName}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleApproveAndPrint(buildingPermit)}>
                  Approve & Print
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Box>
  );
};

export default ApproveAndPrintBP;