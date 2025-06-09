import { useEffect, useState } from "react";
import jts from "../API/jts"; // your axios instance

const useGetCompanyById = (id) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCompany = async () => {
      setLoading(true);
      try {
        const response = await jts.get(`/users/getcompanybyid/${id}`);
        setCompany(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch company.");
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  return [company, loading, error];
};

export default useGetCompanyById;
