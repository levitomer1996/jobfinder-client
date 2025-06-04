import React, { useContext } from "react";
import { Box, CircularProgress } from "@mui/material";

import { AuthContext } from "../../Context/AuthContext";

import EmployerProfilePage from "./Pages/EmployerProfilePage";
import JobSeekerProfilePage from "./Pages/JobSeekerProfilePage";
import EmployerPageProvider from "../../Context/EmployerPageContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    switch (user.role) {
      case "jobseeker":
        return (
          <EmployerPageProvider>
            <JobSeekerProfilePage />
          </EmployerPageProvider>
        );
      case "employer":
        return (
          <EmployerPageProvider>
            <EmployerProfilePage />
          </EmployerPageProvider>
        );
      default:
        return <div>Please login</div>;
    }
  } else {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress style={{ color: "orange" }} />
      </Box>
    );
  }
};

export default ProfilePage;
