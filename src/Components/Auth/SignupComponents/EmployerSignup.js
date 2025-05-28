import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  FormControlLabel,
  Checkbox,
  Link,
  Autocomplete,
} from "@mui/material";
import jts from "../../../API/jts";
import useSearchCompanies from "../../../Hook/useSearchCompanies";

const EmployerSignup = ({ setEmployer, SubmitEmployerForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    companyName: "",
    agree: false,
  });
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [error, setError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [newCompanyData, setNewCompanyData] = useState({
    name: "",
    description: "",
    location: "",
  });

  const { companies, loading: loadingCompanies } = useSearchCompanies(
    formData.companyName
  );

  const renderSuccess = (s, e) => {
    if (e) return <Alert severity="error">{errorText}</Alert>;
    if (s) return <Alert severity="success">{s}</Alert>;
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);

    if (
      name === "confirmPassword" ||
      (name === "password" && newFormData.confirmPassword.length > 0)
    ) {
      setConfirmPasswordError(
        newFormData.confirmPassword !== newFormData.password
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setError(false);

    if (formData.password !== formData.confirmPassword) {
      setErrorText("Passwords do not match!");
      setError(true);
      setSpinner(false);
      return;
    }

    try {
      let companyWasFound = !showCreateCompany;
      let companyId = null;

      if (showCreateCompany) {
        const companyResponse = await jts.post("/company", newCompanyData);
        companyId = companyResponse.data._id;
      } else {
        const existingCompany = companies.find(
          (c) => c === formData.companyName
        );
        if (existingCompany) {
          const fetchCompany = await jts.get(
            `/company/search?name=${encodeURIComponent(existingCompany)}`
          );
          companyId = fetchCompany.data[0]?._id; // backend must support returning full objects
        }
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phoneNumber,
        agree: formData.agree,
        company: companyWasFound
          ? { found: true, companyId }
          : { found: false, ...newCompanyData },
      };

      await jts.post("/users/register/employer", payload);
      setSuccess("Registration successful!");
      SubmitEmployerForm();
    } catch (err) {
      setError(true);
      setErrorText(err.response?.data?.message || "Registration failed.");
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        background: "#fff",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        p: 4,
        mt: 6,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="orange" mb={1}>
        Create Your Account
      </Typography>
      <Typography variant="body2" color="gray" mb={2}>
        Maximize productivity with real-time insights, job tracking, and more.
      </Typography>

      {renderSuccess(success, error)}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="dense"
          placeholder="Full Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="dense"
          placeholder="Email *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="dense"
          placeholder="Password *"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Typography
          variant="caption"
          display="block"
          color="gray"
          textAlign="left"
          pl={1}
        >
          Enter 6 or more characters
        </Typography>

        <TextField
          fullWidth
          margin="dense"
          placeholder="Confirm Password *"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          error={confirmPasswordError}
          helperText={confirmPasswordError ? "Passwords do not match." : ""}
        />

        <TextField
          fullWidth
          margin="dense"
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <Autocomplete
          freeSolo
          options={companies}
          loading={loadingCompanies}
          inputValue={formData.companyName}
          onInputChange={(event, newInputValue) => {
            setFormData((prev) => ({ ...prev, companyName: newInputValue }));
            const companyExists = companies.includes(newInputValue);
            setShowCreateCompany(newInputValue && !companyExists);
            setNewCompanyData((prev) => ({ ...prev, name: newInputValue }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="dense"
              placeholder="Company Name *"
              required
            />
          )}
        />

        {showCreateCompany && (
          <Box sx={{ mt: 1, textAlign: "left" }}>
            <Typography variant="body2" fontWeight="bold">
              Create new company: "{formData.companyName}"
            </Typography>

            <TextField
              fullWidth
              margin="dense"
              placeholder="Company Description (optional)"
              value={newCompanyData.description}
              onChange={(e) =>
                setNewCompanyData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <TextField
              fullWidth
              margin="dense"
              placeholder="Location (optional)"
              value={newCompanyData.location}
              onChange={(e) =>
                setNewCompanyData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
          </Box>
        )}

        <Box textAlign="left" mt={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agree}
                onChange={handleChange}
                name="agree"
                required
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link href="#" color="primary">
                  Terms
                </Link>
                ,{" "}
                <Link href="#" color="primary">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" color="primary">
                  DPA
                </Link>
                .
              </Typography>
            }
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "orange",
            borderRadius: 3,
            fontWeight: "bold",
            py: 1.2,
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": { bgcolor: "#ff8c00" },
          }}
        >
          {spinner ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create My Account"
          )}
        </Button>
      </Box>

      <Typography variant="body2" mt={2}>
        Already have an account?{" "}
        <Link href="#" sx={{ color: "orange", fontWeight: "bold" }}>
          Login
        </Link>
      </Typography>
    </Container>
  );
};

export default EmployerSignup;
