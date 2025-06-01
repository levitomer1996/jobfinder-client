import React, { useContext } from "react";

import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContext } from "../../../Context/ModalContext";
import RModalPages from "./RModalPages"; // Assuming RModalPages handles its own content responsiveness

const GlobalModal = () => {
  const { state, closeModal } = useContext(ModalContext);

  // Responsive style object for the modal content box
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    // Responsive width:
    // On extra-small screens (mobile), take 90% of the viewport width.
    // On small screens (tablets), take 80% of the viewport width, with a max of 500px.
    // On medium and larger screens, fix it to 400px or whatever preferred desktop width.
    width: { xs: "90%", sm: "80%", md: 400 },
    maxWidth: "calc(100% - 32px)", // Ensure it doesn't overflow horizontally on very small screens, 16px padding on each side
    // Responsive padding:
    // On extra-small screens, use less padding.
    // On larger screens, use standard padding.
    p: { xs: 2, sm: 3, md: 4 }, // Padding: 2 units on xs, 3 on sm, 4 on md and up
    // Optional: Max height and overflow for scrollable content
    maxHeight: "90vh", // Maximum height of the modal, 90% of viewport height
    overflowY: "auto", // Enable vertical scrolling if content exceeds maxHeight
    display: "flex", // Use flexbox for internal layout (optional, but good practice)
    flexDirection: "column", // Stack children vertically
  };

  return (
    <Modal open={state.isOpened} onClose={closeModal}>
      <Box sx={modalStyle}>
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 16 }, // Adjust top padding for close button on smaller screens
            right: { xs: 8, sm: 16 }, // Adjust right padding for close button on smaller screens
            zIndex: 1, // Ensure close button is always on top
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* RModalPages content will render here. It should also be responsive internally. */}
        <Box sx={{ pt: { xs: 2, sm: 3 } }}>
          {" "}
          {/* Add padding-top to ensure content doesn't get hidden by close button */}
          <RModalPages page={state.page} content={state.content} />
        </Box>
      </Box>
    </Modal>
  );
};

export default GlobalModal;
