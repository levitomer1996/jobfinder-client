import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import jts from "../../../API/jts";
import { ModalContext } from "../../../Context/ModalContext";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomepageJobLister = ({ jobs, title }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="md"
      sx={{ mt: 5, fontFamily: "'Poppins', sans-serif" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center", mb: 4, fontFamily: "'Poppins', sans-serif" }}
      >
        {title}
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            jobId={job._id}
            title={job.title}
            description={job.description}
            date={job.date}
            category={job.category}
            location={job.location}
            user={user}
          />
        ))}
      </Grid>
    </Container>
  );
};

const JobCard = ({
  jobId,
  title,
  description,
  date,
  category,
  location,
  user,
}) => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={12} key={jobId}>
      <Card
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          position: "relative",
          fontFamily: "'Poppins', sans-serif",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
            transform: "translateY(-3px)",
          },
        }}
        onClick={() => navigate(`/job/${jobId}`)} // 🔁 redirect on click
      >
        <PushPinRoundedIcon
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#90a4ae",
          }}
        />

        <CardContent sx={{ fontFamily: "'Poppins', sans-serif" }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(date || Date.now()).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          <Typography variant="h6" fontWeight="600" sx={{ mt: 1, mb: 1.5 }}>
            {title}
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <WorkOutlineRoundedIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                {category || "Jobs"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <PlaceRoundedIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                {location || "Tel Aviv"}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description?.slice(0, 100) ||
              "Exciting opportunity in a growing company..."}
            ...
          </Typography>

          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#ff9800",
              fontWeight: 500,
              px: 3,
              py: 0.8,
              mt: 1,
              fontFamily: "'Poppins', sans-serif",
              "&:hover": {
                backgroundColor: "#fb8c00",
              },
            }}
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent card click
              if (user.jobSeekerProfile.resume.length > 0) {
                openModal("APPLY_TO_JOB", {
                  jobId,
                  jobSeekerId: user.jobSeekerProfile._id,
                });
              } else {
                openModal("RESUME_UPLOAD");
              }
            }}
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomepageJobLister;
