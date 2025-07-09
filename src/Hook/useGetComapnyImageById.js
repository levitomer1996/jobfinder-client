import { useEffect, useState } from "react";
import jts from "../API/jts";

const useGetCompanyImageById = (id) => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfileImage = async () => {
      try {
        setLoading(true);
        const res = await jts.get(`/company/${id}/profile-image`);
        setProfileImage(res.data); // if server returns a string like "/uploads/xyz.jpg"
      } catch (err) {
        setError(err);
        setProfileImage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, [id]);

  return { profileImage, loading, error };
};

export default useGetCompanyImageById;
