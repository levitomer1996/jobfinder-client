import { useState } from "react";
import axios from "../API/jts"; // ✅ Import Axios instance

const useGetEmployerProfile = () => {
  const [employerProfile, setemployerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGetEmployerProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // ✅ Get stored JWT token
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get("/employers/getbyuser", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Send auth token
      });

      setemployerProfile(response.data); // ✅ Store JobSeeker data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch job seeker");
    } finally {
      setLoading(false);
    }
  };

  return { employerProfile, loading, error, fetchGetEmployerProfile };
};

export default useGetEmployerProfile;
