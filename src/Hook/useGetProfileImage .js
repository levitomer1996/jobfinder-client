import { useEffect, useState } from "react";
import jts from "../API/jts";

const useGetProfileImage = (userId) => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchProfileImage = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await jts.get(`/upload/profile-image-url/${userId}`, {});
        console.log(res.data.url);
        setProfileImageUrl(res.data.url);
      } catch (err) {
        console.error("Failed to fetch profile image", err);
        setError("Failed to fetch profile image");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, [userId]);

  return { profileImageUrl, loading, error };
};

export default useGetProfileImage;
