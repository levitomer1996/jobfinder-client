import React, { useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Box,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AuthContext } from "../../../../Context/AuthContext";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const appliedJobs = user?.appliedJobs || [];

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: "#000" }}>
        My Applied Jobs
      </Typography>

      {appliedJobs.length === 0 ? (
        <Typography sx={{ color: "#000" }}>
          You haven’t applied to any jobs yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {appliedJobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.01)" },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#000" }}
                  >
                    {job.title}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <WorkIcon fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ color: "#000" }}>
                      {job.description}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <LocationOnIcon fontSize="small" color="disabled" />
                    <Typography variant="body2" sx={{ color: "#000" }}>
                      {job.location}
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    gutterBottom
                    sx={{ color: "#000" }}
                  >
                    Required Skills:
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {job.requiredSkills.map((skill) => (
                      <Chip
                        key={skill._id}
                        label={skill.name}
                        sx={{
                          backgroundColor: "#ff9800",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff6f00",
                      "&:hover": {
                        backgroundColor: "#e65100",
                      },
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyJobs;
