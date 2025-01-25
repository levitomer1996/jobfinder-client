import React, { useContext, useState } from "react";
import { IconButton, Box, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { AuthContext } from "../../../Context/AuthContext";

const UserIcons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useContext(AuthContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton color="inherit" sx={{ color: "orange" }}>
        <NotificationsIcon />
      </IconButton>
      <IconButton color="inherit" sx={{ color: "orange" }}>
        <ChatBubbleIcon />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        sx={{ color: "orange" }}
      >
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
          }}
        >
          <a href="/profile">Profile</a>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>My Jobs</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Reviews</MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserIcons;
