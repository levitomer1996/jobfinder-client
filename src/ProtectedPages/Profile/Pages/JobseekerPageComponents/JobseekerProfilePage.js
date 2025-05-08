import React from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import RateReviewIcon from "@mui/icons-material/RateReview";

const JSProfilePage = ({ jobSeeker, error, loading }) => {
  return (
    <>
      {/* Profile Content */}
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Show Loading or Error */}
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Profile Info */}
        {jobSeeker && (
          <>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
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
              </Paper>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
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
              </Paper>
            </Grid>

            {/* Skills Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
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
              </Paper>
            </Grid>

            {/* Experience Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
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
              </Paper>
            </Grid>

            {/* Resume Upload */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Resume Upload
                </Typography>
                <TextField
                  type="file"
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
              </Paper>
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
    </>
  );
};

export default JSProfilePage;
