import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  useTheme,
} from "@mui/material";

function RecruiterCard({ id, email, name }) {
  const theme = useTheme();
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        mb: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {initials}
          </Avatar>
          <Box>
            <Typography variant="h6">{name}</Typography>
            <Typography color="text.secondary">{email}</Typography>
            <Typography variant="caption" color="text.disabled">
              ID: {id}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecruiterCard;
