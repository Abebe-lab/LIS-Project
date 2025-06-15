import React from "react";
import { TextField, FormControl, Select, MenuItem, Grid, InputLabel } from "@mui/material";

const SearchAndFilter = ({ columns, searchQuery, filterColumn, setSearchQuery, setFilterColumn }) => (
  <Grid container spacing={2} alignItems="center">
    <Grid item xs={3} md={3}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        margin="normal"
        fullWidth={true}
      />
    </Grid>
    <Grid item xs={3} md={3}>
      <FormControl fullWidth={true}>
        <InputLabel id="filter-column-label">Filter based on</InputLabel>
        <Select value={filterColumn} onChange={e => setFilterColumn(e.target.value)}>
          {columns?.length > 0 &&
            columns?.map(column => (
              <MenuItem key={column} value={column}>
                {column?.replace(/_/g, " ")?.toUpperCase()}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

export default SearchAndFilter;
