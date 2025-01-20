import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

const JobSearchBar = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px", textAlign: "left" }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        One Search, Millions of Jobs
      </Typography>

      {/* Search Inputs */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Job Title, Skills or Company"
            InputProps={{
              sx: { borderRadius: "10px", borderColor: "#880E4F" },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder='City, State, ZIP or "Remote"'
            defaultValue="Petah Tikva, 02"
            InputProps={{ sx: { borderRadius: "10px" } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "orange",
              color: "white",
              borderRadius: "25px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#6d0b3a" },
            }}
          >
            Search Jobs
          </Button>
        </Grid>
      </Grid>

      {/* Resume Upload Link */}
      <Typography variant="body2" style={{ marginTop: "8px" }}>
        <Link href="#" underline="hover" fontWeight="bold">
          Upload or create a resume
        </Link>{" "}
        to easily apply to jobs.
      </Typography>
    </Container>
  );
};

export default JobSearchBar;
