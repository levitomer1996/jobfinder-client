import React, { createContext, useReducer } from "react";

// Reducer Function
const jobSeekerPageReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_PAGE":
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  activePage: "JobSeekerProfile",
};

// Create Context
export const JobSeekerPageContext = createContext();

// Context Provider Component
const JobSeekerPageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobSeekerPageReducer, initialState);

  // Function to Change Page
  const setActivePage = (page) => {
    dispatch({ type: "SET_ACTIVE_PAGE", payload: page });
  };

  return (
    <JobSeekerPageContext.Provider
      value={{ activePage: state.activePage, setActivePage }}
    >
      {children}
    </JobSeekerPageContext.Provider>
  );
};

export default JobSeekerPageProvider;
