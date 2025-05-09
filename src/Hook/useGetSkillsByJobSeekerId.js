import { useState } from "react";
import axios from "../API/jts"; // Axios instance

const useGetSkillsByJobSeekerId = () => {
  const [jobSeekerSkills, setJobSeekerSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkills = async (jobseekerid) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(
        `/jobseekers/getskillsbyuserid?jobseekerid=${jobseekerid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobSeekerSkills(response.data); // response is Skill[]
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  return { jobSeekerSkills, loading, error, fetchSkills };
};

export default useGetSkillsByJobSeekerId;
