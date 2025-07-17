import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../../../../Context/AuthContext";
import useGetCompanyById from "../../../../Hook/useGetCompanyById";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ModalContext } from "../../../../Context/ModalContext";

const EmployerProfile = () => {
  const { user } = useContext(AuthContext);
  const { name, email, role, profileImageUrl, employerProfile } = user;

  const [company, loading_company, error_company] = useGetCompanyById(
    employerProfile?.company
  );
  const { openModal } = useContext(ModalContext);

  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (company && company.company.name) {
      setCompanyName(company.company.name);
    }
  }, [company]);

  if (!employerProfile) {
    return <Typography>Employer profile not found.</Typography>;
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: "auto", mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar
          sx={{
            width: { xs: 70, sm: 100 },
            height: { xs: 70, sm: 100 },
            backgroundColor: "#ffb74d",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={() => {
            openModal("UPLOAD_PROFILE_IMAGE");
          }}
          src={`${process.env.REACT_APP_SERVER_URL}${user.profileImageUrl}`}
        >
          {!profileImageUrl && <InsertDriveFileIcon fontSize="large" />}
        </Avatar>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role: {role}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography>
        <strong>ID:</strong> {employerProfile._id}
      </Typography>
      <Typography>
        <strong>Company:</strong>{" "}
        {loading_company ? (
          <CircularProgress size={14} />
        ) : (
          companyName || "Not found"
        )}
      </Typography>
      <Typography>
        <strong>Job Postings:</strong>{" "}
        {employerProfile.jobPostings?.length || 0}
      </Typography>
      <Typography>
        <strong>Reviews:</strong> {employerProfile.reviews?.length || 0}
      </Typography>
    </Paper>
  );
};

export default EmployerProfile;
