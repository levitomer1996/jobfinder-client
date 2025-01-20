import React, { useEffect, useState } from "react";
import employer_img from "../../Asstets/Avatars/employer_landing_page_avatar.webp";
import jobseeker_img from "../../Asstets/Avatars/jobseeker_landing_page_avatar.webp";
import {
  Container,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import JobSeekerLandingPage from "./JobSeekerLandingPage";
import EmployerLandingPage from "./EmployerLandingPage";

const HoverCardMedia = styled(CardMedia)({
  transition: "transform 0.3s ease-in-out", // ✅ Smooth transition
  "&:hover": {
    transform: "scale(1.1)", // ✅ Zoom effect on hover
  },
});

const LandingPage = () => {
  const [type, setType] = useState(null);

  useEffect(() => {
    getUnregisteredUserType();
  }, []);

  const getUnregisteredUserType = () => {
    let userType = localStorage.getItem("unregistered");
    if (userType) {
      setTypeOfUnregisteredUser(userType);
    }
  };

  const setTypeOfUnregisteredUser = (t) => {
    setType(t);
    localStorage.setItem("unregistered", t);
  };

  switch (type) {
    case null:
      return (
        <Container
          maxWidth="md"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Card>
                <HoverCardMedia
                  component="img"
                  image={jobseeker_img}
                  alt="Job Seeker"
                  style={{ height: "250px" }}
                />
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setTypeOfUnregisteredUser("JOBSEEKER");
                    }}
                  >
                    I'm looking for a job
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <HoverCardMedia
                  component="img"
                  image={employer_img}
                  alt="Employer"
                  style={{ height: "250px" }}
                />
                <CardContent>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => {
                      setTypeOfUnregisteredUser("EMPLOYER");
                    }}
                  >
                    I'm looking to hire
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      );
    case "JOBSEEKER":
      return <JobSeekerLandingPage />;
    case "EMPLOYER":
      return <EmployerLandingPage />;
  }
};

export default LandingPage;
