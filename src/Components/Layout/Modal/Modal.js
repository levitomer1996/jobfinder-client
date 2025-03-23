import React, { useContext } from "react";

import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContext } from "../../../Context/ModalContext";
import RModalPages from "./RModalPages";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const GlobalModal = () => {
  const { state, closeModal } = useContext(ModalContext);

  return (
    <Modal open={state.isOpened} onClose={closeModal}>
      <Box sx={style}>
        <IconButton
          onClick={closeModal}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <RModalPages content={state.content} />
      </Box>
    </Modal>
  );
};

export default GlobalModal;
