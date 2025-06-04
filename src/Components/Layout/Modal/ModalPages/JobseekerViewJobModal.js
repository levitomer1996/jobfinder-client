import React, { useContext, useEffect, useState } from "react";
import jts from "../../../../API/jts";
import {
  Typography,
  Divider,
  Box,
  Chip,
  Stack,
  CircularProgress,
  Avatar,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import { ModalContext } from "../../../../Context/ModalContext";

const JobseekerViewJobModal = ({ content }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useContext(ModalContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchEmployerUser = async () => {
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

  if (loading || !cardDetails) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <CircularProgress color="warning" />
      </Box>
    );
  }

  const { name, email, _id, content: job } = cardDetails;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: "100%",
        maxHeight: "80vh",
        overflowY: "auto",
        backgroundColor: "#fffdf7",
        borderRadius: 3,
      }}
    >
      {/* Header: Employer Info + Message Button */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={isMobile ? "column" : "row"}
        mb={3}
      >
        <Grid
          item
          display="flex"
          alignItems="center"
          width={isMobile ? "100%" : "auto"}
        >
          <Avatar sx={{ bgcolor: "#ff9800", mr: 2 }}>
            <AccountCircleIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" color="black">
              {name}
            </Typography>
            <Typography variant="body2" color="black">
              {email}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3, borderColor: "#ffe0b2" }} />

      {/* Job Info */}
      <Typography variant="h5" fontWeight={700} color="black" gutterBottom>
        {job.title}
      </Typography>
      <Typography variant="body1" color="black" paragraph>
        {job.description}
      </Typography>

      <Typography variant="subtitle1" color="black" gutterBottom>
        <strong>Location:</strong> {job.location}
      </Typography>

      {/* Skills */}
      <Box mt={3}>
        <Typography variant="subtitle1" color="black" gutterBottom>
          <strong>Required Skills:</strong>
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {job.requiredSkills.map((skill) => (
            <Chip
              key={skill._id}
              label={skill.name}
              sx={{
                bgcolor: "#ffe0b2",
                color: "#e65100",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default JobseekerViewJobModal;
