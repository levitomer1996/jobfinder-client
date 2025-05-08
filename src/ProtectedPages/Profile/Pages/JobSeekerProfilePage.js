import React, { useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  TextField,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import RateReviewIcon from "@mui/icons-material/RateReview";
import useGetJobSeeker from "../../../Hook/useGetJobSeeker";
import { EmployerPageContext } from "../../../Context/EmployerPageContext";
import JSProfilePage from "./JobseekerPageComponents/JobseekerProfilePage";
import MyJobs from "./JobseekerPageComponents/MyJobs";
import { useTheme } from "@mui/material/styles";

const JobSeekerProfilePage = () => {
  const { jobSeeker, loading, error, fetchJobSeeker } = useGetJobSeeker();
  const { activePage, setActivePage } = useContext(EmployerPageContext);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px

  useEffect(() => {
    fetchJobSeeker();
  }, []);

  function renderPage(p) {
    switch (p) {
      case "MY_PROFILE":
        return (
          <JSProfilePage
            jobSeeker={jobSeeker}
            loading={loading}
            error={error}
          />
        );
      case "MY_JOBS":
        return <MyJobs />;
      default:
        return null;
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid
        container
        spacing={3}
        direction={isSmallScreen ? "column" : "row"}
        alignItems={isSmallScreen ? "stretch" : "flex-start"}
      >
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              My Profile
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem
                button
                onClick={() => {
                  setActivePage("MY_PROFILE");
                }}
              >
                <AccountCircleIcon />
                <ListItemText primary="Profile" sx={{ ml: 1 }} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setActivePage("MY_JOBS");
                }}
              >
                <WorkOutlineIcon />
                <ListItemText primary="My Jobs" sx={{ ml: 1 }} />
              </ListItem>
              <ListItem button>
                <RateReviewIcon />
                <ListItemText primary="My Reviews" sx={{ ml: 1 }} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} sm={8} md={9}>
          {renderPage(activePage)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobSeekerProfilePage;
