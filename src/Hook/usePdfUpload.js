import { useState } from "react";

const usePdfUpload = (url = "http://localhost:3000/upload/pdf") => {
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
      console.log("trying to pload");
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload PDF");
      }

      const data = await response.json();
      setUploadedFile(data);
      return data;
    } catch (error) {
      setUploadError(error.message);
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
