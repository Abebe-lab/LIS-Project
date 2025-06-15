import { useState } from "react";
import { styled } from "@mui/material/styles";
import { AppBar as MuiAppBar, Toolbar, IconButton, Avatar, Box } from "@mui/material";
import IPDCSearch from "./AppBarParts/IPDCSearch";
//import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../assets/image/main_logo.png";
import { IPDCProfileMenu, IPDCNotification, IPDCProfileAvatar } from "./AppBarParts";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: `0px 2px 0px rgba(0, 0, 0, 0.25)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function IPDCAppBar({ open, setOpen }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          <Avatar src={logo} />
        </IconButton>
        <IPDCSearch />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IPDCNotification />
          <IPDCProfileAvatar setAnchorElUser={setAnchorElUser} />
          <IPDCProfileMenu anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
