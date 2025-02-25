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

const EmployerProfilePage = () => {
  const { employerProfile, loading, error, fetchGetEmployerProfile } =
    useGetEmployerProfile();
  const { activePage, setActivePage } = useContext(EmployerPageContext);

  useEffect(() => {
    fetchGetEmployerProfile();
  }, []);

  function renderPage(p) {
    switch (p) {
      case "EmployerProfile":
        return null;
      case "ManageJobs":
        return <ManageJobsPage />;
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
                { text: "Company Info", key: "CompanyInfo" },
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
