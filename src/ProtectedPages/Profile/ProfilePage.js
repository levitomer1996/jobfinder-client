import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AuthContext } from "../../Context/AuthContext";
import useGetJobSeeker from "../../Hook/useGetJobSeeker";
import EmployerProfilePage from "./Pages/EmployerProfilePage";
import JobSeekerProfilePage from "./Pages/JobSeekerProfilePage";
import EmployerPageProvider from "../../Context/EmployerPageContext";
import { JobSeekerPageContext } from "../../Context/JobseekerPageContext";

const StyledPaper = styled(Paper)({
  padding: "24px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
});

const Sidebar = styled(Paper)({
  padding: "16px",
  height: "100%",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { jobSeeker, loading, error, fetchJobSeeker } = useGetJobSeeker();

  useEffect(() => {
    fetchJobSeeker();
  }, []);

  const handleResumeUpload = (event) => {
    // Implement resume upload logic
  };
  if (user) {
    switch (user.role) {
      case "jobseeker":
        return (
          <EmployerPageProvider>
            <JobSeekerProfilePage />;
          </EmployerPageProvider>
        );
      case "employer":
        return (
          <EmployerPageProvider>
            <EmployerProfilePage />
          </EmployerPageProvider>
        );
      case null:
        return <div>Please Login</div>;
    }
  } else {
    return <div>Please login</div>;
  }
};

export default ProfilePage;
