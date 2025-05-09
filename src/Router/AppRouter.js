import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "../Components/Auth/Signup";
import Signin from "../Components/Auth/Signin";
import AuthProvider, { AuthContext } from "../Context/AuthContext";
import LandingPage from "../ProtectedPages/LandingPage/LandingPage";
import { ProtectedRoute } from "../Components/Auth/ProtectedRoute";
import SignupFlowProvider from "../Context/SignupFlowContext";
import ProfilePage from "../ProtectedPages/Profile/ProfilePage";
import ChatPage from "../ProtectedPages/ChatPage/ChatPage";

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
