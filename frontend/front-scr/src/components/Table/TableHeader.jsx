import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/system";
//prettier-ignore
const StyledTableCell = styled(TableCell)(({ theme }) => ({ fontWeight: "bold", textAlign: "center", padding: "8px",
    whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-word", maxHeight: "4.5em", lineHeight: "1.5em" }));
//prettier-ignore
const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({ backgroundColor: "#42a147",color: "white",}));
const TableHeader = ({ selectedColumns, columns, isMessage, hasAttachment, showActions = false }) => (
  <TableHead>
    <TableRow>
      {isMessage && <StyledTableHeadCell>Seen</StyledTableHeadCell>}
      {columns?.length > 0 &&
        columns
          .filter(column => selectedColumns?.includes(column))
          .map(column => (
            <StyledTableHeadCell key={column}>{column.replace(/_/g, " ").toUpperCase()}</StyledTableHeadCell>
          ))}
      {hasAttachment && <StyledTableHeadCell>Attachment</StyledTableHeadCell>}
      {showActions && <StyledTableHeadCell>Actions</StyledTableHeadCell>}
    </TableRow>
  </TableHead>
);

export default TableHeader;
