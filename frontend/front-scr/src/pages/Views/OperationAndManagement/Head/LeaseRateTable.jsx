import React, { useState, useEffect } from "react";
//prettier-ignore
import { Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add as AddIcon } from "@mui/icons-material";

const LeaseRateTable = () => {
  const [leaseRates, setLeaseRates] = useState([]);
  const [editRow, setEditRow] = useState(null);
  //prettier-ignore
  const [newRow, setNewRow] = useState({id: '', park_id: '',type_of_property: '', from: '', to: '', amount: '', description: '', adjusted_by: '' });

  useEffect(() => {
    fetchLeaseRates();
  }, []);

  const fetchLeaseRates = async () => {
    try {
      const response = await fetch("/api/lease-rates");
      const rates = await response.json();
      setLeaseRates(rates);
    } catch (error) {
      console.error("Error fetching lease rates:", error);
    }
  };

  // Edit existing row
  const handleEditClick = rate => {
    setEditRow(rate);
  };

  // Save edited row
  const handleSaveClick = async rate => {
    try {
      const response = await fetch(`/api/lease-rates/${rate.no}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rate),
      });

      if (!response.ok) {
        throw new Error("Failed to update lease rate");
      }

      setEditRow(null);
      fetchLeaseRates();
    } catch (error) {
      console.error("Error updating lease rate:", error);
    }
  };

  // Add new row
  const handleAddNewRow = () => {
    setLeaseRates([...leaseRates, { ...newRow, id: Date.now() }]); // Use timestamp as a temporary ID
    //prettier-ignore
    setNewRow({ id: "",park_id: "", type_of_property: "", from: "", to: "", amount: "", description: "", adjusted_by: "" });
  };

  // Handle changes in the form for new row or edit
  const handleChange = (e, field, isNew = false) => {
    if (isNew) {
      setNewRow(prev => ({ ...prev, [field]: e.target.value }));
    } else {
      setLeaseRates(rates => rates.map(rate => (rate.no === editRow.no ? { ...rate, [field]: e.target.value } : rate)));
    }
  };

  // Save new row to API
  const handleSaveNewRow = async () => {
    try {
      const response = await fetch("/api/lease-rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });

      if (!response.ok) {
        throw new Error("Failed to add new lease rate");
      }

      // Refresh data after adding new row
      fetchLeaseRates();
    } catch (error) {
      console.error("Error adding new lease rate:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Lease Rates</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="lease rates table">
            <TableHead>
              <TableRow>
                <TableCell>Park ID</TableCell>
                <TableCell>Type of Property</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Adjusted By</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaseRates.map(rate => (
                <TableRow key={rate.no}>
                  <TableCell>{rate.park_id}</TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <TextField value={rate.type_of_property} onChange={e => handleChange(e, "type_of_property")} />
                    ) : (
                      rate.type_of_property
                    )}
                  </TableCell>
                  {/* ... (same for other fields) */}
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <Button onClick={() => handleSaveClick(rate)}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEditClick(rate)}>Edit</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {/* New Row */}
              <TableRow>
                {Object.keys(newRow).map(
                  key =>
                    key !== "no" && (
                      <TableCell key={key}>
                        <TextField
                          value={newRow[key]}
                          onChange={e => handleChange(e, key, true)}
                          label={key.split("_").join(" ")}
                          type={key === "from" || key === "to" || key === "amount" ? "number" : "text"}
                        />
                      </TableCell>
                    ),
                )}
                <TableCell>
                  <IconButton onClick={handleAddNewRow}>
                    <AddIcon />
                  </IconButton>
                  <Button onClick={handleSaveNewRow}>Save New</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default LeaseRateTable;
