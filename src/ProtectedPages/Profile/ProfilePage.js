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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: "flex" }}>
      {/* Sidebar Navigation */}
      <Sidebar sx={{ width: "250px", mr: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          My Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WorkOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="My Jobs" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="My Reviews" />
          </ListItem>
        </List>
      </Sidebar>

      {/* Profile Content */}
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Show Loading or Error */}
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Profile Info */}
        {jobSeeker && (
          <>
            <Grid item xs={12}>
              <StyledPaper>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Avatar
                    src="https://via.placeholder.com/150"
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {jobSeeker.user.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {jobSeeker.user.jobTitle || "No job title set"}
                    </Typography>
                  </Box>
                </Box>
              </StyledPaper>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h6" fontWeight="bold">
                  Contact Information
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  value={jobSeeker.user.email}
                  sx={{ mt: 2 }}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={jobSeeker.user.phone || "No phone number set"}
                  sx={{ mt: 2 }}
                  InputProps={{ readOnly: true }}
                />
              </StyledPaper>
            </Grid>

            {/* Skills Section */}
            <Grid item xs={12} md={6}>
              <StyledPaper>
                <Typography variant="h6" fontWeight="bold">
                  Skills
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {jobSeeker.skills.length > 0 ? (
                    jobSeeker.skills.map((skill, index) => (
                      <Typography key={index}>• {skill}</Typography>
                    ))
                  ) : (
                    <Typography color="textSecondary">
                      No skills added yet
                    </Typography>
                  )}
                </Box>
              </StyledPaper>
            </Grid>

            {/* Experience Section (Now an Array) */}
            <Grid item xs={12} md={6}>
              <StyledPaper>
                <Typography variant="h6" fontWeight="bold">
                  Experience
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {jobSeeker.experience.length > 0 ? (
                    jobSeeker.experience.map((exp, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography fontWeight="bold">{exp.company}</Typography>
                        <Typography variant="body2">{exp.position}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {exp.years}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography color="textSecondary">
                      No experience added yet
                    </Typography>
                  )}
                </Box>
              </StyledPaper>
            </Grid>

            {/* Resume Upload */}
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h6" fontWeight="bold">
                  Resume Upload
                </Typography>
                <TextField
                  type="file"
                  onChange={handleResumeUpload}
                  fullWidth
                  inputProps={{ accept: ".pdf,.docx" }}
                  sx={{ mt: 2 }}
                />
                {jobSeeker.resume ? (
                  <Typography sx={{ mt: 1 }} color="green">
                    Uploaded: {jobSeeker.resume}
                  </Typography>
                ) : (
                  <Typography color="textSecondary">
                    No resume uploaded yet
                  </Typography>
                )}
              </StyledPaper>
            </Grid>

            {/* Edit Profile Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  backgroundColor: "#1976d2",
                }}
              >
                Edit Profile
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
