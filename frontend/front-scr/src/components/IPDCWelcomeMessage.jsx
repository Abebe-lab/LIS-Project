import useDecodedUser from "../services/hooks/useDecodedUser";
import { CapitalizeWords } from "../utils/Formatting";
import { Box, Grid, Typography } from "@mui/material";

export default function IPDCWelcomeMessage({ messageTitle }) {
  const decodedUser = useDecodedUser();
  //console.log(decodedUser);
  return (
    <>
      <Grid item sm={12} md={12} px={1}>
        <Box id="my-container">
          <Typography
            id="my-text"
            sx={{
              fontSize: messageTitle?.length > 20 ? "34px" : "36px",
              fontWeight: 600,
              color: "black",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              /* Add this to make the text shrink to fit the container */
              maxWidth: "96%",
            }}
          >
            {messageTitle + " "}
            {decodedUser?.role || ""} {" Dashboard"}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#737373" }}>
          Welcome back,{" "}
          {decodedUser && CapitalizeWords((decodedUser?.title || "") + " " + (decodedUser?.full_name || ""))}
        </Typography>
      </Grid>
    </>
  );
}
