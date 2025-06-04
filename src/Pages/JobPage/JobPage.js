import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { Helmet } from "react-helmet";
import useGetJob from "../../Hook/useGetJob";
import { AuthContext } from "../../Context/AuthContext";
import { ModalContext } from "../../Context/ModalContext";

const JobPage = () => {
  const { id } = useParams();
  const { job, useGetJob_loading, useGetJob_error } = useGetJob(id);
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  if (useGetJob_loading) return <Typography>Loading job details...</Typography>;
  if (useGetJob_error)
    return (
      <Typography color="error">
        Error loading job: {useGetJob_error.message}
      </Typography>
    );

  const metaDescription =
    job.description?.length > 200
      ? `${job.description.slice(0, 197)}...`
      : job.description;

  return (
    <>
      <Helmet>
        <title>{job.title} | JobFinder</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${job.title} | JobFinder`} />
        <meta property="og:description" content={job.description} />
      </Helmet>

      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{ fontFamily: "'Poppins', sans-serif", mb: 2 }}
          >
            {job.title}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Posted on{" "}
            {new Date(job.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Location:</strong> {job.location}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Status:</strong> {job.status}
              </Typography>
            </Grid>
            {job.salaryRangeMin && job.salaryRangeMax && (
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Salary Range:</strong> ${job.salaryRangeMin} - $
                  {job.salaryRangeMax}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Typography
            variant="body1"
            sx={{ mb: 3, lineHeight: 1.7 }}
            color="text.primary"
          >
            {job.description}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Required Skills:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {job.requiredSkills?.map((skill) => (
                <Chip key={skill._id} label={skill.name} color="primary" />
              ))}
            </Box>
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
                    jobId: id,
                    jobSeekerId: user.jobSeekerProfile._id,
                  });
                } else {
                  openModal("RESUME_UPLOAD");
                }
              }}
            >
              Apply Now
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default JobPage;
