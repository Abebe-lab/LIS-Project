import React from "react";
import PropTypes from "prop-types";
import { ListItemIcon } from "@mui/material";

const IPDCCustomListItemIcon = ({ icon: Icon, color }) => {
  return (
    <ListItemIcon>
      <Icon  sx={{ fill: color + " !important" }}/>
    </ListItemIcon>
  );
};

IPDCCustomListItemIcon.propTypes = {
  icon: PropTypes.elementType.isRequired, // This ensures the icon passed is a valid component
  color: PropTypes.string, // The color for the icon
};

IPDCCustomListItemIcon.defaultProps = {
  color: "red", // Default to inheriting the color if not provided
};

export default IPDCCustomListItemIcon;
