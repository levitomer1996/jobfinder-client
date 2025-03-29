import { useState } from "react";
import jts from "../API/jts";

const usePdfUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const uploadPdf = async (selectedPdfFile) => {
    if (!selectedPdfFile || selectedPdfFile.type !== "application/pdf") {
      setUploadError("Please select a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedPdfFile);

    setUploading(true);
    setUploadError(null);
    setUploadedFile(null);

    try {
      const response = await jts.post("upload/pdf/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUploadedFile(response.data);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Upload failed";
      setUploadError(errorMsg);
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadPdf,
    uploading,
    uploadError,
    uploadedFile,
  };
};

export default usePdfUpload;
