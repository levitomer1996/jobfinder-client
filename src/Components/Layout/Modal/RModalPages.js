import React from "react";
import ModalResumeUploadPage from "./ModalPages/ModalResumeUploadPage";
import ModalApplyToJob from "./ModalPages/ModalApplyToJob";
import ModalNotAllowedAsEmployer from "./ModalPages/ModalNotAllowedAsEmployer";
import ModalEmployerPostedJob from "./ModalPages/ModalEmployerPostedJob";
import JobseekerViewJobModal from "./ModalPages/JobseekerViewJobModal";

function RModalPages({ page, content }) {
  switch (page) {
    case "RESUME_UPLOAD":
      return <ModalResumeUploadPage />;
    case "APPLY_TO_JOB":
      return <ModalApplyToJob />;
    case "NOT_ALLOWED_AS_EMPLOYER":
      return <ModalNotAllowedAsEmployer />;
    case "EMPLOYER_POSTED_JOB":
      return <ModalEmployerPostedJob content={content} />;
    case "JOBSEEKER_VIEW_JOB":
      return <JobseekerViewJobModal content={content} />;
    default:
      return <div>null</div>;
  }
}

export default RModalPages;
