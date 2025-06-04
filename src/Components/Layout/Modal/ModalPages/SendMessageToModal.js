import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Stack,
  Paper,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import socket from "../../../../API/socket";
import { ModalContext } from "../../../../Context/ModalContext";
import { AuthContext } from "../../../../Context/AuthContext";

const SendMessageToModal = ({ content }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { name, email, _id: receiverId } = content || {};
  const { closeModal } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // if needed for auth later
      const newMessage = {
        senderId: user._id,
        receiverId,
        content: message,
      };

      socket.emit("sendMessage", newMessage, (response) => {
        console.log("✅ Message sent via gateway:", response);
        setMessage("");
        closeModal();
      });
    } catch (error) {
      console.error("❌ Failed to send message via socket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#fffdf7",
        boxShadow: "0 8px 24px rgba(255, 152, 0, 0.15)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: "#ff9800" }}>{name?.charAt(0)}</Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600} color="black">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        sx={{ bgcolor: "white", borderRadius: 2, mb: 2 }}
      />

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          onClick={closeModal}
          disabled={loading}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          variant="contained"
          sx={{
            backgroundColor: "#ff9800",
            color: "white",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": { backgroundColor: "#fb8c00" },
          }}
          startIcon={<SendIcon />}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Send"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default SendMessageToModal;
