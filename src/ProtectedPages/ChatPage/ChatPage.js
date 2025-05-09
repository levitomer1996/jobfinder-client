import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  Badge,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const sampleChats = [
  {
    id: 1,
    name: "Md.Shakibur Rahman",
    message: "You: I'm so sorry I missed the meeting",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "12:40 PM",
  },
  {
    id: 2,
    name: "Muhammad W...",
    message: "You: No problem",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "Wednesday",
  },
];

const ChatPage = () => {
  const { user, loading_auth } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  if (loading_auth) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/forbidden" replace />;
  }

  return (
    <Box
      display="flex"
      height="100vh"
      bgcolor="#f5f7fa"
      flexDirection={isMobile ? "column" : "row"}
    >
      {/* Sidebar */}
      <Paper
        sx={{
          width: isMobile ? "100%" : 320,
          height: isMobile ? "40vh" : "100%",
          borderRight: isMobile ? "none" : "1px solid #e0e0e0",
          borderBottom: isMobile ? "1px solid #e0e0e0" : "none",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
        }}
        square
      >
        <Box p={2} borderBottom="1px solid #e0e0e0">
          <Typography variant="h6" fontWeight="bold">
            Messages
          </Typography>
          <TextField
            placeholder="Search"
            size="small"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {sampleChats.map((chat) => (
            <ListItem
              button
              key={chat.id}
              alignItems="flex-start"
              sx={{ px: 2, py: 1.5 }}
            >
              <ListItemAvatar>
                <Badge color="success" variant="dot" overlap="circular">
                  <Avatar src={chat.avatar} />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={600} noWrap>
                      {chat.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {chat.time}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {chat.message}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Chat Window */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        height={isMobile ? "60vh" : "100%"}
      >
        <Box px={3} py={2} borderBottom="1px solid #e0e0e0" bgcolor="#ffffff">
          <Typography variant="h6" fontWeight={600}>
            Md.Shakibur Rahman
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Unity Small Medieval Bar Project
          </Typography>
        </Box>

        <Box flex={1} px={3} py={2} overflow="auto" bgcolor="#f9f9f9">
          <Typography variant="body2" mb={1}>
            Yeah I got the invitation. We normally don't have to attend any
            meeting so when I speak in English I become nervous and my listening
            is too bad.
          </Typography>
          <Typography variant="body2" align="right" mb={1}>
            Try your best with your English
          </Typography>
          <Typography variant="body2">Sure sir. Thank you.</Typography>
        </Box>

        <Box p={2} borderTop="1px solid #e0e0e0" bgcolor="#ffffff">
          <TextField
            fullWidth
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend}>
                    <SendIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
