import React, { useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";

import useGetEmployerProfile from "../../../Hook/useGetEmployerProfile";
import { EmployerPageContext } from "../../../Context/EmployerPageContext";
import ManageJobsPage from "./EmployerPageComponents/ManageJobsPage";
import useGetUserJobs from "../../../Hook/useGetUserJobs";
import { CompanyManage } from "./EmployerPageComponents/CompanyManage";
import EmployerProfile from "./EmployerPageComponents/EmployerProfile";

const pageItems = [
  { text: "Profile", key: "EmployerProfile", icon: <PersonIcon /> },
  { text: "Manage Jobs", key: "ManageJobs", icon: <WorkIcon /> },
  { text: "Company Info", key: "CompanyManage", icon: <BusinessIcon /> },
  { text: "Settings", key: "Settings", icon: <SettingsIcon /> },
];

const EmployerProfilePage = () => {
  const { activePage, setActivePage } = useContext(EmployerPageContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { employerProfile, fetchGetEmployerProfile } = useGetEmployerProfile();
  const { jobs, get_user_jobs_loading, get_user_jobs_error } = useGetUserJobs();

  useEffect(() => {
    fetchGetEmployerProfile();
  }, []);

  const renderPage = (p) => {
    switch (p) {
      case "EmployerProfile":
        return <EmployerProfile />;
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
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5, mb: isMobile ? 10 : 5 }}>
        <Grid container spacing={4}>
          {/* Sidebar - Desktop only */}
          {!isMobile && (
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
                  {pageItems.map((item) => (
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
                        color:
                          activePage === item.key ? "white" : "text.primary",
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
          )}

          {/* Main content */}
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

      {/* Bottom Navigation - Mobile only */}
      {isMobile && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            borderTop: "1px solid #ddd",
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={pageItems.findIndex((i) => i.key === activePage)}
            onChange={(event, newValue) =>
              setActivePage(pageItems[newValue].key)
            }
          >
            {pageItems.map((item) => (
              <BottomNavigationAction
                key={item.key}
                label={item.text}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

export default EmployerProfilePage;
