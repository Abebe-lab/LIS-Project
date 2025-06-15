import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const AgreementDetailsSection = ({ agreementDetail }) => (
  <Table sx={{ mt: 2, border: "1px solid black", borderCollapse: "collapse", width: "100%" }}>
    {/* Header */}
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={{ border: "1px solid black" }} colSpan={2}>
        የቦታው አድራሻ
          <br />
          Location
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }} rowSpan={2}>
        የቦታው ምድብ
          <br />
          Land Use
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }} rowSpan={2}>
        የቦታው ስፋት
          <br />
          Parcel Size
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }} rowSpan={2}>
        የቦታው ዋጋ በ ካ.ሜ.
          <br />
          Land Price /m²
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }} rowSpan={2}>
          የንዑስ ሊዝዘመን
          <br />
          Sublease Period
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          ከተማ
          <br />
          City
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          የኢንዱስትሪ ፓርክ <br /> Industrial Park
        </TableCell>
      </TableRow>
    </TableHead>
    {/* Body */}
    <TableBody>
      <TableRow>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          {agreementDetail.location}
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          {agreementDetail.city}
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          {agreementDetail.landUse}
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          {agreementDetail.parcelSize}
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          {agreementDetail.landPricePerSqM}
        </TableCell>
        <TableCell align="center" sx={{ border: "1px solid black" }}>
          {agreementDetail.subleasePeriod}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default AgreementDetailsSection;
