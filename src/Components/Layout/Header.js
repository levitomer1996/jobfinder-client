import React, { useContext, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../Context/AuthContext";

const Header = () => {
  const { user, isLogged } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          JobTracker
        </Typography>

        {/* Sign In Text with Special Font */}
        {isLogged ? (
          <p>{user.name}</p>
        ) : (
          <p
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            <a href="/signin">Sign In</a>
          </p>
        )}

        {/* Hamburger Menu */}
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
