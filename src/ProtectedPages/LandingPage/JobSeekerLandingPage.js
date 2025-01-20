import React from "react";
import JobSearchBar from "./Components/JobSearchBar";
import JobsNearYou from "./Components/JobsNearYou";

const JobSeekerLandingPage = () => {
  return (
    <div>
      <JobSearchBar />
      <JobsNearYou />
    </div>
  );
};

export default JobSeekerLandingPage;
