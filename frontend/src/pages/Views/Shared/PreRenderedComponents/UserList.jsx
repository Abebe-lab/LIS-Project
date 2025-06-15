import React, { useEffect, useState } from "react";
import { GetUsers } from "../CommonData/CommonData";
import { Autocomplete, TextField } from "@mui/material";

export default function UserList({ selectedUser, setSelectedUser, isRequired = true }) {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersData(await GetUsers());
    };
    fetchUsers();
  }, []);

  return (
    <Autocomplete
      fullWidth={true}
      options={usersData}
      getOptionLabel={(option) => option.full_name} // Display user's full name
      value={selectedUser}
      onChange={(event, newValue) => {
        setSelectedUser(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a User"
          variant="outlined"
          required={isRequired}
        />
      )}
    />
  );
}
