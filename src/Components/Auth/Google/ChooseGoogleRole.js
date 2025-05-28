// src/pages/ChooseGoogleRole.jsx

import React, { useState } from "react";
import { Container, Typography, Button, TextField, Box } from "@mui/material";

const ChooseGoogleRole = () => {
  const [role, setRole] = useState(null);
  const [companyName, setCompanyName] = useState("");

  const handleContinue = () => {
    const encodedState = encodeURIComponent(`${role}|${companyName}`);
    alert(encodedState);
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/users/google?state=${encodedState}`;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Continue with Google
      </Typography>
      <Typography>Select your account type:</Typography>

      <Box display="flex" gap={2} mt={2} mb={2}>
        <Button
          variant={role === "jobseeker" ? "contained" : "outlined"}
          onClick={() => setRole("jobseeker")}
        >
          Job Seeker
        </Button>
        <Button
          variant={role === "employer" ? "contained" : "outlined"}
          onClick={() => setRole("employer")}
        >
          Employer
        </Button>
      </Box>

      {role === "employer" && (
        <TextField
          label="Company Name"
          fullWidth
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      <Button
        disabled={!role || (role === "employer" && !companyName.trim())}
        variant="contained"
        onClick={handleContinue}
      >
        Continue with Google →
      </Button>
    </Container>
  );
};

export default ChooseGoogleRole;
