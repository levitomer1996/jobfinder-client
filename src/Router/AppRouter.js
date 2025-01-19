import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "../Components/Auth/Signup";
import Signin from "../Components/Auth/Signin";
import AuthProvider from "../Context/AuthContext";
import LandingPage from "../ProtectedPages/LandingPage";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
