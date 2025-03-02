import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../Context/AuthContext";
import UserIcons from "./HeaderComponents/UserIcons";

const Header = () => {
  const { user, isLogged } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - JobTracker Logo */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "22px",
            letterSpacing: "1px",
          }}
        >
          JobTracker
        </Typography>

        {/* Right Side - Icons & Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* User Icons OR Sign In Button */}
          {isLogged ? (
            <UserIcons />
          ) : (
            <Button
              href="/signin"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                px: 3,
                py: 1,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  transform: "scale(1.05)",
                },
              }}
            >
              Sign In
            </Button>
          )}

          {/* Hamburger Menu */}
          <IconButton
            edge="end"
            sx={{
              color: "white",
              "&:hover": { color: "#ffcc00" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
