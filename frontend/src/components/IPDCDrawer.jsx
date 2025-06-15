import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import logo from "../assets/image/main_logo.png";
import { Drawer as MuiDrawer, Typography, Divider, IconButton, Avatar, Grid, Box, useMediaQuery } from "@mui/material";
import IPDCMenuList from "./IPDCMenuList";

//VARIABLE
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "#42a147",
  borderRadius: "0 50px 0 0",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const openedMixin = theme => ({
  width: drawerWidth,
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = theme => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  border: "none",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  backgroundColor: "#42a147",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//todo: drawer

export default function IPDCDrawer({ department, open, setOpen, menuList }) {
  //const theme = useTheme();
  const isBigScreen = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    if (isBigScreen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isBigScreen]);
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  return (
    <Drawer variant="permanent" open={open} className="no-print">
      <DrawerHeader>
        <Grid container height="inherit" justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <Grid item xs={12}>
              <Typography variant="h4" color="white" fontWeight="bold">
                IPDC
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="white" fontWeight="italic" noWrap>
                {department}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <IconButton onClick={handleDrawerClose}>
          <Avatar alt="IPDC" src={logo} />
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Box sx={{
    backgroundColor: "#42a147",
    borderRadius: "0 0 50px 0",
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "8px", // Adjust the width of the scrollbar
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white", // Matches the background color
      borderRadius: "4px", // Smooth edges
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "white", // Slightly darker shade for the thumb
      borderRadius: "4px", // Smooth edges for the thumb
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "white", // Even darker on hover
    },
    scrollbarWidth: "thin", // For Firefox
    scrollbarColor: "#42a147 white", // Thumb color and track color for Firefox
  }}>
        <IPDCMenuList menuList={menuList} open={open} />
      </Box>
    </Drawer>
  );
}
