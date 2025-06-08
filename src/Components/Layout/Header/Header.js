import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { AuthContext } from "../../../Context/AuthContext";
import UserIcons from "./HeaderComponents/UserIcons";
import logo from "../../../Asstets/LOGO/HeaderLogo.png";
import useGetChats from "../../../Hook/useGetChats";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isLogged } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [chats, chats_loading, chats_error] = useGetChats();
  const navigate = useNavigate();
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
        {/* Left side: Logo (hidden on mobile) */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            height: 64,
            pl: 1,
          }}
          onClick={() => (window.location.href = "/")}
        >
          <Box
            component="img"
            src={logo}
            alt="JobTracker Logo"
            sx={{
              height: 150,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>

        {/* Center (on mobile): Logo */}
        {isMobile && (
          <Box
            component="img"
            src={logo}
            alt="JobTracker Logo"
            sx={{
              height: 48,
              width: "auto",
              objectFit: "contain",
              display: { xs: "block", sm: "none" },
            }}
          />
        )}

        {/* Right side: User icons or sign-in */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {isLogged ? (
            <UserIcons
              profileImageUrl={`${process.env.REACT_APP_SERVER_URL}${user.profileImageUrl}`}
              unreadedChats={user.unreadedChats}
              chats={chats}
              notifications={user.notifications}
              navigate={navigate}
            />
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
