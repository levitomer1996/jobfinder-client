import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import jts from "../../../API/jts";
import { useNavigate } from "react-router-dom";

const SignupStepTwoFillDetails = ({ setUser, error, submitFinalForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigator = useNavigate();

  const [agree, setAgree] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      setLocalError("You must agree to the terms.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    setLocalError(null);
    setSpinner(true);
    setSuccess(null);

    try {
      const { confirmPassword, ...submissionData } = formData;
      setUser(submissionData);

      const res = await jts.post("/users/register/jobseeker", submissionData);

      if (res.status === 200) {
        setSuccess("Registration successful!");
        navigator("/signin");
        if (typeof submitFinalForm === "function") {
          submitFinalForm();
        }
      } else {
        setLocalError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Axios Error:", err);
      setLocalError(err.response?.data?.message || "Registration failed.");
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        background: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        p: 4,
        mt: 6,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ color: "#ea580c" }}
      >
        Create Your Account
      </Typography>

      <Typography
        variant="body2"
        textAlign="center"
        color="text.secondary"
        mb={3}
      >
        Maximize productivity with real-time insights, job tracking, and more.
      </Typography>

      {(error || localError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError || error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          fullWidth
          size="small"
          value={formData.name}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          size="small"
          value={formData.email}
          onChange={handleChange}
          required
          margin="dense"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          size="small"
          value={formData.password}
          onChange={handleChange}
          required
          margin="dense"
          helperText="Enter 6 or more characters"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          size="small"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          margin="dense"
          error={passwordMismatch}
          helperText={passwordMismatch ? "Passwords do not match" : ""}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              color="warning"
              required
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{" "}
              <Link href="#" underline="hover">
                Terms
              </Link>
              ,{" "}
              <Link href="#" underline="hover">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="#" underline="hover">
                DPA
              </Link>
              .
            </Typography>
          }
          sx={{ mt: 1 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={spinner}
          sx={{
            mt: 2,
            py: 1.2,
            fontWeight: "bold",
            fontSize: "1rem",
            background: "linear-gradient(to right, #f97316, #fb923c)",
            borderRadius: "8px",
            textTransform: "none",
            ":hover": {
              background: "linear-gradient(to right, #ea580c, #f97316)",
            },
          }}
        >
          {spinner ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create My Account"
          )}
        </Button>
      </form>

      <Typography variant="body2" textAlign="center" mt={3}>
        Already have an account?{" "}
        <Link href="/login" underline="hover" sx={{ color: "#ea580c" }}>
          Login
        </Link>
      </Typography>
    </Container>
  );
};

export default SignupStepTwoFillDetails;
