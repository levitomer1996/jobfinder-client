import React, { useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import useGetEmployerProfile from "../../../Hook/useGetEmployerProfile";
import { EmployerPageContext } from "../../../Context/EmployerPageContext";
import ManageJobsPage from "./EmployerPageComponents/ManageJobsPage";
import useGetUserJobs from "../../../Hook/useGetUserJobs";
import EmpProfilePage from "./EmployerPageComponents/EmpProfilePage";
import { CompanyManage } from "./EmployerPageComponents/CompanyManage";

const EmployerProfilePage = () => {
  const { activePage, setActivePage } = useContext(EmployerPageContext);

  const { employerProfile, loading, error, fetchGetEmployerProfile } =
    useGetEmployerProfile();
  const { jobs, get_user_jobs_loading, get_user_jobs_error } = useGetUserJobs();

  useEffect(() => {
    fetchGetEmployerProfile();
  }, []);

  function renderPage(p) {
    switch (p) {
      case "EmployerProfile":
        return <EmpProfilePage />;
      case "ManageJobs":
        return (
          <ManageJobsPage
            jobs={jobs}
            loading={get_user_jobs_loading}
            error={get_user_jobs_error}
          />
        );
      case "CompanyManage":
        return <CompanyManage />;
      default:
        return <Typography>Page Not Found</Typography>;
    }
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={4}>
        {/* Sidebar - 40% width */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "12px",
            }}
          >
            <Divider sx={{ mb: 2 }} />
            <List>
              {[
                { text: "Profile", key: "EmployerProfile" },
                { text: "Manage Jobs", key: "ManageJobs" },
                { text: "Company Info", key: "CompanyManage" },
                { text: "Settings", key: "Settings" },
              ].map((item) => (
                <ListItem
                  key={item.key}
                  button
                  selected={activePage === item.key}
                  onClick={() => setActivePage(item.key)}
                  sx={{
                    transition: "0.3s",
                    borderRadius: "8px",
                    bgcolor:
                      activePage === item.key ? "primary.light" : "white",
                    color: activePage === item.key ? "white" : "text.primary",
                    "&:hover": {
                      bgcolor: "orange",
                      color: "white",
                    },
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content - 60% width */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 4,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "12px",
              bgcolor: "#ffffff",
            }}
          >
            {renderPage(activePage)}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployerProfilePage;
