import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

const CoordinateTable = ({ coordinates }) => {
 // console.log(coordinates);
  
  return (
    <>
      {coordinates && coordinates?.length > 0 ? (
        <TableContainer component={Paper} sx={{ 
          width: '100%', 
          overflowX: 'auto' // Allows horizontal scrolling if the table is too wide
        }}>
          <Table aria-label="title deed coordinates table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>X</TableCell>
                <TableCell>Y</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coordinates.map((coord, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{parseFloat(coord[0]).toFixed(6)}</TableCell>
                  <TableCell>{parseFloat(coord[1]).toFixed(6)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>No Coordinate given</>
      )}
    </>
  );
};

export default CoordinateTable;