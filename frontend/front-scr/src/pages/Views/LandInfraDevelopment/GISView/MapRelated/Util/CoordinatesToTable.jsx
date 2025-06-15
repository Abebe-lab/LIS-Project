import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableRow, Grid, TableHead, Tab } from "@mui/material";
import { fromLonLat } from "ol/proj";
//prettier-ignore
export const CoordinatesToTable = ({ coordinates, withTitle = true, projected = true, showIndexNo = true, maxHeight = "300px" }) => {
  const getCoordinateRow = (coordinate, index) => {
    if (index === coordinates.length - 1) return;
    if (projected) {
      const converted = fromLonLat(coordinate);
      return (
        <TableRow key={index}>
          {showIndexNo && <TableCell sx={{ padding: 0 , textAlign: "center" }}>{index + 1}</TableCell>}
          <TableCell sx={{ padding: 0, textAlign: "center"  }}>{parseFloat(converted[0]).toFixed(4)}</TableCell>
          <TableCell sx={{ padding: 0 , textAlign: "center" }}>{parseFloat(converted[1]).toFixed(4)}</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={index}>
          {showIndexNo && <TableCell sx={{ padding: 0, textAlign: "center" }} >{index + 1}</TableCell>}
          <TableCell sx={{ padding: 0, textAlign: "center" }}>{parseFloat(coordinate[0]).toFixed(6)}</TableCell>
          <TableCell sx={{ padding: 0, textAlign: "center" }}>{parseFloat(coordinate[1]).toFixed(6)}</TableCell>
        </TableRow>
      );
    }
  };
  return (
    <>
      {coordinates ? (
        <Box sx={{ m: 0, p: 0, maxHeight: maxHeight, overflowY: "auto"}} gap={0}>
          {withTitle && (
            <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: "center" }}>
              Coordinates
            </Typography>
          )}
          {
            <Table sx={{ border: "1px solid black" }}>
              <TableHead>
                <TableRow>
                  {showIndexNo && <TableCell sx={{ padding: 0, textAlign: "center", fontWeight: "bold" }}>No.</TableCell>}
                  <TableCell sx={{ padding: 0, textAlign: "center", fontWeight: "bold" }}>X</TableCell>
                  <TableCell sx={{ padding: 0, textAlign: "center",fontWeight: "bold" }}>Y</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coordinates && coordinates.map((coordinate, index) => getCoordinateRow(coordinate, index))}
              </TableBody>
            </Table>
          }
        </Box>
      ) : (
        <Typography variant="body2">There are no coordinates to display.</Typography>
      )}
    </>
  );
};
/**
 * 
  const CoordinateList = ({ coordinates }) =>
    coordinates.map((coord, index) => {
      const converted = fromLonLat(coord);
      return (
        <Typography key={index} variant="body2" sx={{ fontSize: "10px", color: "black" }}>
          {index + 1}: X={parseFloat(converted[0])?.toFixed(4)}, Y={parseFloat(converted[1])?.toFixed(4)}
        </Typography>
      );
    });

 */
