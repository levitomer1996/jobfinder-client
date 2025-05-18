import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, []);

  return <div>Signing in with Google...</div>;
};

export default OAuth2Callback;
