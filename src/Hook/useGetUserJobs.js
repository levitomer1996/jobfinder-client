import { useEffect, useState } from "react";
import jts from "../API/jts"; // your Axios instance with baseURL

const useGetUserJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [get_user_jobs_loading, setLoading] = useState(true);
  const [get_user_jobs_error, setError] = useState(null); // ✅ fixed JS syntax

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await jts.get("/jobs/getbyuser", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ manually attach token
          },
        });

        setJobs(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching user jobs:", error);
        setError(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            "Failed to fetch jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, get_user_jobs_loading, get_user_jobs_error };
};

export default useGetUserJobs;
