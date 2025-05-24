import React from "react";
import ModalResumeUploadPage from "./ModalPages/ModalResumeUploadPage";
import ModalApplyToJob from "./ModalPages/ModalApplyToJob";
import ModalNotAllowedAsEmployer from "./ModalPages/ModalNotAllowedAsEmployer";
import ModalEmployerPostedJob from "./ModalPages/ModalEmployerPostedJob";
import JobseekerViewJobModal from "./ModalPages/JobseekerViewJobModal";
import SendMessageToModal from "./ModalPages/SendMessageToModal";
import ShowApplicantsModal from "./ModalPages/ShowApplicantsModal";
import ModalUploadProfileImage from "./ModalPages/ModalUploadProfileImage";

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
    case "SEND_MESSAGE_TO":
      return <SendMessageToModal content={content} />;
    case "SHOW_APPLICANTS":
      return <ShowApplicantsModal content={content} />;
    case "UPLOAD_PROFILE_IMAGE":
      return <ModalUploadProfileImage />;
    default:
      return <div>null</div>;
  }
}

export default RModalPages;
