import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //backgroundColor: theme.palette.primary.main,
  //color: theme.palette.common.white,
  fontWeight: "bold",
}));

const ReportTemplate = React.forwardRef(({ apiEndpoint, title, selectedColumns }, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GetDataFromApiWithParams(apiEndpoint);
        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [apiEndpoint]);

  if (loading) {
    return <CircularProgress />;
  }

  const columns = data && data.length ? Object.keys(data[0]) : [];

  return (
    <Paper ref={ref} style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
              //columns?.length>0
              columns &&
                columns.length &&
                columns
                  ?.filter((column) => selectedColumns?.includes(column))
                  ?.map((column) => <StyledTableCell key={column}>{column}</StyledTableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length &&
              data?.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns &&
                    columns.length &&
                    columns
                      .filter((column) => selectedColumns.includes(column))
                      .map((column) => <TableCell key={column}>{row[column]}</TableCell>)}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});

export default ReportTemplate;
