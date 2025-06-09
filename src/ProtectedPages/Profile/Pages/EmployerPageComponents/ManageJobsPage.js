import React, { useState } from "react";
import {
  Box,
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
  Autocomplete,
  IconButton,
  Stack,
  Divider,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import jts from "../../../../API/jts";
import JobCard from "./ManageJobsPageComps/JobCard";
import useSkillRegexSearch from "../../../../Hook/useSkillRegexSearch";

const ManageJobsPage = ({ jobs, loading, error }) => {
  const [open, setOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "full-time", // ✅ default
    requiredSkills: [""],
  });

  const { skillsResults, searchSkills } = useSkillRegexSearch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setNewJob({
      title: "",
      description: "",
      location: "",
      jobType: "full-time",
      requiredSkills: [""],
    });
    setOpen(false);
  };

  const handleAddJob = async () => {
    try {
      const token = localStorage.getItem("token");
      await jts.post("jobs/create", newJob, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Failed to create job", error);
    }
    handleClose();
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...newJob.requiredSkills];
    updatedSkills[index] = value;
    setNewJob({ ...newJob, requiredSkills: updatedSkills });
  };

  const handleAddSkillField = () => {
    setNewJob({ ...newJob, requiredSkills: [...newJob.requiredSkills, ""] });
  };

  const handleRemoveSkillField = (index) => {
    const updatedSkills = newJob.requiredSkills.filter((_, i) => i !== index);
    setNewJob({ ...newJob, requiredSkills: updatedSkills });
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Manage Job Listings
        </Typography>
        <Button variant="contained" color="warning" onClick={handleOpen}>
          Create New Job
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress color="warning" />
        </Box>
      ) : error ? (
        <Alert severity="error">{error?.message || "Error loading jobs"}</Alert>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <JobCard job={job} onDelete={() => console.log("delete")} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Job Creation Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ fontWeight: "bold", borderBottom: "1px solid #e0e0e0" }}
        >
          New Job Posting
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
            />
            <TextField
              label="Location"
              fullWidth
              value={newJob.location}
              onChange={(e) =>
                setNewJob({ ...newJob, location: e.target.value })
              }
            />
            <TextField
              select
              label="Job Type"
              fullWidth
              value={newJob.jobType}
              onChange={(e) =>
                setNewJob({ ...newJob, jobType: e.target.value })
              }
            >
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
            </TextField>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold">
              Required Skills
            </Typography>

            {newJob.requiredSkills.map((skill, index) => (
              <Grid container spacing={1} alignItems="center" key={index}>
                <Grid item xs={11}>
                  <Autocomplete
                    freeSolo
                    options={skillsResults.map((s) => s.name)}
                    value={skill}
                    onInputChange={(e, value) => {
                      handleSkillChange(index, value);
                      searchSkills(value);
                    }}
                    onChange={(e, newValue) =>
                      handleSkillChange(index, newValue || "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`Skill #${index + 1}`}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveSkillField(index)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Box>
              <Button onClick={handleAddSkillField} size="small">
                + Add Another Skill
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid #e0e0e0",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button variant="contained" color="warning" onClick={handleAddJob}>
            Post Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageJobsPage;
