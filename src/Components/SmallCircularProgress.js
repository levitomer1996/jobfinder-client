import React from "react";
import { CircularProgress, Box } from "@mui/material";

function SmallCircularProgress({
  size = 24,
  thickness = 4,
  color = "primary",
}) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress size={size} thickness={thickness} color={color} />
    </Box>
  );
}

export default SmallCircularProgress;
