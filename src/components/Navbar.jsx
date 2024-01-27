import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants.js";
import SearchBar from "./SearchBar.jsx";
const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          color: "white",
        }}
      >
        <img src={logo} alt="logo" height={45} />
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            marginLeft: "5px",
          }}
        >
          Home <HomeIcon />
        </Link>
      </Box>
      <Typography
        className="copy-right"
        variant="body2"
        sx={{
          mt: 1.5,
          color: "#fff",
          textAlign: "center",
          display: { xs: "none", md: "block" },
        }}
      >
        CREATED BY JAYASURYA
      </Typography>

      <SearchBar />
    </Stack>
  );
};

export default Navbar;
