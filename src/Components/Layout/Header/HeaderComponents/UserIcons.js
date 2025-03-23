import React, { useContext, useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { AuthContext } from "../../../../Context/AuthContext";

const UserIcons = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [chatAnchorEl, setChatAnchorEl] = useState(null);

  const profileMenuOpen = Boolean(profileAnchorEl);
  const chatMenuOpen = Boolean(chatAnchorEl);
  const { logout } = useContext(AuthContext);

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleChatMenuOpen = (event) => {
    setChatAnchorEl(event.currentTarget);
  };

  const handleChatMenuClose = () => {
    setChatAnchorEl(null);
  };

  // Dummy chat data
  const chats = [
    {
      id: 1,
      name: "David Wald",
      message: "You: רשמת",
      time: "9w",
      avatar: "https://i.pravatar.cc/150?img=1",
      unread: false,
    },
    {
      id: 2,
      name: "UNITY Festival Israel",
      message: "משפחת יוניטי מזמינה אתכם לפסטיבל...",
      time: "24w",
      avatar: "https://i.pravatar.cc/150?img=2",
      unread: true,
    },
    {
      id: 3,
      name: "Michal Preisler",
      message: "Messages and calls are secure...",
      time: "27w",
      avatar: "https://i.pravatar.cc/150?img=3",
      unread: true,
    },
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Notifications */}
      <IconButton color="inherit" sx={{ color: "orange" }}>
        <Badge
          badgeContent={4}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Chat icon */}
      <IconButton
        color="inherit"
        onClick={handleChatMenuOpen}
        sx={{ color: "orange" }}
      >
        <Badge
          badgeContent={chats.length}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <ChatBubbleIcon />
        </Badge>
      </IconButton>

      {/* Chat Menu */}
      <Menu
        anchorEl={chatAnchorEl}
        open={chatMenuOpen}
        onClose={handleChatMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            overflowY: "auto",
            padding: 0,
          },
        }}
      >
        <List>
          {chats.map((chat) => (
            <React.Fragment key={chat.id}>
              <ListItem
                button
                alignItems="flex-start"
                onClick={handleChatMenuClose}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={chat.name} src={chat.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight="bold" fontSize="0.95rem">
                        {chat.name}
                      </Typography>
                      <Typography fontSize="0.75rem" color="text.secondary">
                        {chat.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {chat.message}
                      {chat.unread && (
                        <FiberManualRecordIcon
                          sx={{ fontSize: 10, color: "#1976d2" }}
                        />
                      )}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Menu>

      {/* Profile icon */}
      <IconButton
        color="inherit"
        onClick={handleProfileMenuOpen}
        sx={{ color: "orange" }}
      >
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <a href="/profile">Profile</a>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>My Jobs</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>My Reviews</MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleProfileMenuClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserIcons;
