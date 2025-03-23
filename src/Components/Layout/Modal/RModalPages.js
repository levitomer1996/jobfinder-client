import React from "react";
import ModalResumeUploadPage from "./ModalPages/ModalResumeUploadPage";

function RModalPages({ content }) {
  switch (content) {
    case "RESUME_UPLOAD":
      return <ModalResumeUploadPage />;

    default:
      return <div>null</div>;
  }
}

export default RModalPages;
