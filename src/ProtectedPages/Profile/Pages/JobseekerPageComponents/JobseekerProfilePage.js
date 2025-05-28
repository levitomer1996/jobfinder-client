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
import { AuthContext } from "../../../../Context/AuthContext";
import useSkillRegexSearch from "../../../../Hook/useSkillRegexSearch";
import useGetSkillsByJobSeekerId from "../../../../Hook/useGetSkillsByJobSeekerId";
import jts from "../../../../API/jts";
import { ModalContext } from "../../../../Context/ModalContext";
import { FaceRetouchingOffSharp } from "@mui/icons-material";
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
      setSkillsInput(skills);
      setSkillsErrors(skills.map(() => false));

      const exp =
        jobSeeker.experience?.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          years: exp.years || "",
        })) || [];
      setExperienceInput(exp);
      setExperienceErrors(
        exp.map(() => ({ company: false, position: false, years: false }))
      );

      setResumeFiles(user.resumes);
      fetchSkills(jobSeeker._id);
    }
  }, [jobSeeker]);

  const handleSkillChange = (index, value) => {
    const updated = [...skillsInput];
    const errorUpdated = [...skillsErrors];
    updated[index] = value;
    errorUpdated[index] = value.trim() === "";
    setSkillsInput(updated);
    setSkillsErrors(errorUpdated);
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experienceInput];
    const errorUpdated = [...experienceErrors];
    updated[index][field] = value;
    errorUpdated[index][field] = value.trim() === "";
    setExperienceInput(updated);
    setExperienceErrors(errorUpdated);
  };

  const handleSubmitSkills = async () => {
    const newErrors = skillsInput.map((s) => s.trim() === "");
    setSkillsErrors(newErrors);
    if (newErrors.includes(true)) return;
    setEditingSkills(false);
    try {
      const res = await jts.post(
        "jobseekers/addskilltojobseeker",
        { names: skillsInput, jobSeekerProfileId: user.jobSeekerProfile._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchSkills(jobSeeker._id);
    } catch (error) {
      console.error("Failed to submit skills", error);
    }
  };

  const handleSubmitExperience = () => {
    const newErrors = experienceInput.map((exp) => ({
      company: exp.company.trim() === "",
      position: exp.position.trim() === "",
      years: exp.years.trim() === "",
    }));
    setExperienceErrors(newErrors);
    const hasErrors = newErrors.some((e) => e.company || e.position || e.years);
    if (hasErrors) return;
    setEditingExperience(false);
    // TODO: send to backend
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
    }
  };

  return (
    <Grid container spacing={3} sx={{ flexGrow: 1, p: 3 }}>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {jobSeeker && (
        <>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{ p: 4, borderRadius: 3, backgroundColor: "#fff3e0" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar
                  sx={{ width: 100, height: 100, backgroundColor: "#ff9800" }}
                  onClick={() => {
                    openModal("UPLOAD_PROFILE_IMAGE");
                  }}
                  src={`${process.env.REACT_APP_SERVER_URL}${user.profileImageUrl}`}
                >
                  <InsertDriveFileIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {user?.name || "Jobseeker Name"}
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <EditIcon fontSize="small" color="action" />
                    </IconButton>
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {user?.email || "No email provided"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(jobSeeker.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="black">
                  Skills
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setEditingSkills(!editingSkills)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {editingSkills ? (
                <>
                  {skillsInput.map((skill, index) => (
                    <Autocomplete
                      key={index}
                      freeSolo
                      options={skillsResults || []}
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.name || ""
                      }
                      inputValue={skillsInput[index]}
                      onInputChange={(event, newValue) => {
                        handleSkillChange(index, newValue);
                        searchSkills(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="dense"
                          placeholder="Skill"
                          error={skillsErrors[index]}
                          helperText={
                            skillsErrors[index] ? "Skill cannot be empty" : ""
                          }
                        />
                      )}
                    />
                  ))}
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => {
                        setSkillsInput([...skillsInput, ""]);
                        setSkillsErrors([...skillsErrors, false]);
                      }}
                    >
                      + Add Skill
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={handleSubmitSkills}
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              ) : jobSeekerSkills && jobSeekerSkills.length > 0 ? (
                jobSeekerSkills.map((skill, index) => (
                  <Typography key={index}>• {skill.name}</Typography>
                ))
              ) : (
                <Typography color="textSecondary">
                  No skills added yet
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="black">
                  Experience
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setEditingExperience(!editingExperience)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {editingExperience ? (
                <>
                  {experienceInput.map((exp, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
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
                      />
                      <TextField
                        fullWidth
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
                      />
                      <TextField
                        fullWidth
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
                          handleExperienceChange(index, "years", e.target.value)
                        }
                      />
                    </Box>
                  ))}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => {
                        setExperienceInput([
                          ...experienceInput,
                          { company: "", position: "", years: "" },
                        ]);
                        setExperienceErrors([
                          ...experienceErrors,
                          { company: false, position: false, years: false },
                        ]);
                      }}
                    >
                      + Add Experience
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={handleSubmitExperience}
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              ) : jobSeeker.experience.length > 0 ? (
                jobSeeker.experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography fontWeight="bold">{exp.company}</Typography>
                    <Typography variant="body2">{exp.position}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.years}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography color="textSecondary">
                  No experience added yet
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Resume Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6" fontWeight="bold" color="black">
                  Resume
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  onClick={() => {
                    openModal("RESUME_UPLOAD");
                  }}
                >
                  Upload Resume
                </Button>
              </Box>
              {resumeFiles.length > 0 ? (
                resumeFiles.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography color="green">
                      •{" "}
                      {file.filename.replace(/(_[a-zA-Z0-9]+)?\.pdf$/, ".pdf")}
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
                ))
              ) : (
                <Typography color="textSecondary">
                  No resume uploaded yet
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
