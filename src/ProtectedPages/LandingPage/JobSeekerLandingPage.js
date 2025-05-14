import React, { useContext, useEffect, useState } from "react";
import JobSearchBar from "./Components/JobSearchBar";

import jts from "../../API/jts";
import { AuthContext } from "../../Context/AuthContext";
import HomepageJobLister from "./Components/HomepageJobLister";

const JobSeekerLandingPage = () => {
  const { isLogged, user } = useContext(AuthContext);
  const [jobsNearYou, setJobsNearYou] = useState([]);
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [locationSearch, setLocationSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");

  useEffect(() => {
    if (user?.suggestedJobs) {
      setSuggestedJobs(user.suggestedJobs);
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
    <div>
      <JobSearchBar
        setLocationSearch={setLocationSearch}
        setTitleSearch={setTitleSearch}
        handleSearch={handleSearch}
      />
      {jobs.length > 0 ? (
        <HomepageJobLister jobs={jobs} title={"Found jobs"} />
      ) : null}
      {isLogged && jobs.length < 1 ? (
        <HomepageJobLister jobs={suggestedJobs} title={"Suggested Jobs"} />
      ) : null}
      {isLogged && jobs.length < 1 ? (
        <HomepageJobLister jobs={jobsNearYou} title={"Jobs near you"} />
      ) : null}
    </div>
  );
};

export default JobSeekerLandingPage;
