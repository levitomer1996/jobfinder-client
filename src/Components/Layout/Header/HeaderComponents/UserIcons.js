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
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { AuthContext } from "../../../../Context/AuthContext";

const UserIcons = ({
  profileImageUrl,
  unreadedChats,
  chats,
  notifications,
  setNotifications,
  navigate,
}) => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [chatAnchorEl, setChatAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  const { logout } = useContext(AuthContext);

  const handleProfileMenuOpen = (e) => setProfileAnchorEl(e.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  const handleChatMenuOpen = (e) => setChatAnchorEl(e.currentTarget);
  const handleChatMenuClose = () => {
    setChatAnchorEl(null);
    navigate("/chat");
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notification/${notificationId}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error(
        `Failed to mark notification ${notificationId} as read`,
        error
      );
    }
  };

  const handleNotifMenuOpen = async (e) => {
    setNotifAnchorEl(e.currentTarget);
    const unread = notifications?.filter((n) => !n.isRead) || [];
    await Promise.all(unread.map((n) => markNotificationAsRead(n._id)));
  };

  const handleNotifMenuClose = () => {
    setNotifAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Notifications */}
      <IconButton
        color="inherit"
        onClick={handleNotifMenuOpen}
        sx={{ color: "orange" }}
      >
        <Badge
          badgeContent={notifications?.filter((n) => !n.isRead).length || 0}
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

      {/* Notification Menu */}
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={handleNotifMenuClose}
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
          {notifications && notifications.length > 0 ? (
            notifications.map((notif) => (
              <React.Fragment key={notif._id}>
                <ListItem
                  alignItems="flex-start"
                  onClick={handleNotifMenuClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={notif.isRead ? "normal" : "bold"}
                        fontSize="0.9rem"
                      >
                        {notif.content}
                      </Typography>
                    }
                    secondary={
                      <Typography fontSize="0.75rem" color="text.secondary">
                        {new Date(notif.timeCreated).toLocaleString()}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          )}
        </List>
      </Menu>

      {/* Chat icon */}
      <IconButton
        color="inherit"
        onClick={handleChatMenuOpen}
        sx={{ color: "orange" }}
      >
        <Badge
          badgeContent={unreadedChats?.length || 0}
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
        open={Boolean(chatAnchorEl)}
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
          {chats && chats.length > 0 ? (
            chats.map((chat) => (
              <React.Fragment key={chat._id}>
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
                    <Avatar
                      alt={chat.otherParticipant?.name}
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        chat.otherParticipant?.name || "User"
                      )}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography fontWeight="bold" fontSize="0.95rem">
                          {chat.otherParticipant?.name}
                        </Typography>
                        <Typography fontSize="0.75rem" color="text.secondary" />
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        Chat conversation...
                        <FiberManualRecordIcon
                          sx={{ fontSize: 10, color: "#1976d2" }}
                        />
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No chats available" />
            </ListItem>
          )}
        </List>
      </Menu>

      {/* Profile icon */}
      <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
        <Avatar
          alt="User Avatar"
          src={profileImageUrl}
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
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
