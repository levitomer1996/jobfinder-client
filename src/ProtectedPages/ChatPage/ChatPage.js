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
import useGetChats from "../../Hook/useGetChats";
import jts from "../../API/jts";

const ChatPage = () => {
  const { user, loading_auth } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { chats, loading, error } = useGetChats();

  const activeChat = chats[activeChatIndex];

  const isSelf = (id) => {
    if (!user || !user._id) return false;
    return typeof id === "string" ? id === user._id : id?._id === user._id;
  };

  const handleSend = async () => {
    if (!message.trim() || !activeChat) return;
    try {
      setLoadingSend(true);
      const token = localStorage.getItem("token");
      const receiverId = activeChat.otherParticipant._id;
      const chatId = activeChat.chat._id;

      await jts.post(
        "chat/sendmessage",
        {
          receiverId,
          chatId,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoadingSend(false);
    }
  };

  if (loading_auth || !user) {
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

        {loading ? (
          <Box p={2} display="flex" justifyContent="center">
            <CircularProgress size={20} />
          </Box>
        ) : (
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {chats.map((chatItem, index) => (
              <ListItem
                button
                key={chatItem.chat._id}
                alignItems="flex-start"
                selected={activeChatIndex === index}
                onClick={() => setActiveChatIndex(index)}
                sx={{ px: 2, py: 1.5 }}
              >
                <ListItemAvatar>
                  <Badge color="success" variant="dot" overlap="circular">
                    <Avatar>{chatItem.otherParticipant.name.charAt(0)}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack direction="row" justifyContent="space-between">
                      <Typography fontWeight={600} noWrap>
                        {chatItem.otherParticipant.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(chatItem.chat.updatedAt).toLocaleTimeString()}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {chatItem.chat.lastMessage?.text || "No messages yet"}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Chat Window */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        height={isMobile ? "60vh" : "100%"}
      >
        {/* Header */}
        <Box px={3} py={2} borderBottom="1px solid #e0e0e0" bgcolor="#ffffff">
          <Typography variant="h6" fontWeight={600}>
            {activeChat?.otherParticipant?.name || "Select a chat"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activeChat?.chat?.type === "private"
              ? "Private Chat"
              : "System Chat"}
          </Typography>
        </Box>

        {/* Messages */}
        <Box flex={1} px={3} py={2} overflow="auto" bgcolor="#f9f9f9">
          {activeChat?.chat?.messages?.length > 0 ? (
            activeChat.chat.messages.map((msg, i) => {
              const fromSelf = isSelf(msg.senderId);
              return (
                <Box
                  key={i}
                  display="flex"
                  justifyContent={fromSelf ? "flex-end" : "flex-start"}
                  mb={1}
                >
                  <Box
                    maxWidth="70%"
                    bgcolor={fromSelf ? "#e1f5fe" : "#ffffff"}
                    p={1.5}
                    borderRadius={2}
                    boxShadow={1}
                  >
                    <Typography variant="caption" color="textSecondary">
                      {fromSelf ? user.name : activeChat.otherParticipant.name}{" "}
                      •{" "}
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString()
                        : ""}
                    </Typography>
                    <Typography variant="body2" mt={0.5}>
                      {msg.content}
                    </Typography>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary">
              No messages in this chat yet.
            </Typography>
          )}
        </Box>

        {/* Input */}
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
                  <IconButton onClick={handleSend} disabled={loadingSend}>
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
