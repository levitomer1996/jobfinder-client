import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "../Components/Auth/Signup";
import Signin from "../Components/Auth/Signin";
import AuthProvider from "../Context/AuthContext";
import LandingPage from "../ProtectedPages/LandingPage/LandingPage";
import { ProtectedRoute } from "../Components/Auth/ProtectedRoute";
import SignupFlowProvider from "../Context/SignupFlowContext";
import ProfilePage from "../ProtectedPages/Profile/ProfilePage";
import ChatPage from "../ProtectedPages/ChatPage/ChatPage";
import OAuth2Callback from "../Components/Auth/Google/OAuth2Callback";
import ChooseGoogleRole from "../Components/Auth/Google/ChooseGoogleRole";
import JobPage from "../Pages/JobPage/JobPage";

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
        <Route path="/oauth2callback" element={<OAuth2Callback />} />
        <Route path="/choose-role" element={<ChooseGoogleRole />} />
        <Route path="/job/:id" element={<JobPage />} /> {/* ✅ Add job route */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
