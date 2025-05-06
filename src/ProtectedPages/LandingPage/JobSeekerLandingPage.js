import React, { useEffect, useState } from "react";
import JobSearchBar from "./Components/JobSearchBar";
import JobsNearYou from "./Components/JobsNearYou";
import jts from "../../API/jts";

const JobSeekerLandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [locationSearch, setLocationSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const query = "Tel aviv";
        const response = await jts.get("/jobs/bylocation", {
          params: { q: query },
        });
        console.log(response.data);
        setJobs(response.data);
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
      <JobsNearYou jobs={jobs} />
    </div>
  );
};

export default JobSeekerLandingPage;
