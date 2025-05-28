import { useEffect, useState } from "react";
import jts from "../API/jts"; // adjust path if needed

const useGetJob = (jobId) => {
  const [job, setJob] = useState(null);
  const [useGetJob_loading, setLoading] = useState(true);
  const [useGetJob_error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJobWithSkills = async () => {
      try {
        setLoading(true);

        // Step 1: Get job
        const res = await jts.get(`/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const jobData = res.data;

        // Step 2: Extract skill IDs from requiredSkills
        const skillIds = (jobData.requiredSkills || []).map((s) =>
          typeof s === "string" ? s : s._id
        );

        // Step 3: Fetch full skill data
        const skillsRes = await jts.post(
          "/skill/by-ids",
          { ids: skillIds },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Step 4: Replace requiredSkills with full skill data
        jobData.requiredSkills = skillsRes.data;
        console.log(jobData);
        // Step 5: Save final job data
        setJob(jobData);
      } catch (err) {
        console.error("Failed to fetch job or skills", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobWithSkills();
  }, [jobId]);

  return { job, useGetJob_loading, useGetJob_error };
};

export default useGetJob;
