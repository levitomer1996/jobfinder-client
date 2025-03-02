import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const JobSearchBar = () => {
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
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: "#333",
          fontFamily: "'Poppins', sans-serif",
          mb: 2,
        }}
      >
        One Search, Millions of Jobs
      </Typography>

      {/* Search Bar Container */}
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
          {/* Job Search Input */}
          <Grid item xs={12} sm={5}>
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
            />
          </Grid>

          {/* Location Search Input */}
          <Grid item xs={12} sm={4}>
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
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} sm={3}>
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
            >
              Search Jobs
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Resume Upload Link */}
      <Typography variant="body2" sx={{ mt: 2, color: "#555" }}>
        <Link href="#" underline="hover" fontWeight="bold" color="primary">
          Upload or create a resume
        </Link>{" "}
        to easily apply to jobs.
      </Typography>
    </Container>
  );
};

export default JobSearchBar;
