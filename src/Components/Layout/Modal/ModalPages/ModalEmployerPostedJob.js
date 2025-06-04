import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

const ModalEmployerPostedJob = ({ content }) => {
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
      <CardHeader
        title={<Typography variant="h5">{content.job.title}</Typography>}
        subheader={
          <>
            <Link href="#" underline="hover" target="_blank">
              Aristocrat Interactive
            </Link>{" "}
            · 3.4 · תל אביב יפו, מחוז תל אביב
          </>
        }
        action={
          <Button variant="contained" color="primary" sx={{ mt: 1 }}>
            Apply now
          </Button>
        }
      />

      <Box display="flex" justifyContent="start" gap={1} mt={-2} ml={2}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <CardContent>
        <Typography variant="h6">Location</Typography>
        <Typography mb={2}>תל אביב יפו, מחוז תל אביב</Typography>

        <Typography variant="h6">Full job description</Typography>
        <Typography paragraph mt={1}>
          The CRM Implementation Expert is responsible for leading the technical
          aspects of the CRM system implementations. This role requires a deep
          understanding of CRM systems, technical architecture, and data
          management. This role requires a combination of technical expertise,
          project management skills, and a deep understanding of business
          processes. The Implementation Expert will work closely with
          stakeholders to ensure that the CRM solution meets the organization's
          needs and delivers maximum value.
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold">
          What You'll Do:
        </Typography>

        <ul>
          <li>
            <Typography>
              Configure CRM system settings and workflows to meet the
              organization's specific requirements.
            </Typography>
          </li>
          <li>
            <Typography>
              Customize the CRM interface and user experience.
            </Typography>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ModalEmployerPostedJob;
