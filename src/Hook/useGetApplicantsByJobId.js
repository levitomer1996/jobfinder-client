import { useEffect, useState } from "react";

import jts from "../API/jts";

const useGetApplicantsByJobId = (jobId) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token"); // or use context/store
        const res = await jts.get(`users/getapplicantsbyjobid/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data)
        setApplicants(res.data);
      } catch (err) {
        console.error("Failed to fetch applicants", err);
        setError(err?.response?.data?.message || "Failed to fetch applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return { applicants, loading, error };
};

export default useGetApplicantsByJobId;
