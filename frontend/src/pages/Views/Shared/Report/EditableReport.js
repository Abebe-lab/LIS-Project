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
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { GetDataFromApiWithParams } from "../../services/api/ExecuteApiRequests";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  /*backgroundColor: theme.palette.primary.main,
	color: theme.palette.common.white,*/
  fontWeight: "bold",
}));

const EditableReport = React.forwardRef(({ apiEndpoint, title, selectedColumns }, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  useEffect(() => {
    const fetchLogs = async () => {
      try {
		setLoading(true);
        const responseData = await GetDataFromApiWithParams(apiEndpoint);
        setData(responseData);
		setLoading(false);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [apiEndpoint]);

  const handleEditClick = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditingData(data[rowIndex]);
  };

  const handleCancelClick = () => {
    setEditingRowIndex(null);
    setEditingData({});
  };

  const handleSaveClick = () => {
    const updatedData = [...data];
    updatedData[editingRowIndex] = editingData;
    //tod send to save
    setData(updatedData);
    setEditingRowIndex(null);
    setEditingData({});
  };

  const handleDeleteClick = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  const handleInputChange = (e, column) => {
    setEditingData({
      ...editingData,
      [column]: e.target.value,
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  const columns = data.length ? Object.keys(data[0]) : [];

  return (
    <Paper ref={ref} style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns
                .filter((column) => selectedColumns.includes(column))
                .map((column) => (
                  <StyledTableCell key={column}>{column}</StyledTableCell>
                ))}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns
                  .filter((column) => selectedColumns.includes(column))
                  .map((column) => (
                    <TableCell key={column}>
                      {editingRowIndex === rowIndex ? (
                        <TextField value={editingData[column]} onChange={(e) => handleInputChange(e, column)} />
                      ) : (
                        row[column]
                      )}
                    </TableCell>
                  ))}
                <TableCell>
                  {editingRowIndex === rowIndex ? (
                    <>
                      <IconButton onClick={handleSaveClick}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancelClick}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditClick(rowIndex)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(rowIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});

export default EditableReport;
