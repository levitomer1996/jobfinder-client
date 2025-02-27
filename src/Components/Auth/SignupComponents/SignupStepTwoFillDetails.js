import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import jts from "../../../API/jts";

const SignupStepTwoFillDetails = ({ setUser, error, SumbitFinalForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setUser(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setSuccess(null);

    try {
      await jts.post("/users/register/jobseeker", formData);
      setSuccess("Registration successful!");
      SumbitFinalForm();
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.response?.data?.message || "Registration failed.");
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
        Create your account
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
          <PhoneIcon color="action" />
          <TextField
            variant="outlined"
            placeholder="Phone Number"
            name="phoneNumber"
            fullWidth
            size="small"
            value={formData.phoneNumber}
            onChange={handleChange}
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

      <Typography variant="body2" textAlign="center" mt={2}>
        Already have an account?{" "}
        <span style={{ color: "orange", cursor: "pointer" }}>Login</span>
      </Typography>
    </Container>
  );
};

export default SignupStepTwoFillDetails;
