import React, { createContext, useReducer } from "react";

// Reducer Function
const employerPageReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_PAGE":
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  activePage: "EmployerProfile",
};

// Create Context
export const EmployerPageContext = createContext();

// Context Provider Component
const EmployerPageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employerPageReducer, initialState);

  // Function to Change Page
  const setActivePage = (page) => {
    dispatch({ type: "SET_ACTIVE_PAGE", payload: page });
  };

  return (
    <EmployerPageContext.Provider
      value={{ activePage: state.activePage, setActivePage }}
    >
      {children}
    </EmployerPageContext.Provider>
  );
};

export default EmployerPageProvider;
