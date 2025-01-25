import React, { useContext, useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/system";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AuthContext } from "../../Context/AuthContext";

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

  const handleResumeUpload = (event) => {};

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
        {/* Profile Info */}
        <Grid item xs={12}>
          <StyledPaper>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar
                src="https://via.placeholder.com/150"
                sx={{ width: 100, height: 100 }}
              />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user.jobTitle}
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
              value={user.email}
              sx={{ mt: 2 }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={user.phone}
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
              {user.skills.map((skill, index) => (
                <Typography key={index}>• {skill}</Typography>
              ))}
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
              {user.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography fontWeight="bold">{exp.company}</Typography>
                  <Typography variant="body2">{exp.position}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {exp.years}
                  </Typography>
                </Box>
              ))}
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
            {user.resume && (
              <Typography sx={{ mt: 1 }} color="green">
                Uploaded: {user.resume.name}
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
      </Grid>
    </Container>
  );
};

export default ProfilePage;
