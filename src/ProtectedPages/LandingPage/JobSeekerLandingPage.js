import React, { useContext, useEffect, useState } from "react";
import JobSearchBar from "./Components/JobSearchBar";
import jts from "../../API/jts";
import { AuthContext } from "../../Context/AuthContext";
import HomepageJobLister from "./Components/HomepageJobLister";
import { Box, Button, TextField, Typography } from "@mui/material";

const JobSeekerLandingPage = () => {
  const { isLogged, user } = useContext(AuthContext);
  const [jobsNearYou, setJobsNearYou] = useState([]);
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [locationSearch, setLocationSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [jobTypeSearch, setJobTypeSearch] = useState(""); // ✅ add this

  useEffect(() => {
    if (user?.suggestedJobs) {
      setSuggestedJobs(user.suggestedJobs);
      console.log(user.suggestedJobs);
    }
  }, [user]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const query = "Tel aviv";
        const response = await jts.get("/jobs/bylocation", {
          params: { q: query },
        });
        setJobsNearYou(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await jts.get("/jobs/searchjob", {
        params: {
          title: titleSearch,
          location: locationSearch,
          jobType: jobTypeSearch, // ✅ include jobType in search
        },
      });
      console.log(response.data);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
        py: 4,
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="800"
        textAlign="center"
        sx={{
          color: "#1e293b",
          fontFamily: "Roboto, sans-serif",
          mb: 4,
          letterSpacing: "0.5px",
          lineHeight: 1.3,
          maxWidth: 700,
        }}
      >
        Track every job. Never miss a step.
      </Typography>

      {!isLogged && (
        <Box
          sx={{
            display: "flex",
            bgcolor: "#fff",
            borderRadius: "999px",
            overflow: "hidden",
            boxShadow: 1,
            width: "100%",
            maxWidth: 500,
            mb: 4,
          }}
        >
          <TextField
            placeholder="Enter your work email"
            variant="outlined"
            type="email"
            size="small"
            fullWidth
            sx={{
              "& fieldset": { border: "none" },
              "& input": {
                padding: "12px 16px",
              },
            }}
          />
          <Button
            sx={{
              background: "linear-gradient(to right, #f97316, #fb923c)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 0,
              px: 3,
              ":hover": {
                background: "linear-gradient(to right, #ea580c, #f97316)",
              },
            }}
          >
            Create account
          </Button>
        </Box>
      )}

      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <JobSearchBar
          setLocationSearch={setLocationSearch}
          setTitleSearch={setTitleSearch}
          setJobTypeSearch={setJobTypeSearch} // ✅ pass setter
          handleSearch={handleSearch}
        />
      </Box>

      <Box sx={{ width: "100%", maxWidth: 1000, mt: 4 }}>
        {jobs.length > 0 && (
          <HomepageJobLister jobs={jobs} title={"Found jobs"} />
        )}
        {isLogged && jobs.length < 1 && (
          <HomepageJobLister jobs={suggestedJobs} title={"Suggested Jobs"} />
        )}
        {isLogged && jobs.length < 1 && (
          <HomepageJobLister jobs={jobsNearYou} title={"Jobs near you"} />
        )}
      </Box>
    </Box>
  );
};

export default JobSeekerLandingPage;
