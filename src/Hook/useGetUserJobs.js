import { useState } from "react";
import jts from "../API/jts"; // your custom Axios instance

const usePdfUpload = (endpoint = "/upload/pdf") => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const uploadPdf = async (selectedPdfFile) => {
    const formData = new FormData();
    formData.append("file", selectedPdfFile);

    setUploading(true);
    setUploadError(null);
    setUploadedFile(null);

    try {
      const response = await jts.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedFile(response.data);
      return response.data;
    } catch (error) {
      setUploadError(error?.response?.data?.message || error.message);
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
