import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RentalRatesTable = () => {
  // State for holding all rental rates
  const [rentalRates, setRentalRates] = useState([]);
  // State for holding the current row being edited
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    fetchRentalRates();
  }, []);

  const fetchRentalRates = async () => {
    try {
      const response = await fetch('/api/rental-rates');
      const rates = await response.json();
      setRentalRates(rates);
    } catch (error) {
      console.error('Error fetching rental rates:', error);
    }
  };

  const handleEditClick = (rate) => {
    setEditRow(rate);
  };

  const handleSaveClick = async (rate) => {
    try {
      const response = await fetch(`/api/rental-rates/${rate.no}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rate)
      });

      if (!response.ok) {
        throw new Error('Failed to update rental rate');
      }

      setEditRow(null); // Stop editing
      fetchRentalRates(); // Refresh data
    } catch (error) {
      console.error('Error updating rental rate:', error);
    }
  };

  const handleChange = (e, field) => {
    setRentalRates(rates => rates.map(rate => 
      rate.no === editRow.no ? {...rate, [field]: e.target.value} : rate
    ));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Rental Rates</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="rental rates table">
            <TableHead>
              <TableRow>
                <TableCell>Park Name</TableCell>
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
              {rentalRates.map((rate) => (
                <TableRow key={rate.no}>
                  <TableCell>{rate.park_name}</TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <TextField value={rate.type_of_property} onChange={(e) => handleChange(e, 'type_of_property')} />
                    ) : (
                      rate.type_of_property
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <TextField type="number" value={rate.from} onChange={(e) => handleChange(e, 'from')} />
                    ) : (
                      rate.from
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <TextField type="number" value={rate.to} onChange={(e) => handleChange(e, 'to')} />
                    ) : (
                      rate.to
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <TextField type="number" value={rate.amount} onChange={(e) => handleChange(e, 'amount')} />
                    ) : (
                      rate.amount
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <TextField value={rate.description} onChange={(e) => handleChange(e, 'description')} />
                    ) : (
                      rate.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <TextField value={rate.adjusted_by} onChange={(e) => handleChange(e, 'adjusted_by')} />
                    ) : (
                      rate.adjusted_by
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow && editRow.no === rate.no ? (
                      <Button onClick={() => handleSaveClick(rate)}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEditClick(rate)}>Edit</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default RentalRatesTable;