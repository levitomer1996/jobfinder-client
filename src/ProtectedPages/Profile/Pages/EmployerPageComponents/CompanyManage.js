import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Divider,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { AuthContext } from "../../../../Context/AuthContext";
import useGetCompanyById from "../../../../Hook/useGetCompanyById";
import jts from "../../../../API/jts";

export const CompanyManage = () => {
  const { user } = useContext(AuthContext);
  const [companyResponse, loading, error] = useGetCompanyById(
    user.employerProfile.company
  );

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result); // local preview
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await jts.post(
          `/upload/company-profile-image/${user.employerProfile.company}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming your AuthContext includes a JWT token
            },
          }
        );

        console.log("✅ Image uploaded:", response.data.url);
      } catch (error) {
        console.error(
          "❌ Failed to upload image:",
          error.response?.data || error.message
        );
      }
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!companyResponse || !companyResponse.company) return null;

  const { company, recruiters, recruiterUsers } = companyResponse;

  const companyImage =
    previewImage ||
    `${process.env.REACT_APP_SERVER_URL}/${company.profileImage}` ||
    "";

  return (
    <Box p={3} maxWidth="lg" mx="auto">
      <Grid container spacing={3}>
        {/* Company Header */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3} textAlign="center">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Box onClick={handleAvatarClick} sx={{ cursor: "pointer" }}>
                  <Avatar
                    alt={company.name}
                    src={`${process.env.REACT_APP_SERVER_URL}${company.profileImage}`}
                    sx={{ width: 100, height: 100, mx: "auto" }}
                  />
                  <Typography variant="caption" color="primary">
                    Change Logo
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="h4" fontWeight="bold">
                  {company.name}
                </Typography>
                {company.description && (
                  <Typography variant="body1" color="text.secondary" mt={1}>
                    {company.description}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recruiter Section */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recruiters
          </Typography>
        </Grid>

        {recruiters && recruiters.length > 0 && recruiterUsers.length > 0 ? (
          recruiters.map((recruiter) => {
            const user = recruiterUsers.find((u) => u._id === recruiter.user);

            return (
              <Grid item xs={12} sm={6} md={4} key={recruiter._id}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user?.name || "Unknown"}
                    </Typography>
                    <Typography variant="body2">
                      Email: {user?.email || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      Phone: {user?.phoneNumber || "N/A"}
                    </Typography>
                    <Chip
                      label={`Employer ID: ${recruiter._id}`}
                      size="small"
                      sx={{ mt: 1, width: "fit-content" }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2, alignSelf: "start" }}
                      onClick={() => console.log("Send message to", user?.name)}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              No recruiters assigned.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
