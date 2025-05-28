import { useEffect, useState } from "react";
import jts from "../API/jts"; // adjust if needed

const useSearchCompanies = (searchTerm) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setCompanies([]);
      return;
    }

    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await jts.get(
          `/company/search?name=${encodeURIComponent(searchTerm)}`
        );
        setCompanies(res.data);
      } catch (err) {
        console.error("Failed to search companies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [searchTerm]);

  return { companies, loading };
};

export default useSearchCompanies;
