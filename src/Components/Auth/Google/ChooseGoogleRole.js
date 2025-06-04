// src/pages/ChooseGoogleRole.jsx

import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";

const ChooseGoogleRole = () => {
  const [role] = useState(null);
  const [companyName] = useState("");

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

      <Button variant="contained" onClick={handleContinue}>
        Continue with Google →
      </Button>
    </Container>
  );
};

export default ChooseGoogleRole;
