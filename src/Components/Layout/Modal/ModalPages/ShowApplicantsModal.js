import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Alert,
} from "@mui/material";
import useGetApplicantsByJobId from "../../../../Hook/useGetApplicantsByJobId";

const ShowApplicantsModal = ({ content }) => {
  const { applicants, loading, error } = useGetApplicantsByJobId(content.jobId);

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        Applicants
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && applicants.length === 0 && (
        <Typography variant="body2" color="textSecondary">
          No applicants yet.
        </Typography>
      )}

      <List>
        {applicants.map((applicant) => (
          <ListItem key={applicant._id}>
            <ListItemAvatar>
              <Avatar>{applicant.name?.charAt(0) || "U"}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={applicant.name || "Unnamed"}
              secondary={applicant.email || "No email provided"}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ShowApplicantsModal;
