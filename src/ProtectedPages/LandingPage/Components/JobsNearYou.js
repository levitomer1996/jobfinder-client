import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
} from "@mui/material";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import jts from "../../../API/jts";
import { ModalContext } from "../../../Context/ModalContext";

const JobsNearYou = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const query = "Tel aviv";
        const response = await jts.get("/jobs/bylocation", {
          params: { q: query },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center", mb: 4 }}
      >
        🚀 Jobs Near You
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <JobNearYouCard
            key={job.id}
            title={job.title}
            description={job.description}
            date={job.date}
            category={job.category}
            location={job.location}
          />
        ))}
      </Grid>
    </Container>
  );
};

const JobNearYouCard = ({
  id,
  title,
  description,
  date,
  category,
  location,
}) => {
  const { openModal } = useContext(ModalContext);

  return (
    <Grid item xs={12} key={id}>
      <Card
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
            transform: "translateY(-3px)",
          },
        }}
      >
        {/* Push Pin Icon */}
        <PushPinRoundedIcon
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#90a4ae",
          }}
        />

        <CardContent>
          {/* Date */}
          <Typography variant="caption" color="text.secondary">
            {new Date(date || Date.now()).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          {/* Job Title */}
          <Typography variant="h6" fontWeight="600" sx={{ mt: 1, mb: 1.5 }}>
            {title}
          </Typography>

          {/* Job info */}
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

          {/* Description (short) */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description?.slice(0, 100) ||
              "Exciting opportunity in a growing company..."}
            ...
          </Typography>

          {/* Apply Button */}
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#ff9800", // Orange
              fontWeight: 500,
              px: 3,
              py: 0.8,
              mt: 1,
              "&:hover": {
                backgroundColor: "#fb8c00",
              },
            }}
            onClick={() => {
              openModal("RESUME_UPLOAD");
            }}
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobsNearYou;
