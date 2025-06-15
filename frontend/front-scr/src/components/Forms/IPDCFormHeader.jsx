import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
export default function IPDCFormHeader({ title }) {
  const FormHeader = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    textAlign: "center",
    fontWeight: "bold",
  }));
  return (
    <FormHeader variant="h4" noWrap>
      {title}
    </FormHeader>
  );
}
