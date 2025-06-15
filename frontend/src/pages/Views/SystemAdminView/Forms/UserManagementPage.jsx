import React, { useState, useEffect } from "react";
import { IPDCReportTemplate } from "../../../../components";
import { NavLink } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Button, Container } from "@mui/material";

import useDecodedUser from "../../../../services/hooks/useDecodedUser";

import { GetDataFromApiWithParams } from "../../../../services/api/ExecuteApiRequests";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const decodedUser = useDecodedUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await GetDataFromApiWithParams("users/summary");
      setUsers(response);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        {decodedUser?.role?.toLowerCase() !== "head" && (
          <NavLink style={{ position: "relative" }} to="/registerUser">
            <Button startIcon={<Add sx={{ fill: "white" }} />} variant="contained" color="success">
              Add new user
            </Button>
          </NavLink>
        )}
      </Container>
      {users && users?.length > 0 ? (
        <IPDCReportTemplate
          title={"System Users"}
          data={users}
          setData={setUsers}
          isPrintable={false}
          isEditable={false}
          showHeader={false}
          isDeletable={false}
        />
      ) : (
        <>{"No Log Data"}</>
      )}
    </>
  );
}
