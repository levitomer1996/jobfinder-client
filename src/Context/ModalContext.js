import React, { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
  isOpened: false,
  page: null,
  content: null,
};

const modalReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "OPEN":
      return {
        isOpened: true,
        page: action.payload.page,
        content: action.payload.content,
      };
    case "CLOSE":
      return {
        isOpened: false,
        page: null,
      };
    default:
      return state;
  }
};

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (page, content) => {
    console.log({ page, content });
    dispatch({ type: "OPEN", payload: { page, content } });
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
