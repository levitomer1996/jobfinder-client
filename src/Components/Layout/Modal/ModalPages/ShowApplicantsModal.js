import React, { useContext } from "react";
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
  Divider,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import useGetApplicantsByJobId from "../../../../Hook/useGetApplicantsByJobId";
import { ModalContext } from "../../../../Context/ModalContext";

const ShowApplicantsModal = ({ content }) => {
  const { applicants, loading, error } = useGetApplicantsByJobId(content.jobId);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { openModal } = useContext(ModalContext);

  const handleSendMessage = ({ name, email, _id }) => {
    openModal("SEND_MESSAGE_TO", { name, email, _id });
  };

  return (
    <>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Applicants
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && applicants.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No applicants yet.
        </Typography>
      )}

      <List disablePadding>
        {applicants.map((applicant, index) => (
          <React.Fragment key={applicant._id}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {applicant.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
              </ListItemAvatar>

              <Box flex={1} ml={2}>
                <ListItemText
                  primary={
                    <Typography fontWeight={500}>
                      {applicant.name || "Unnamed"}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {applicant.email || "No email"}
                    </Typography>
                  }
                />

                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      console.log(applicant);
                      handleSendMessage({
                        name: applicant.name,
                        email: applicant.email,
                        _id: applicant._id,
                      });
                    }}
                  >
                    Send Message
                  </Button>

                  <Link
                    href={`/profile/${applicant._id}`}
                    underline="hover"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                    target="_blank"
                    rel="noopener"
                  >
                    View Profile
                  </Link>
                </Stack>
              </Box>
            </ListItem>

            {index < applicants.length - 1 && <Divider sx={{ my: 1.5 }} />}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default ShowApplicantsModal;
