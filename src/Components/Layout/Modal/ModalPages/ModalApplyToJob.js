import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ModalApplyToJob = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    coverLetter: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976d2",
          fontSize: "1.8rem",
        }}
      >
        Apply to Job
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={handleChange("name")}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange("phone")}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Cover Letter"
            value={formData.coverLetter}
            onChange={handleChange("coverLetter")}
            fullWidth
            multiline
            rows={5}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 3, textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            background: "linear-gradient(135deg, #1e88e5 0%, #42a5f5 100%)",
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
            },
          }}
        >
          Submit Application
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalApplyToJob;
