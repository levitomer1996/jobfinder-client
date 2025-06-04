import "./App.css";
import AuthProvider from "./Context/AuthContext";

import AppRouter from "./Router/AppRouter";
import GlobalModal from "./Components/Layout/Modal/Modal";
import ModalProvider from "./Context/ModalContext";
import Header from "./Components/Layout/Header/Header";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadScript } from "@react-google-maps/api"; // ✅

function App() {
  return (
    <GoogleOAuthProvider clientId="205200934678-32ib30tg98d2rncfd13avh8rqgkbriol.apps.googleusercontent.com">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <AuthProvider>
          <ModalProvider>
            <AppRouter />
            <GlobalModal />
          </ModalProvider>
        </AuthProvider>
      </LoadScript>
    </GoogleOAuthProvider>
  );
}

export default App;
