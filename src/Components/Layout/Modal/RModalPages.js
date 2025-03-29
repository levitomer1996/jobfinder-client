import React from "react";
import ModalResumeUploadPage from "./ModalPages/ModalResumeUploadPage";
import ModalApplyToJob from "./ModalPages/ModalApplyToJob";
import ModalNotAllowedAsEmployer from "./ModalPages/ModalNotAllowedAsEmployer";

function RModalPages({ content }) {
  switch (content) {
    case "RESUME_UPLOAD":
      return <ModalResumeUploadPage />;
    case "APPLY_TO_JOB":
      return <ModalApplyToJob />;
    case "NOT_ALLOWED_AS_EMPLOYER":
      return <ModalNotAllowedAsEmployer />;
    default:
      return <div>null</div>;
  }
}

export default RModalPages;
