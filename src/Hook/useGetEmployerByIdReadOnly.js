import { useEffect, useState } from "react";
import jts from "../API/jts"; // your axios instance

const useGetEmployerByIdReadOnly = (id) => {
  const [employer, setEmployer] = useState(null); // ✅ correct variable name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEmployer = async () => {
      setLoading(true);
      try {
        const response = await jts.get(
          `/users/getuserbyemployerid/readonly/${id}`
        );
        setEmployer(response.data); // ✅ assign response to employer
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch employer.");
        setEmployer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [id]);

  return [employer, loading, error]; // ✅ variable name matches useState
};

export default useGetEmployerByIdReadOnly;
