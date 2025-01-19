import React, { createContext, useReducer, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import jts from "../API/jts"; // ✅ Import Axios instance

export const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
  isLogged: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, loading: false, isLogged: true };
    case "LOGOUT":
      return { ...state, user: null, loading: false, isLogged: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await jts.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: "LOGIN", payload: response.data });
        } catch (error) {
          console.error("Invalid token, logging out", error);
          logout();
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    checkUserSession();
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        isLogged: state.isLogged,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
