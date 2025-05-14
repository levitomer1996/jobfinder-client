import React, { useContext } from "react";
import { Paper, Box, Typography, Button, Chip } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ModalContext } from "../../../../../Context/ModalContext";

const JobCard = ({ job }) => {
  const { openModal } = useContext(ModalContext);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-5px)",
        },
        textAlign: "center",
      }}
    >
      {/* Job Title */}
      <Typography variant="h6" fontWeight="bold" sx={{ color: "#333", mb: 1 }}>
        {job.title}
      </Typography>

      {/* Location + Show Applicants */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          📍 <strong>{job.location}</strong>
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => openModal("SHOW_APPLICANTS", { jobId: job._id })}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            px: 2,
            py: 0.5,
          }}
        >
          Show Applicants ({job.applicants.length})
        </Button>
      </Box>

      {/* Salary */}
      {job.salaryRangeMin && job.salaryRangeMax && (
        <Typography variant="body2" fontWeight="bold" color="text.primary">
          💰 {job.salaryRangeMin.toLocaleString()} -{" "}
          {job.salaryRangeMax.toLocaleString()} USD
        </Typography>
      )}

      {/* Job Status */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Chip
          label={job.status === "open" ? "Open Position" : "Closed"}
          color={job.status === "open" ? "success" : "error"}
          sx={{ fontWeight: "bold", fontSize: "12px", px: 2, py: 1 }}
        />
      </Box>

      {/* Explore Button */}
      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          mt: 3,
          bgcolor: "#6c63ff",
          color: "white",
          fontWeight: "bold",
          borderRadius: 3,
          px: 4,
          py: 1.5,
          "&:hover": {
            bgcolor: "#564ed6",
          },
        }}
        onClick={() => {
          openModal("EMPLOYER_POSTED_JOB", { job });
        }}
      >
        Explore
      </Button>
    </Paper>
  );
};

export default JobCard;
