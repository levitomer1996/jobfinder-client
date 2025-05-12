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
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { chats, loading } = useGetChats();
  const messagesEndRef = useRef(null);

  // Make sure we force a render when messages change
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [otherParticipant, setOtherParticipant] = useState({});

  // Set up initial chat data
  useEffect(() => {
    if (chats.length > 0) {
      console.log("Initial chats loaded:", chats);
      setChatList(chats);

      // Set active chat information
      if (chats[activeChatIndex]) {
        const activeChat = chats[activeChatIndex];
        setMessages(activeChat.chat.messages || []);
        setChatId(activeChat.chat._id);
        setOtherParticipant(activeChat.otherParticipant);
      }
    }
  }, [chats]);

  // Handle active chat change
  useEffect(() => {
    if (chatList.length > 0 && chatList[activeChatIndex]) {
      const activeChat = chatList[activeChatIndex];
      console.log("Active chat changed:", activeChat);
      setMessages(activeChat.chat.messages || []);
      setChatId(activeChat.chat._id);
      setOtherParticipant(activeChat.otherParticipant);

      // Join the chat room
      socket.emit("joinRoom", activeChat.chat._id);
    }
  }, [activeChatIndex, chatList]);

  // Set up socket listener for new messages
  useEffect(() => {
    const handleNewMessage = (msg) => {
      console.log("🟢 New message received via socket:", msg);

      // Update the specific chat in our chat list
      setChatList((prevChatList) => {
        const newChatList = prevChatList.map((chatItem) => {
          if (chatItem.chat._id === msg.chatId) {
            // Deep clone the existing messages and add the new one
            const updatedMessages = [...(chatItem.chat.messages || []), msg];

            // If this is the active chat, also update our messages state
            if (chatItem.chat._id === chatId) {
              console.log("Updating active chat messages with:", msg);
              setMessages((prev) => [...prev, msg]);
            }

            return {
              ...chatItem,
              chat: {
                ...chatItem.chat,
                messages: updatedMessages,
                lastMessage: msg,
                updatedAt: new Date().toISOString(),
              },
            };
          }
          return chatItem;
        });
        return newChatList;
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isSelf = (id) => {
    if (!user || !user._id) return false;
    return typeof id === "string" ? id === user._id : id?._id === user._id;
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

      // Optimistic update of local message list (this is what the user sees)
      setMessages((prev) => [...prev, newMessage]);

      // Update the chat list state
      setChatList((prevChatList) => {
        return prevChatList.map((chatItem) => {
          if (chatItem.chat._id === chatId) {
            return {
              ...chatItem,
              chat: {
                ...chatItem.chat,
                messages: [...(chatItem.chat.messages || []), newMessage],
                lastMessage: newMessage,
                updatedAt: new Date().toISOString(),
              },
            };
          }
          return chatItem;
        });
      });

      // Send through socket
      socket.emit("sendMessage", newMessage);

      // Clear input
      setMessage("");
    } catch (error) {
      console.error("❌ Failed to send message:", error);
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
      {/* Chat List Panel */}
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
            {chatList.map((chatItem, index) => (
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
                      {chatItem.chat.lastMessage?.content || "No messages yet"}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Chat View Panel */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        height={isMobile ? "60vh" : "100%"}
      >
        {/* Chat Header */}
        <Box px={3} py={2} borderBottom="1px solid #e0e0e0" bgcolor="#ffffff">
          <Typography variant="h6" fontWeight={600}>
            {otherParticipant?.name || "Select a chat"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {chatId ? "Private Chat" : "No chat selected"}
          </Typography>
        </Box>

        {/* Messages Area */}
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

        {/* Message Input Area */}
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
