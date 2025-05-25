import React, { useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  BottomNavigation,
  BottomNavigationAction,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Container maxWidth="md" sx={{ mt: isMobile ? 2 : 4 }}>
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Header */}
        {isMobile ? (
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ width: 72, height: 72 }}>
              {jobSeeker?.name?.[0] || "?"}
            </Avatar>
            <Typography fontWeight="bold">
              {jobSeeker?.name || "Job Seeker"}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {jobSeeker?.email || ""}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  My Profile
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem
                    button
                    selected={activePage === "MY_PROFILE"}
                    onClick={() => setActivePage("MY_PROFILE")}
                  >
                    <AccountCircleIcon />
                    <ListItemText primary="Profile" sx={{ ml: 1 }} />
                  </ListItem>
                  <ListItem
                    button
                    selected={activePage === "MY_JOBS"}
                    onClick={() => setActivePage("MY_JOBS")}
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
            <Grid item xs={12} sm={8}>
              {renderPage(activePage)}
            </Grid>
          </Grid>
        )}

        {/* Main Content (Mobile mode) */}
        {isMobile && <Box>{renderPage(activePage)}</Box>}

        {/* Bottom Nav (only for mobile) */}
        {isMobile && (
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              borderTop: "1px solid #ddd",
            }}
          >
            <BottomNavigation
              showLabels
              value={activePage}
              onChange={(e, newValue) => setActivePage(newValue)}
            >
              <BottomNavigationAction
                label="Profile"
                value="MY_PROFILE"
                icon={<AccountCircleIcon />}
              />
              <BottomNavigationAction
                label="My Jobs"
                value="MY_JOBS"
                icon={<WorkOutlineIcon />}
              />
              <BottomNavigationAction
                label="Reviews"
                value="MY_REVIEWS"
                icon={<RateReviewIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default JobSeekerProfilePage;
