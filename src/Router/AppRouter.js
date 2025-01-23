import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "../Components/Auth/Signup";
import Signin from "../Components/Auth/Signin";
import AuthProvider, { AuthContext } from "../Context/AuthContext";
import LandingPage from "../ProtectedPages/LandingPage/LandingPage";
import { ProtectedRoute } from "../Components/Auth/ProtectedRoute";
import SignupFlowProvider from "../Context/SignupFlowContext";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            <SignupFlowProvider>
              <Signup />
            </SignupFlowProvider>
          }
        />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
