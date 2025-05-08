import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../Context/ModalContext";
import jts from "../../../../API/jts";
import {
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  Button,
  Avatar,
} from "@mui/material";

const JobseekerViewJobModal = ({ content }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { closeModal } = useContext(ModalContext);

  useEffect(() => {
    const fetchEmployerUser = async () => {
      setLoading(true);
      try {
        const res = await jts.post(
          "/users/getuserbyemployerid",
          { id: content.postedBy },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCardDetails({ ...res.data, content });
      } catch (error) {
        console.error("Failed to fetch employer user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployerUser();
  }, [content.postedBy]);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Loading job details...</Typography>
      </Box>
    );
  }

  if (!cardDetails) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">Failed to load job details</Typography>
      </Box>
    );
  }

  const {
    firstName,
    lastName,
    email,
    companyName,
    companyDescription,
    content: {
      jobTitle,
      description,
      location,
      salary,
      jobType,
      requirements,
      responsibilities,
      applicationDeadline,
    },
  } = cardDetails;

  // Format date
  const formattedDeadline = applicationDeadline
    ? new Date(applicationDeadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No deadline specified";

  return (
    <Box sx={{ maxHeight: "80vh", overflow: "auto", p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {jobTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {companyName} - {location}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, my: 1 }}>
          <Chip label={jobType} color="primary" size="small" />
          <Chip label={`$${salary}`} color="success" size="small" />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Job Description
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            {requirements?.split("\n").map((req, index) => (
              <Typography
                key={index}
                variant="body2"
                component="div"
                sx={{ display: "flex", mb: 1 }}
              >
                • {req}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Responsibilities
            </Typography>
            {responsibilities?.split("\n").map((resp, index) => (
              <Typography
                key={index}
                variant="body2"
                component="div"
                sx={{ display: "flex", mb: 1 }}
              >
                • {resp}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          About {companyName}
        </Typography>
        <Typography variant="body1">{companyDescription}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body1">{email}</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Application Deadline: {formattedDeadline}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={closeModal}>
          Close
        </Button>
        <Button variant="contained" color="primary">
          Apply Now
        </Button>
      </Box>
    </Box>
  );
};

export default JobseekerViewJobModal;
