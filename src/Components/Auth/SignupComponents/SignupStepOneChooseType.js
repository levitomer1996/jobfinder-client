import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SignupStepOneChooseType = ({ setRole }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        p: 3,
        bgcolor: "#f9f9f9",
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      {/* Placeholder Image */}
      <Box
        sx={{
          width: "100px",
          height: "100px",
          bgcolor: "#e0e0e0",
          borderRadius: "50%",
          mx: "auto",
          mb: 2,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: "80px", color: "#757575", mt: 1 }} />
      </Box>

      {/* Title Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Ready for the next step?
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Create an account for tools to help you.
      </Typography>

      {/* Buttons */}
      <Button
        variant="outlined"
        fullWidth
        sx={{
          mb: 2,
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
        onClick={() => {
          setRole("jobseeker");
        }}
      >
        Job seeker
      </Button>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
        onClick={() => {
          setRole("employer");
        }}
      >
        Employer
      </Button>
    </Container>
  );
};

export default SignupStepOneChooseType;
