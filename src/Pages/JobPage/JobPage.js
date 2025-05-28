import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Chip, Grid, Paper } from "@mui/material";
import { Helmet } from "react-helmet";
import useGetJob from "../../Hook/useGetJob";

const JobPage = () => {
  const { id } = useParams();
  const { job, useGetJob_loading, useGetJob_error } = useGetJob(id);

  if (useGetJob_loading) return <Typography>Loading job details...</Typography>;
  if (useGetJob_error)
    return (
      <Typography color="error">
        Error loading job: {useGetJob_error.message}
      </Typography>
    );

  return (
    <>
      <Helmet>
        <title>{job.title} | JobFinder</title>
        <meta name="description" content={job.description?.slice(0, 160)} />
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
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default JobPage;
