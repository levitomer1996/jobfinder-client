import "./App.css";
import AuthProvider from "./Context/AuthContext";

import AppRouter from "./Router/AppRouter";
import GlobalModal from "./Components/Layout/Modal/Modal";
import ModalProvider from "./Context/ModalContext";
import Header from "./Components/Layout/Header/Header";
// ✅

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Header />
        <AppRouter />
        <GlobalModal />
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
