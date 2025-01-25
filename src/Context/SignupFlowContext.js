import React, { createContext, useReducer, useEffect, useContext } from "react";

import jts from "../API/jts"; // ✅ Import Axios instance

export const SignupFlowContext = createContext();

const initialState = {
  user: null,
  role: null,
  step: 1,
  spinner: false,
  error: false,
};

const SignupFlowReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_ROLE":
      return { ...state, role: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_SPINNER":
      return { ...state, spinner: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const SignupFlowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SignupFlowReducer, initialState);

  const setSignupFlowRole = (role) => {
    dispatch({ type: "SET_USER_ROLE", payload: role });
  };
  const setSignupFlowUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };
  const setSignupFlowStep = (s) => {
    dispatch({ type: "SET_STEP", payload: s });
  };
  const setSpinner = (boolean) => {
    dispatch({ type: "SET_SPINNER", payload: boolean });
  };
  const setError = (boolean) => {
    dispatch({ type: "SET_ERROR", payload: boolean });
  };
  const SumbitFinalForm = () => {
    submitSignupForm();
  };

  async function submitSignupForm() {
    let creds = { ...state.user, role: state.role };

    try {
      setSpinner(true);
      console.log(creds);
      const response = await jts.post("/users/signup", creds); // Ensure the endpoint is correct
      localStorage.setItem("token", response.data.access_token);
      setSpinner(false);
      setSignupFlowStep(3);
      return response.data; // Return response data
    } catch (error) {
      setSpinner(false);
      setError(true);
    }
  }

  return (
    <SignupFlowContext.Provider
      value={{
        setSignupFlowRole,
        setSignupFlowStep,
        setSignupFlowUser,
        setSpinner,
        state,
        SumbitFinalForm,
      }}
    >
      {children}
    </SignupFlowContext.Provider>
  );
};

export default SignupFlowProvider;
