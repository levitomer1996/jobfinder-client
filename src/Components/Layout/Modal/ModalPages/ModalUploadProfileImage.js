import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Input,
} from "@mui/material";
import jts from "../../../../API/jts";
import { AuthContext } from "../../../../Context/AuthContext";
import { ModalContext } from "../../../../Context/ModalContext";

function ModalUploadProfileImage() {
  const { user } = useContext(AuthContext);
  const { closeModal } = useContext(ModalContext);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccessMsg("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await jts.post("/upload/profile-image", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.imageUrl) {
        setSuccessMsg("Profile image uploaded successfully");
        closeModal(); // Optionally close the modal after upload
      }
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Upload Profile Image</Typography>

      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: "image/*" }}
      />

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" color="inherit" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}

export default ModalUploadProfileImage;
