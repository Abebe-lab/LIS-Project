import { Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const settings = [
  { key: "Profile", to: "/profile" },
  { key: "Activities", to: "/activities" },
  { key: "Dashboard", to: "/" },
  { key: "Change Password", to: "/changePassword" },
  { key: "Logout", to: "/logout" },
];

export default function IPDCProfileMenu({ anchorElUser, setAnchorElUser }) {
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting) => (
        <MenuItem key={setting.key}>
          <Link to={setting.to} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting.key}</Typography>
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
}
