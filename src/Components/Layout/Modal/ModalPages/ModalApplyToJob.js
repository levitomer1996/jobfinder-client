import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ModalContext } from "../../../../Context/ModalContext";
import { AuthContext } from "../../../../Context/AuthContext";
import jts from "../../../../API/jts";

const ModalApplyToJob = () => {
  const { state, closeModal } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    phone: "",
    coverLetter: "",
    preferedResume:
      user.jobSeekerProfile.resume[user.jobSeekerProfile.resume.length - 1],
    jobSeekerId: state.content.jobSeekerId,
    jobId: state.content.jobId,
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log(formData);
    try {
      const results = await jts.post("/applications/create", {
        jobId: formData.jobId,
        jobSeekerId: formData.jobSeekerId,
        resumeId: formData.preferedResume,
        coverLetter: formData.coverLetter,
      });
      console.log(results);
      closeModal();
    } catch (error) {
      console.error("Error submitting application", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={state.isOpened} onClose={closeModal} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976d2",
          fontSize: "1.8rem",
        }}
      >
        Apply to Job
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={handleChange("name")}
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          />
          <TextField
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange("phone")}
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          />
          <TextField
            label="Cover Letter"
            value={formData.coverLetter}
            onChange={handleChange("coverLetter")}
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            disabled={isSubmitting}
          />

          <FormControl disabled={isSubmitting}>
            <FormLabel>Resume</FormLabel>
            <RadioGroup
              value={formData.preferedResume}
              onChange={handleChange("preferedResume")}
            >
              {user.resumes.map((r) => (
                <FormControlLabel
                  key={r.filename}
                  value={r._id}
                  control={<Radio />}
                  label={r.filename}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={closeModal}
          variant="outlined"
          sx={{ borderRadius: 3, textTransform: "none" }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          endIcon={
            isSubmitting ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <SendIcon />
            )
          }
          sx={{
            background: "linear-gradient(135deg, #1e88e5 0%, #42a5f5 100%)",
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
            },
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalApplyToJob;
