import React, { useContext, useEffect, useRef, useState } from "react";
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
import socket from "../../API/socket";

const ChatPage = () => {
  const { user, loading_auth } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { chats, loading } = useGetChats();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [otherParticipant, setOtherParticipant] = useState({});

  useEffect(() => {
    if (chats.length > 0) {
      setChatList(chats);
    }
  }, [chats]);

  useEffect(() => {
    if (activeChatIndex !== null && filteredChats[activeChatIndex]) {
      const activeChat = filteredChats[activeChatIndex];
      setMessages(activeChat.chat.messages || []);
      setChatId(activeChat.chat._id);
      setOtherParticipant(activeChat.otherParticipant);
      socket.emit("joinRoom", activeChat.chat._id);
    }
  }, [activeChatIndex, chatList]);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      setChatList((prevChatList) =>
        prevChatList.map((chatItem) => {
          if (chatItem.chat._id === chatId) {
            return {
              ...chatItem,
              chat: {
                ...chatItem.chat,
                messages: [...(chatItem.chat.messages || []), msg],
                lastMessage: msg,
                updatedAt: new Date().toISOString(),
              },
            };
          }
          return chatItem;
        })
      );
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isSelf = (id) => {
    if (!user || !user._id) return false;
    return typeof id === "string" ? id === user._id : id?._id === user._id;
  };

  useEffect(() => {
    const handleMessagesMarkedRead = (updatedIds) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          updatedIds.includes(msg._id) ? { ...msg, status: "read" } : msg
        )
      );
    };
    socket.on("markRead", handleMessagesMarkedRead);
    return () => {
      socket.off("messagesMarkedRead", handleMessagesMarkedRead);
    };
  }, []);

  const handleReadMessage = (chatItem) => {
    setMessages(chatItem.chat.messages || []);
    setChatId(chatItem.chat._id);
    setOtherParticipant(chatItem.otherParticipant);

    const unreadMessageIds = chatItem.chat.messages
      .filter(
        (msg) =>
          msg.senderId === chatItem.otherParticipant._id &&
          msg.status === "sent"
      )
      .map((msg) => msg._id);

    if (unreadMessageIds.length > 0) {
      socket.emit("markRead", {
        chatId: chatItem.chat._id,
        messageIds: unreadMessageIds,
      });
    }
  };

  const handleSend = () => {
    if (!message.trim() || !chatId) return;
    try {
      setLoadingSend(true);
      const newMessage = {
        senderId: user._id,
        receiverId: otherParticipant._id,
        content: message,
        createdAt: new Date().toISOString(),
        chatId,
      };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    } catch (error) {
      console.error("\u274C Failed to send message:", error);
    } finally {
      setLoadingSend(false);
    }
  };

  const filteredChats = chatList.filter((chatItem) =>
    chatItem.otherParticipant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredChats.map((chatItem, index) => (
              <ListItem
                button
                key={chatItem.chat._id}
                onClick={() => {
                  setActiveChatIndex(index);
                  handleReadMessage(chatItem);
                }}
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor:
                    index === activeChatIndex ? "#e3f2fd" : "transparent",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    borderLeft: "4px solid #1976d2",
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge color="success" variant="dot" overlap="circular">
                    <Avatar
                      src={`${process.env.REACT_APP_SERVER_URL}${chatItem.otherParticipant.profileImageUrl}`}
                    >
                      {chatItem.otherParticipant.name.charAt(0)}
                    </Avatar>
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
                      {chatItem.chat.lastMessage?.content || "No messages yet"}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        height={isMobile ? "60vh" : "100%"}
      >
        <Box px={3} py={2} borderBottom="1px solid #e0e0e0" bgcolor="#ffffff">
          <Typography variant="h6" fontWeight={600}>
            {otherParticipant?.name || "Select a chat"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {chatId ? "Private Chat" : "No chat selected"}
          </Typography>
        </Box>

        <Box flex={1} px={3} py={2} overflow="auto" bgcolor="#f9f9f9">
          <Box display="flex" flexDirection="column">
            {messages.length > 0 ? (
              messages.map((msg, i) => {
                const fromSelf = isSelf(msg.senderId);
                return (
                  <Box
                    key={`msg-${i}-${msg.createdAt}`}
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
                        {fromSelf ? user.name : otherParticipant.name} •{" "}
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
            <div ref={messagesEndRef} />
          </Box>
        </Box>

        <Box p={2} borderTop="1px solid #e0e0e0" bgcolor="#ffffff">
          <TextField
            fullWidth
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
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
