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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";

import { GetDataFromApiWithParams } from "../../services/api/ExecuteApiRequests";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  /*backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,*/
  fontWeight: "bold",
}));

const EditableSearchableAndPrintableTable = React.forwardRef(({ apiEndpoint, title, selectedColumns }, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColumn, setFilterColumn] = useState("");

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

  const handleEditClick = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditingData(data[rowIndex]);
  };

  const handleCancelClick = () => {
    setEditingRowIndex(null);
    setEditingData({});
  };

  const handleSaveClick = () => {
    if (!editingData) return;
    const updatedData = [...data];
    updatedData[editingRowIndex] = editingData;
    setData(updatedData);
    setEditingRowIndex(null);
    setEditingData({});
  };

  const handleDeleteClick = (rowIndex) => {
    if (!editingData) return;
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  const handleInputChange = (e, column) => {
    if (!editingData) return;
    setEditingData({
      ...editingData,
      [column]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilterColumn(e.target.value);
  };

  const filterAndSearchData = () => {
    if (!searchQuery && !filterColumn) {
      return data;
    }
    return data.filter((row) => {
      if (filterColumn) {
        return String(row[filterColumn]).toLowerCase().includes(searchQuery.toLowerCase());
      } else {
        return selectedColumns.some((column) => String(row[column]).toLowerCase().includes(searchQuery.toLowerCase()));
      }
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  const columns = data.length ? Object.keys(data[0]) : [];
  const filteredData = filterAndSearchData();

  return (
    <Paper ref={ref} style={{ padding: 16 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <Box mb={2} display="flex" justifyContent="space-between">
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          margin="normal"
          style={{ marginRight: 16 }}
        />
        <FormControl variant="outlined" margin="normal">
          <InputLabel>Filter Column</InputLabel>
          <Select value={filterColumn} onChange={handleFilterChange} label="Filter Column">
            {columns.map((column) => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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
            {filteredData.map((row, rowIndex) => (
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

export default EditableSearchableAndPrintableTable;
