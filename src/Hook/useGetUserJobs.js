import { useState, useEffect } from "react";
import axios from "axios";
import jts from "../API/jts";

const useGetUserJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [get_user_jobs_loading, setLoading] = useState(true);
  const [get_user_jobs_error, setError] = useState(null);

  useEffect(() => {
    const fetchUserJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token"); // ✅ Get the token from localStorage
        if (!token) {
          throw new Error("User is not authenticated");
        }

        try {
          const res = await jts.get("jobs/getbyuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setJobs(res.data);
        } catch (error) {}

        // ✅ Store jobs in state
      } catch (err) {
        setError(err.res?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchUserJobs();
  }, []);

  return { jobs, get_user_jobs_loading, get_user_jobs_error };
};

export default useGetUserJobs;
