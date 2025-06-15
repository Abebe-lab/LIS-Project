import { useState } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Box } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ExactMenu = ({ itm, index, selectedIndex, setSelectedIndex, isMainMenu = true }) => {
  const handleListItemClick = (event, index) => {
    isMainMenu && setSelectedIndex(index);
  };
  return (
    <Link to={itm.to}>
      <ListItem
        key={`${itm?.key}-${itm?.title}`}
        disablePadding
        sx={{ display: "block", height: `32` }}
        onClick={event => handleListItemClick(event, index)}
      >
        <ListItemButton selected={isMainMenu && selectedIndex === index}>
          <ListItemIcon sx={{ color: "white" }}>{itm?.iconClass}</ListItemIcon>
          <ListItemText primary={itm?.title} primaryTypographyProps={{ color: "white" }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
const ExpandedMenu = ({ menuToExpand, index, selectedIndex, setSelectedIndex }) => {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);

  return (
    <>
      <ListItem onClick={toggleSubMenu} disablePadding>
        <ListItemButton selected={selectedIndex === index}>
          <ListItemIcon sx={{ color: "white" }}>{menuToExpand?.iconClass}</ListItemIcon>
          <ListItemText primary={menuToExpand?.title} primaryTypographyProps={{ color: "white" }} />
        </ListItemButton>
        {openSubMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
        <Box px={3}>
          {menuToExpand?.detail?.map((menuitm, i) => (
            <ExactMenu
              key={i}
              itm={menuitm}
              index={index}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isMainMenu={false}
            />
          ))}
        </Box>
      </Collapse>
    </>
  );
};
export default function IPDCMenuList({ open, menuList }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <List>
      {menuList?.map((menuItem, index) =>
        menuItem?.key === "GROUP" ? (
          <ExpandedMenu
            key={index}
            menuToExpand={menuItem}
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ) : (
          <ExactMenu
            key={index}
            itm={menuItem}
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            isMainMenu={true}
          />
        ),
      )}
    </List>
  );
}
