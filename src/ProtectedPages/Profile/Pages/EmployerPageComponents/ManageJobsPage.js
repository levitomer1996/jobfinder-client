import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import jts from "../../../../API/jts";
import JobCard from "./ManageJobsPageComps/JobCard"; // ✅ Import JobCard Component

const ManageJobsPage = ({ jobs, loading, error }) => {
  const [open, setOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    salaryRangeMin: null,
    salaryRangeMax: null,
    location: "",
    requiredSkills: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddJob = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await jts.post("jobs/create", newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to create job", error);
    }
    handleClose();
  };

  const handleDeleteJob = (id) => {
    console.log(`Deleting job ID: ${id}`);
    // Implement delete logic here
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        paddingBottom: "50px",
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "1200px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          🚀 Manage Your Job Listings
        </Typography>

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

        <Grid container spacing={3}>
          {jobs.map((job, index) => (
            <Grid item xs={12} md={4} key={index}>
              <JobCard job={job} onDelete={handleDeleteJob} />
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
