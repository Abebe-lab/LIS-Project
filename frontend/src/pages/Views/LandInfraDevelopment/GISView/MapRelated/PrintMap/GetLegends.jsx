import { Typography, Box } from "@mui/material"

export const GetLegends=({layers})=>{
    return <Box
    className="no-print"
    sx={{
      position: "absolute",
      bottom: "50px",
      left: "10px",
      backgroundColor: "white",
      padding: "10px",
      border: "1px solid black",
      zIndex: 1000,
    }}
  >
    <Typography variant="h6">Legend</Typography>
    <Typography>
      Roads: <span style={{ color: "blue" }}>Blue</span>
    </Typography>
    <Typography>
      Parks: <span style={{ color: "green" }}>Green</span>
    </Typography>
  </Box>
}