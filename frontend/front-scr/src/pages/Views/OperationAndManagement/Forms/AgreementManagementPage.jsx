import React, { useState, useEffect } from "react";
import { IPDCReportTemplate } from "../../../../components";
import { NavLink } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";

import useDecodedUser from "../../../../services/hooks/useDecodedUser";

import {GetDataFromApiWithParams} from "../../../../services/api/ExecuteApiRequests";

export default function AgreementManagementPage() {
  const [users, setUsers] = useState([]);
  const decodedUser = useDecodedUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await GetDataFromApiWithParams("agreements");
      setUsers(response);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Box pl={2}>
        {decodedUser?.role !== "head" && (
          <NavLink style={{ position: "relative" }} to="/registerAgreement">
            <Add /> Add new agreement
          </NavLink>
        )}
      </Box>
      {users && users.length > 0 ? (
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
