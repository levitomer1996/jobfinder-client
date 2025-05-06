import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../../Context/AuthContext";
import UserIcons from "./HeaderComponents/UserIcons";
import logo from "../../../Asstets/LOGO/HeaderLogo.png";

const Header = () => {
  const { user, isLogged } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        backgroundColor: "#ffffff",
        color: "#333333",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 2 },
        }}
      >
        {/* Logo (hidden on mobile) */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            height: 56,
            pl: 1,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="JobTracker Logo"
            sx={{
              height: "200px",
              width: "200px",
              objectFit: "contain",
              display: "block",
              maxHeight: 56,
            }}
          />
        </Box>

        {/* Desktop only: Icons / Sign In */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            {isLogged ? (
              <UserIcons />
            ) : (
              <Button
                href="/signin"
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: "bold",
                  color: "#333",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "8px",
                  px: 2,
                  py: 0.7,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        )}

        {/* Mobile only: Menu icon */}
        {isMobile && (
          <IconButton
            edge="end"
            sx={{
              color: "#333",
              "&:hover": { color: "#ff9800" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
