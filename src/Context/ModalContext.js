import React, { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
  isOpened: false,
  content: null,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return {
        isOpened: true,
        content: action.payload,
      };
    case "CLOSE":
      return {
        isOpened: false,
        content: null,
      };
    default:
      return state;
  }
};

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (content) => {
    dispatch({ type: "OPEN", payload: content });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE" });
  };

  return (
    <ModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
