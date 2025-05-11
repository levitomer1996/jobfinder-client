// hooks/useGetChats.js or .ts
import { useEffect, useState } from "react";
import jts from "../API/jts"; // adjust path as needed

const useGetChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await jts.get("chat/getchatbyuserid", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setChats(res.data);
      } catch (err) {
        console.error("Failed to fetch chats", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return { chats, loading, error };
};

export default useGetChats;
