import React, { useContext } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../../Context/AuthContext";
import { ModalContext } from "../../../Context/ModalContext";

const JobSearchBar = ({
  setLocationSearch,
  setTitleSearch,
  setJobTypeSearch,
  handleSearch,
  jobTypeSearch,
}) => {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#333", fontFamily: "'Poppins', sans-serif", mb: 2 }}
      >
        One Search, Millions of Jobs
      </Typography>

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: 3,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Title Input */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Job Title, Skills or Company"
              InputProps={{
                sx: {
                  borderRadius: "10px",
                  background: "#fff",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                },
              }}
              onChange={(e) => setTitleSearch(e.target.value)}
            />
          </Grid>

          {/* Location Input */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder='City, State, ZIP or "Remote"'
              InputProps={{
                sx: {
                  borderRadius: "10px",
                  background: "#fff",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                },
              }}
              onChange={(e) => setLocationSearch(e.target.value)}
            />
          </Grid>

          {/* Job Type Select */}
          <Grid item xs={12} sm={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Job Type</InputLabel>
              <Select
                value={jobTypeSearch}
                label="Job Type"
                onChange={(e) => setJobTypeSearch(e.target.value)}
                sx={{ borderRadius: "10px", background: "#fff" }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} sm={2.5}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: "#ff9800",
                color: "white",
                borderRadius: "25px",
                fontWeight: "bold",
                textTransform: "none",
                height: "100%",
                "&:hover": {
                  backgroundColor: "#e68900",
                  transform: "scale(1.05)",
                },
              }}
              onClick={handleSearch}
            >
              Search Jobs
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Resume Upload Suggestion */}
      {user &&
        user.role === "jobseeker" &&
        user.jobSeekerProfile?.resume?.length < 1 && (
          <Typography variant="body2" sx={{ mt: 2, color: "#555" }}>
            <Button
              onClick={() => openModal("RESUME_UPLOAD")}
              variant="text"
              sx={{
                p: 0,
                minWidth: "auto",
                fontWeight: "bold",
                color: "primary.main",
                textTransform: "none",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
            >
              Upload or create a resume
            </Button>{" "}
            to easily apply to jobs.
          </Typography>
        )}
    </Container>
  );
};

export default JobSearchBar;
