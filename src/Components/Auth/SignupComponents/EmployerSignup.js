import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";
import jts from "../../../API/jts";

const EmployerSignup = ({ setEmployer, SubmitEmployerForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    companyName: "",
  });
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setSpinner(false);
      return;
    }

    try {
      await jts.post("/users/register/employer", formData);
      setSuccess("Registration successful!");
      SubmitEmployerForm();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        p: 3,
        mt: 5,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="orange"
      >
        Sign Up
      </Typography>
      <Typography variant="body2" textAlign="center" color="gray" mb={2}>
        Create your employer account
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
          <PersonIcon color="action" />
          <TextField
            variant="outlined"
            placeholder="Full Name"
            name="name"
            fullWidth
            size="small"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
          <EmailIcon color="action" />
          <TextField
            variant="outlined"
            placeholder="Email"
            name="email"
            type="email"
            fullWidth
            size="small"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
          <LockIcon color="action" />
          <TextField
            variant="outlined"
            placeholder="Password"
            name="password"
            type="password"
            fullWidth
            size="small"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
          <LockIcon color="action" />
          <TextField
            variant="outlined"
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            size="small"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
          <BusinessIcon color="action" />
          <TextField
            variant="outlined"
            placeholder="Company Name"
            name="companyName"
            fullWidth
            size="small"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "orange",
            "&:hover": { bgcolor: "#ff8c00" },
            borderRadius: "24px",
          }}
        >
          {spinner ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>
      </form>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Button
        variant="outlined"
        fullWidth
        sx={{ borderColor: "orange", color: "orange", borderRadius: "24px" }}
      >
        Sign In with Google
      </Button>

      <Typography variant="body2" textAlign="center" mt={2}>
        Already have an account?{" "}
        <span style={{ color: "orange", cursor: "pointer" }}>Login</span>
      </Typography>
    </Container>
  );
};

export default EmployerSignup;
