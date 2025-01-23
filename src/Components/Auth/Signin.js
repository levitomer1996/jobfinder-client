import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Divider,
  Alert,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import jts from "../../API/jts"; // Import API service

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await jts.post("/users/signin", formData);
      localStorage.setItem("token", response.data.access_token);
      setSuccess("Signin successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed. Try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5, p: 3, bgcolor: "white", boxShadow: 3, borderRadius: 2 }}
    >
      {/* Title Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Ready to take the next step?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Create an account or sign in.
      </Typography>

      <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
        By creating an account or signing in, you understand and agree to our
        <span style={{ color: "#0066cc", cursor: "pointer" }}> Terms</span>. You
        also acknowledge our
        <span style={{ color: "#0066cc", cursor: "pointer" }}> Cookie</span> and
        <span style={{ color: "#0066cc", cursor: "pointer" }}>
          {" "}
          Privacy
        </span>{" "}
        policies.
      </Typography>

      {/* Sign in with Google */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        sx={{
          mb: 2,
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Continue with Google
      </Button>

      {/* Sign in with Apple */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<AppleIcon />}
        sx={{
          mb: 2,
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Continue with Apple
      </Button>

      <Divider sx={{ my: 2 }}>or</Divider>

      {/* Success & Error Messages */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* Email Field */}
      <Typography variant="body1" fontWeight="bold">
        Email address <span style={{ color: "red" }}>*</span>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ mt: 1, mb: 2, borderRadius: "10px" }}
      />

      {/* Password Field */}
      <Typography variant="body1" fontWeight="bold">
        Password <span style={{ color: "red" }}>*</span>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        sx={{ mt: 1, mb: 2, borderRadius: "10px" }}
      />

      {/* Continue Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#b0c4de",
          color: "white",
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#9eb2c5" },
        }}
        disabled={!formData.email.trim() || !formData.password.trim()}
      >
        Continue →
      </Button>

      {/* Link to Signup Page */}
      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Don’t have an account?{" "}
        <Link href="/signup" sx={{ color: "#0066cc", fontWeight: "bold" }}>
          Sign up
        </Link>
      </Typography>
    </Container>
  );
};

export default SignIn;
