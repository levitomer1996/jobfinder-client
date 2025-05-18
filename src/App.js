import "./App.css";
import AuthProvider from "./Context/AuthContext";

import AppRouter from "./Router/AppRouter";
import GlobalModal from "./Components/Layout/Modal/Modal";
import ModalProvider from "./Context/ModalContext";
import Header from "./Components/Layout/Header/Header";

import { GoogleOAuthProvider } from "@react-oauth/google";
// ✅

function App() {
  return (
    <GoogleOAuthProvider clientId="205200934678-32ib30tg98d2rncfd13avh8rqgkbriol.apps.googleusercontent.com">
      <AuthProvider>
        <ModalProvider>
          <Header />
          <AppRouter />
          <GlobalModal />
        </ModalProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
