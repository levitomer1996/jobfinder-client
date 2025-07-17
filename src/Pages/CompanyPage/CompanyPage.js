import React from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useGetCompanyById from "../../Hook/useGetCompanyById";
import RecruiterCard from "./Components/RecruiterCard";

const CompanyPage = () => {
  const { id } = useParams();
  const [company, loading, error] = useGetCompanyById(id);

  if (loading)
    return <CircularProgress sx={{ mt: 10, mx: "auto", display: "block" }} />;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!company) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={`${process.env.REACT_APP_SERVER_URL}${company.company.profileImage}`}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {company.company.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {company.company.description || "No company description available."}
          </Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Recruiters
          </Typography>

          {Array.isArray(company.recruiterUsers) &&
          company.recruiterUsers.length > 0 ? (
            <Grid container flexDirection={"row"} spacing={2}>
              {company.recruiterUsers.map((recruiter) => (
                <Grid item>
                  <RecruiterCard
                    id={recruiter.id}
                    email={recruiter.email}
                    name={recruiter.name}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">No recruiters found.</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CompanyPage;
