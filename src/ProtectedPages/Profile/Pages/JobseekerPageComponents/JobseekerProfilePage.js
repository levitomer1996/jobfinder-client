import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Divider,
  Autocomplete,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import { AuthContext } from "../../../../Context/AuthContext";
import useSkillRegexSearch from "../../../../Hook/useSkillRegexSearch";
import useGetSkillsByJobSeekerId from "../../../../Hook/useGetSkillsByJobSeekerId";
import jts from "../../../../API/jts";
import { ModalContext } from "../../../../Context/ModalContext";
import useGetProfileImage from "../../../../Hook/useGetProfileImage ";

const JSProfilePage = ({ jobSeeker, error, loading }) => {
  const [editingSkills, setEditingSkills] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);
  const [skillsInput, setSkillsInput] = useState([""]);
  const [skillsErrors, setSkillsErrors] = useState([]);
  const [experienceInput, setExperienceInput] = useState([
    { company: "", position: "", years: "" },
  ]);
  const [experienceErrors, setExperienceErrors] = useState([
    { company: false, position: false, years: false },
  ]);
  const [resumeFiles, setResumeFiles] = useState([]);

  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);

  const { searchSkills, skillsResults } = useSkillRegexSearch();
  const { jobSeekerSkills, fetchSkills } = useGetSkillsByJobSeekerId();
  const { profileImageUrl } = useGetProfileImage(user._id);

  useEffect(() => {
    if (jobSeeker) {
      const skills = jobSeeker.skills || [];
      // Map skill objects to their names for input if they exist, otherwise ensure at least one empty string for input
      setSkillsInput(skills.length > 0 ? skills.map((s) => s.name) : [""]);
      setSkillsErrors(skills.map(() => false));

      const exp =
        jobSeeker.experience?.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          years: exp.years || "",
        })) || [];
      // Ensure there's always at least one experience field to display/edit
      setExperienceInput(
        exp.length > 0 ? exp : [{ company: "", position: "", years: "" }]
      );
      setExperienceErrors(
        exp.map(() => ({ company: false, position: false, years: false }))
      );

      setResumeFiles(user.resumes || []);
      fetchSkills(jobSeeker._id);
    }
  }, [jobSeeker, user.resumes]); // Added fetchSkills to dependencies

  const handleSkillChange = (index, value) => {
    const updated = [...skillsInput];
    const errorUpdated = [...skillsErrors];
    updated[index] = value;
    errorUpdated[index] = value.trim() === "";
    setSkillsInput(updated);
    setSkillsErrors(errorUpdated);
  };

  const handleAddSkillField = () => {
    setSkillsInput([...skillsInput, ""]);
    setSkillsErrors([...skillsErrors, false]);
  };

  const handleDeleteSkillField = (index) => {
    const updatedSkills = skillsInput.filter((_, i) => i !== index);
    const updatedErrors = skillsErrors.filter((_, i) => i !== index);
    // If all skills are deleted, ensure at least one empty field remains for adding
    setSkillsInput(updatedSkills.length > 0 ? updatedSkills : [""]);
    setSkillsErrors(updatedErrors.length > 0 ? updatedErrors : [false]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experienceInput];
    const errorUpdated = [...experienceErrors];
    updated[index][field] = value;
    errorUpdated[index][field] = value.trim() === "";
    setExperienceInput(updated);
    setExperienceErrors(errorUpdated);
  };

  const handleAddExperienceField = () => {
    setExperienceInput([
      ...experienceInput,
      { company: "", position: "", years: "" },
    ]);
    setExperienceErrors([
      ...experienceErrors,
      { company: false, position: false, years: false },
    ]);
  };

  const handleDeleteExperienceField = (index) => {
    const updatedExperience = experienceInput.filter((_, i) => i !== index);
    const updatedErrors = experienceErrors.filter((_, i) => i !== index);
    // If all experiences are deleted, ensure at least one empty field remains for adding
    setExperienceInput(
      updatedExperience.length > 0
        ? updatedExperience
        : [{ company: "", position: "", years: "" }]
    );
    setExperienceErrors(
      updatedErrors.length > 0
        ? updatedErrors
        : [{ company: false, position: false, years: false }]
    );
  };

  const handleSubmitSkills = async () => {
    const newErrors = skillsInput.map((s) => s.trim() === "");
    setSkillsErrors(newErrors);
    if (newErrors.includes(true)) return;
    setEditingSkills(false);
    try {
      const skillsToSubmit = skillsInput.filter((s) => s.trim() !== "");
      if (skillsToSubmit.length === 0) {
        // If no skills are entered, maybe clear them from the backend or do nothing.
        // For now, we'll just not send an empty array.
        console.warn("No skills to submit.");
        fetchSkills(jobSeeker._id); // Re-fetch to show current state
        return;
      }
      const res = await jts.post(
        "jobseekers/addskilltojobseeker",
        {
          names: skillsToSubmit,
          jobSeekerProfileId: user.jobSeekerProfile._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchSkills(jobSeeker._id);
    } catch (error) {
      console.error("Failed to submit skills", error);
      // Optionally display an error message to the user
    }
  };

  const handleSubmitExperience = async () => {
    const newErrors = experienceInput.map((exp) => ({
      company: exp.company.trim() === "",
      position: exp.position.trim() === "",
      years: exp.years.trim() === "",
    }));
    setExperienceErrors(newErrors);
    const hasErrors = newErrors.some((e) => e.company || e.position || e.years);
    if (hasErrors) return;
    setEditingExperience(false);
    try {
      // Filter out entirely empty experience objects before sending
      const experienceToSubmit = experienceInput.filter(
        (exp) =>
          exp.company.trim() !== "" ||
          exp.position.trim() !== "" ||
          exp.years.trim() !== ""
      );

      if (experienceToSubmit.length === 0) {
        console.warn("No experience to submit.");
        // If there's no experience, you might want to handle it (e.g., clear from backend)
        return;
      }

      // TODO: send experience to backend
      // This is a placeholder; you'll need to implement your actual API call here.
      // Example:
      // const res = await jts.post(
      //   "jobseekers/updateexperience",
      //   { experience: experienceToSubmit, jobSeekerProfileId: user.jobSeekerProfile._id },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      // console.log("Experience submitted successfully", res.data);
      // // After successful submission, you might want to refetch the jobSeeker data
      // // or update the local state from the response.
    } catch (error) {
      console.error("Failed to submit experience", error);
      // Optionally display an error message to the user
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      const res = await jts.post(
        "upload/pdf/deleteresume",
        {
          resumeId,
          jobseekerId: user.jobSeekerProfile._id,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResumeFiles(res.data);
    } catch (err) {
      console.error("Delete failed", err);
      // Optionally display an error message to the user
    }
  };

  return (
    // Increased overall spacing and responsive padding
    <Grid
      container
      spacing={0} // keep column spacing controlled by child `item`s
      rowSpacing={{ xs: 3, sm: 4, md: 5 }} // more vertical space between rows
      sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}
    >
      {loading && (
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", py: 4 }}
        >
          <CircularProgress />
        </Grid>
      )}
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {jobSeeker && (
        <>
          {/* Profile Header */}
          {/* mb prop on Grid item adds margin-bottom between this item and the next */}
          <Grid item xs={12} sx={{ mb: { xs: 2, sm: 3 } }}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                backgroundColor: "#fffde7",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, sm: 3 },
                }}
              >
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
                  src={
                    profileImageUrl ||
                    `${process.env.REACT_APP_SERVER_URL}${user.profileImageUrl}`
                  }
                >
                  {!profileImageUrl && <InsertDriveFileIcon fontSize="large" />}
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    // Responsive Typography for name
                    variant={{ xs: "h6", sm: "h5" }}
                    component="h1"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 0.5, wordBreak: "break-word" }}
                  >
                    {user?.name || "Jobseeker Name"}
                    <IconButton
                      size="small"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Typography>
                  <Typography
                    // Responsive Typography for email
                    variant={{ xs: "body2", sm: "body1" }}
                    color="text.secondary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {user?.email || "No email provided"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Created:{" "}
                    {new Date(jobSeeker.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} md={6} sx={{ mb: { xs: 2, md: 0 } }}>
            {" "}
            {/* Margin-bottom for smaller screens */}
            <Paper
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  Skills
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setEditingSkills(!editingSkills)}
                  color={editingSkills ? "primary" : "default"}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                {editingSkills ? (
                  <>
                    {skillsInput.map((skill, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Autocomplete
                          fullWidth
                          freeSolo
                          options={skillsResults || []}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.name || ""
                          }
                          inputValue={skillsInput[index]}
                          onInputChange={(event, newValue) => {
                            handleSkillChange(index, newValue);
                            searchSkills(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              margin="dense"
                              label={`Skill ${index + 1}`}
                              error={skillsErrors[index]}
                              helperText={
                                skillsErrors[index]
                                  ? "Skill cannot be empty"
                                  : ""
                              }
                            />
                          )}
                        />
                        {skillsInput.length > 1 && ( // Only show delete if more than one field
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteSkillField(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <Box
                      sx={{
                        display: { xs: "block", sm: "flex" },
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddSkillField}
                        sx={{ mb: { xs: 1, sm: 0 } }} // Margin for stack on small screens
                      >
                        Add Skill
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmitSkills}
                      >
                        Save Skills
                      </Button>
                    </Box>
                  </>
                ) : jobSeekerSkills && jobSeekerSkills.length > 0 ? (
                  <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                    {jobSeekerSkills.map((skill) => (
                      <Typography
                        key={skill._id}
                        component="li"
                        sx={{ mb: 0.5 }}
                      >
                        • {skill.name}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontStyle: "italic",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    No skills added yet. Click the edit icon to add some!
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12} md={6} sx={{ mb: { xs: 2, md: 0 } }}>
            {" "}
            {/* Margin-bottom for smaller screens */}
            <Paper
              elevation={4}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  Experience
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setEditingExperience(!editingExperience)}
                  color={editingExperience ? "primary" : "default"}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                {editingExperience ? (
                  <>
                    {experienceInput.map((exp, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 2,
                          p: 2,
                          borderRadius: 2,
                          position: "relative",
                          border: "1px solid #e0e0e0",
                          backgroundColor: "#fdfdfd",
                        }}
                      >
                        {experienceInput.length > 1 && ( // Only show delete if more than one field
                          <IconButton
                            size="small"
                            color="error"
                            sx={{ position: "absolute", top: 8, right: 8 }}
                            onClick={() => handleDeleteExperienceField(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                        <TextField
                          fullWidth
                          size="small"
                          margin="dense"
                          label="Company"
                          value={exp.company}
                          error={experienceErrors[index]?.company}
                          helperText={
                            experienceErrors[index]?.company
                              ? "Company is required"
                              : ""
                          }
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          margin="dense"
                          label="Position"
                          value={exp.position}
                          error={experienceErrors[index]?.position}
                          helperText={
                            experienceErrors[index]?.position
                              ? "Position is required"
                              : ""
                          }
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "position",
                              e.target.value
                            )
                          }
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          margin="dense"
                          label="Years"
                          value={exp.years}
                          error={experienceErrors[index]?.years}
                          helperText={
                            experienceErrors[index]?.years
                              ? "Years is required"
                              : ""
                          }
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "years",
                              e.target.value
                            )
                          }
                        />
                      </Box>
                    ))}
                    <Box
                      sx={{
                        display: { xs: "block", sm: "flex" },
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddExperienceField}
                        sx={{ mb: { xs: 1, sm: 0 } }} // Margin for stack on small screens
                      >
                        Add Experience
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmitExperience}
                      >
                        Save Experience
                      </Button>
                    </Box>
                  </>
                ) : jobSeeker.experience.length > 0 ? (
                  jobSeeker.experience.map((exp, index) => (
                    <Box
                      key={index}
                      sx={{ mb: 2, pb: 2, borderBottom: "1px dashed #e0e0e0" }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="text.primary"
                        sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
                      >
                        {exp.company}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                      >
                        {exp.position}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Years: {exp.years}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontStyle: "italic",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    No experience added yet. Click the edit icon to add some!
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Resume Section */}
          <Grid item xs={12}>
            <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  Resumes
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  color="secondary"
                  onClick={() => {
                    openModal("RESUME_UPLOAD");
                  }}
                  startIcon={<InsertDriveFileIcon />}
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    padding: { xs: "6px 10px", sm: "8px 16px" },
                  }}
                >
                  Upload New Resume
                </Button>
              </Box>
              {resumeFiles.length > 0 ? (
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {resumeFiles.map((file) => (
                    <Box
                      key={file._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: "#e8f5e9",
                        "&:hover": {
                          backgroundColor: "#dce7da",
                        },
                      }}
                    >
                      <InsertDriveFileIcon color="success" fontSize="small" />
                      <Typography
                        sx={{
                          flexGrow: 1,
                          color: "text.primary",
                          wordBreak: "break-all",
                          fontSize: { xs: "0.8rem", sm: "0.9rem" },
                        }}
                      >
                        {file.filename.replace(
                          /(_[a-zA-Z0-9]+)?\.pdf$/,
                          ".pdf"
                        )}
                      </Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          handleDeleteResume(file._id);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  color="textSecondary"
                  sx={{
                    fontStyle: "italic",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  No resumes uploaded yet.
                </Typography>
              )}
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default JSProfilePage;
