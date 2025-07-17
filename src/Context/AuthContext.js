import React, { createContext, useReducer, useEffect } from "react";
import jts from "../API/jts"; // ✅ Import Axios instance

export const AuthContext = createContext();

const initialState = {
  user: null,
  loading_auth: false,
  isLogged: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading_auth: false,
        isLogged: true,
      };
    case "LOGOUT":
      return { ...state, user: null, loading_auth: false, isLogged: false };
    case "SET_LOADING":
      return { ...state, loading_auth: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkUserSession = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await jts.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: "LOGIN", payload: response.data });
        } catch (error) {
          console.error("Invalid token, logging out", error);
          dispatch({ type: "SET_LOADING", payload: false });
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
        loading_auth: state.loading_auth,
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
