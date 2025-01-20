import "./App.css";

import AuthProvider from "./Context/AuthContext";
import AppRouter from "./Router/AppRouter";
import Header from "./Components/Layout/Header";

function App() {
  return (
    <AuthProvider>
      <Header />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
