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
import { ModalContext } from "../../../../Context/ModalContext";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const appliedJobs = user?.appliedJobs || [];

  return (
    <Container sx={{ mt: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant={{ xs: "h5", sm: "h4" }} // Smaller on mobile
        fontWeight="bold"
        sx={{ mb: { xs: 2, sm: 3 }, color: "#000" }} // Responsive margin-bottom
      >
        My Applied Jobs
      </Typography>

      {appliedJobs.length === 0 ? (
        <Typography
          sx={{ color: "#000", fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          You haven’t applied to any jobs yet.
        </Typography>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {" "}
          {/* Responsive spacing between cards */}
          {appliedJobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                  },
                  display: "flex", // Enable flexbox for card content
                  flexDirection: "column", // Stack contents vertically
                  height: "100%", // Make cards expand to fill grid height
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {" "}
                  {/* Content takes available space */}
                  <Typography
                    variant={{ xs: "h6", sm: "h5" }} // Responsive job title
                    fontWeight="bold"
                    sx={{ color: "#000", mb: 1 }}
                  >
                    {job.title}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    mt={1}
                  >
                    {" "}
                    {/* Align items to start for multi-line description */}
                    <WorkIcon
                      fontSize="small"
                      color="primary"
                      sx={{ mt: "2px" }}
                    />{" "}
                    {/* Slight margin-top for icon alignment */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#000",
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3, // Limit description to 3 lines
                        textOverflow: "ellipsis", // Add ellipsis if clamped
                      }}
                    >
                      {job.description}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <LocationOnIcon fontSize="small" color="action" />{" "}
                    {/* Changed to 'action' for better visibility */}
                    <Typography variant="body2" sx={{ color: "#000" }}>
                      {job.location}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />{" "}
                  {/* Responsive margin for divider */}
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    gutterBottom
                    sx={{
                      color: "#000",
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    }} // Responsive font size
                  >
                    Required Skills:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: { xs: 0.5, sm: 1 },
                    }}
                  >
                    {" "}
                    {/* Responsive gap for chips */}
                    {job.requiredSkills.map((skill) => (
                      <Chip
                        key={skill._id}
                        label={skill.name}
                        size="small" // Make chips smaller on mobile
                        sx={{
                          backgroundColor: "#ff9800",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: { xs: "0.7rem", sm: "0.8rem" }, // Responsive font size for chips
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    justifyContent: "flex-end",
                    mt: "auto",
                  }}
                >
                  {" "}
                  {/* Push to bottom with mt: 'auto' */}
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
                      fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Responsive font size for button
                      px: { xs: 1.5, sm: 2 }, // Responsive horizontal padding
                      py: { xs: 0.7, sm: 1 }, // Responsive vertical padding
                    }}
                    onClick={() => {
                      openModal("JOBSEEKER_VIEW_JOB", job);
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
