// components/LogsTable.js
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

const IPDCLogsTable = ({ userId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const responseData = await GetDataFromApiWithParams(userId ? "logs/" + userId : "logs");
        setLogs(responseData);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [userId]);

  return (
    <Paper>
      <Typography variant="h6" component="div" style={{ padding: 2 }}>
        Logs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs && logs.length > 0 ? (
            logs.map(log => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.user_id}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{JSON.stringify(log.details)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No Logs Found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default IPDCLogsTable;
