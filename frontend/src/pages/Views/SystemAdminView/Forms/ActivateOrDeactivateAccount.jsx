import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Sort as SortIcon } from "@mui/icons-material";
import FormContainer from "../../../../components/Forms/FormContainer";
import { GetUsers } from "../../Shared/CommonData/CommonData";
import { UpdateAndGetResponse } from "../../../../services/api/ExecuteApiRequests";
import { IPDCToastMessageResult } from "../../../../components/Controls";
import { UserWithAvatar } from "../../Shared/CommonData/FetchImagesFromServer";

const ActivateOrDeactivateAccount = ({ title, onSubmit }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const extractedUsers = await GetUsers();
        const notCurrentUser = extractedUsers?.filter(eachUser => eachUser.id !== localStorage.getItem("user-id"));
        setUsers(notCurrentUser);
      } catch (error) {
        console.error("Error fetching users:", error);
        setToastMessage({ message: "Failed to load users. Please try again.", type: "error" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusToggle = async userId => {
    setIsLoading(true);
    try {
      const result = await UpdateAndGetResponse(`users/${userId}/activateDeactivate`, new FormData());
      if (result?.length === 0) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId
              ? {
                  ...user,
                  status: user.status.toLowerCase() === "active" ? "inactive" : "active",
                }
              : user,
          ),
        );
        const currentUser = users.find(user => user.id === userId);
        setToastMessage({
          message: "User account status changed!",
          type: currentUser.status.toLowerCase() === "active" ? "warning" : "success",
        });
      }
    } catch (error) {
      console.error(error);
      setToastMessage({ message: "Error occurred while altering the user account, please try again.", type: "error" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const requestSort = key => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    console.log(`Sorting by ${key} in ${direction} order`); // Debug log
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = name => {
    if (!sortConfig.key) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const sortUsers = (usersToSort, config) => {
    const { key, direction = "asc" } = config;
  
    const statusOrder = ["NEW", "active", "RESET", "inactive"]; // Define custom status order
  
    if (!key) {
      // Default to status sorting if no key is provided
      return [...usersToSort].sort((a, b) => {
        const aStatusIndex = statusOrder.indexOf(a.status) >= 0 ? statusOrder.indexOf(a.status) : statusOrder.length;
        const bStatusIndex = statusOrder.indexOf(b.status) >= 0 ? statusOrder.indexOf(b.status) : statusOrder.length;
        return aStatusIndex - bStatusIndex;
      });
    }
  
    return [...usersToSort].sort((a, b) => {
      const aValue = String(a[key] ?? "").trim();
      const bValue = String(b[key] ?? "").trim();
  
      const comparison =
        direction === "asc"
          ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
          : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
  
      if (comparison !== 0) return comparison;
  
      // If equal, fall back to status sorting
      const aStatusIndex = statusOrder.indexOf(a.status) >= 0 ? statusOrder.indexOf(a.status) : statusOrder.length;
      const bStatusIndex = statusOrder.indexOf(b.status) >= 0 ? statusOrder.indexOf(b.status) : statusOrder.length;
      return aStatusIndex - bStatusIndex;
    });
  };
  
  const sortedUsers = useMemo(() => {
    console.log("Recomputing sorted users with sortConfig:", sortConfig);
    let sortableUsers = [...users];
    sortableUsers = sortUsers(sortableUsers, sortConfig);
    console.log("Sorted Users:", sortableUsers);
    return sortableUsers;
  }, [users, sortConfig]);
  

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(
      user =>
        (!statusFilter || user.status === statusFilter) &&
        (!searchTerm ||
          Object.values(user).some(value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))),
    );
  }, [sortedUsers, statusFilter, searchTerm]);

  return (
    <Container>
      <FormContainer title={title} onSubmit={onSubmit} showButton={false}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth={true}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth={true} variant="outlined">
              <InputLabel>Status Filter</InputLabel>
              <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label="Status Filter">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="NEW">New</MenuItem>
                <MenuItem value="RESET">Reset</MenuItem>
                <MenuItem value="inactive">Inactive/Deactivated</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <CircularProgress sx={{ margin: "auto" }} /> // Center the loading spinner
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell onClick={() => requestSort("id")}>
                        ID {getClassNamesFor("id") && <SortIcon />}
                      </TableCell>
                      <TableCell onClick={() => requestSort("full_name")}>
                        Full Name {getClassNamesFor("full_name") && <SortIcon />}
                      </TableCell>
                      <TableCell onClick={() => requestSort("email")}>
                        Email {getClassNamesFor("email") && <SortIcon />}
                      </TableCell>
                      <TableCell onClick={() => requestSort("status")}>
                        Status {getClassNamesFor("status") && <SortIcon />}
                      </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id + user.full_name}>
                        <TableCell>
                          <UserWithAvatar profile_picture={user?.profile_picture} alternativeText={user.full_name} />
                        </TableCell>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell sx={{ color: user.status.toLowerCase() === "active" ? "green" : "red" }}>
                          {user.status}
                        </TableCell>
                        <TableCell>
                          {user.status !== "RESET" && (
                            <Button
                              variant="contained"
                              disabled={isLoading}
                              color={user.status.toLowerCase() === "active" ? "secondary" : "primary"}
                              onClick={() => handleStatusToggle(user.id)}
                            >
                              {user.status.toLowerCase() === "active" ? "Deactivate" : "Activate"}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </FormContainer>
      {toastMessage && <IPDCToastMessageResult message={toastMessage.message} type={toastMessage.type} />}
    </Container>
  );
};

export default ActivateOrDeactivateAccount;
