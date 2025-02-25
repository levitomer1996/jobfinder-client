import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      location: "New York, NY",
      applicants: 120,
      status: "open",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "San Francisco, CA",
      applicants: 85,
      status: "open",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      applicants: 56,
      status: "closed",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    salaryRangeMin: "",
    salaryRangeMax: "",
    location: "",
    requiredSkills: "",
    status: "open",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddJob = () => {
    if (!newJob.title || !newJob.description || !newJob.location) return;

    setJobs([
      ...jobs,
      {
        id: jobs.length + 1,
        ...newJob,
        requiredSkills: newJob.requiredSkills
          .split(",")
          .map((skill) => skill.trim()), // Convert skills to an array
        applicants: 0,
      },
    ]);

    setNewJob({
      title: "",
      description: "",
      salaryRangeMin: "",
      salaryRangeMax: "",
      location: "",
      requiredSkills: "",
      status: "open",
    });

    handleClose();
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background with gradient effect */}
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "1200px",
          background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
          borderRadius: 4,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#333", mb: 3 }}
        >
          🏢 Manage Your Job Listings
        </Typography>

        {/* Add Job Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            mb: 4,
            bgcolor: "#ff9800",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 3,
            padding: "12px 24px",
            transition: "all 0.3s ease",
            "&:hover": { bgcolor: "#f57c00", transform: "scale(1.05)" },
          }}
          onClick={handleOpen}
        >
          Post a New Job
        </Button>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Job Cards */}
        <Grid container spacing={3}>
          {jobs.map((job, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <WorkOutlineIcon sx={{ color: "#ff9800", fontSize: 30 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {job.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  📍 {job.location}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: "green" }}
                >
                  👥 {job.applicants} Applicants
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  sx={{
                    mt: 2,
                    bgcolor: "#d32f2f",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 3,
                    transition: "all 0.3s",
                    "&:hover": { bgcolor: "#b71c1c", transform: "scale(1.05)" },
                  }}
                  fullWidth
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Remove Job
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Add Job Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", color: "#ff9800" }}
        >
          Create a Job Posting
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Job Title"
            fullWidth
            margin="normal"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          />
          <TextField
            label="Job Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
          />
          <TextField
            label="Salary Min"
            type="number"
            fullWidth
            margin="normal"
            value={newJob.salaryRangeMin}
            onChange={(e) =>
              setNewJob({ ...newJob, salaryRangeMin: e.target.value })
            }
          />
          <TextField
            label="Salary Max"
            type="number"
            fullWidth
            margin="normal"
            value={newJob.salaryRangeMax}
            onChange={(e) =>
              setNewJob({ ...newJob, salaryRangeMax: e.target.value })
            }
          />

          {/* Skills Input */}
          <TextField
            label="Required Skills (Comma Separated)"
            fullWidth
            margin="normal"
            value={newJob.requiredSkills}
            onChange={(e) =>
              setNewJob({ ...newJob, requiredSkills: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Cancel
          </Button>
          <Button onClick={handleAddJob} variant="contained">
            Post Job
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageJobsPage;
