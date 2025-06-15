import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { IPDCDrawer, IPDCAppBar } from "../components";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  //margin: 0,
  backgroundColor: "inherit",
  boxShadow: "none",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function RootLayout({ department, open, setOpen, showProfile, setShowProfile, menuList }) {
  useEffect(() => {
    //console.log("menu opened: ", open);
  }, [open]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {<IPDCAppBar open={open} setOpen={setOpen} />}
      <IPDCDrawer open={open} setOpen={setOpen} department={department} menuList={menuList} />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        <Outlet showProfile={showProfile} setShowProfile={setShowProfile} />
      </Box>
    </Box>
  );
}
