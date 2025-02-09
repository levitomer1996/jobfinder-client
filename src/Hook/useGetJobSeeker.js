import { useState, useEffect } from "react";
import axios from "../API/jts"; // ✅ Import Axios instance

const useGetJobSeeker = () => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobSeeker = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // ✅ Get stored JWT token
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get("/jobseekers/getbyuser", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Send auth token
      });

      setJobSeeker(response.data); // ✅ Store JobSeeker data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch job seeker");
    } finally {
      setLoading(false);
    }
  };

  return { jobSeeker, loading, error, fetchJobSeeker };
};

export default useGetJobSeeker;
