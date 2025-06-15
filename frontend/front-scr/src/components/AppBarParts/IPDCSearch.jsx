import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  InputBase,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Box,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDecodedUser from "../../services/hooks/useDecodedUser";
import IPDCSearchTermsAndLinks from "./IPDCSearchTermsAndLinks"; // Import for reference

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const searchLinks = IPDCSearchTermsAndLinks; // Assuming IPDCSearchTermsAndLinks holds the searchLinks data

export default function IPDCSearch() {
  // Accept userRole as a prop
  const decodedUser = useDecodedUser();
  const [query, setQuery] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);

  const handleInput = (e) => {
    try {
      const inputQuery = e.target.value.toLowerCase();
      setQuery(inputQuery); // Update query

      // Fetch search terms based on role
      const userRole = decodedUser.department_id;
      console.log(userRole);
      const linksForRole = searchLinks[userRole] || []; // Defaults to an empty array if role is not found
      const filtered = linksForRole.filter((link) =>
        link.searchKey.some((key) => key.includes(inputQuery))
      );

      setFilteredLinks(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search", onChange: handleInput }}
          autoFocus
        />
      </Search>

      {/* Floating search result */}
      {(query && query.length > 0) && (
        <Paper
          sx={{
            position: "absolute",
            top: "50px", // Adjust based on the size of the input
            left: 0,
            right: 0,
            zIndex: 10,
            maxHeight: "300px", // Limiting height for scrollable box
            overflowY: "auto",
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 1,
            padding: "10px",
          }}
        >
          <List sx={{ padding: 0 }}>
            {filteredLinks?.length > 0 ? (
              filteredLinks?.map((link, index) => (
                <ListItem key={index} button>
                  <ListItemText
                    primary={
                      <MuiLink href={link.link}>
                        {link?.searchKey?.join(" ")}
                      </MuiLink>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No results found" />
              </ListItem>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
}
