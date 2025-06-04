import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  LinearProgress,
  Alert,
  Stack,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import usePdfUpload from "../../../../Hook/usePdfUpload";

const ModalResumeUploadPage = () => {
  const [file, setFile] = useState(null);
  const { uploadPdf, uploading, uploadError, uploadedFile } =
    usePdfUpload("/upload/pdf");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      setFile(null);
      alert("Only PDF files are allowed");
    }
  };

  const handleUpload = async () => {
    if (file) {
      await uploadPdf(file);
    } else {
      alert("Please select a PDF file first");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Upload Your Resume
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Choose your resume (PDF only) to upload it and apply to jobs easily.
      </Typography>

      <Stack spacing={2}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {file ? file.name : "Choose Resume (PDF)"}
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={uploading || !file}
          sx={{
            borderRadius: 2,
            backgroundColor: "#ff9800",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#fb8c00",
            },
          }}
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </Button>

        {uploading && <LinearProgress />}

        {uploadError && <Alert severity="error">{uploadError}</Alert>}

        {uploadedFile && (
          <Alert severity="success">
            Resume uploaded successfully!{" "}
            <a
              href={uploadedFile.filePath}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "8px", fontWeight: 500 }}
            >
              View Resume
            </a>
          </Alert>
        )}
      </Stack>
    </Container>
  );
};

export default ModalResumeUploadPage;
