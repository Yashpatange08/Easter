import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function About() {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 1, sm: 2, md: 3 } }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <InfoIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" fontWeight="bold">
          About Easter
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Student Academic Portal & DBATU Question Paper Repository
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip icon={<SchoolIcon />} label="DBATU Engineering Portal" color="primary" />
            <Chip label="600+ CS Papers" variant="outlined" />
          </Stack>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Empowering Engineering Students
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.7 }}>
            <strong>Easter</strong> is built to streamline academic preparation for B.Tech Computer Science and allied engineering students under Dr. Babasaheb Ambedkar Technological University (DBATU).
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
            Key Features
          </Typography>
          <ul>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>600+ Previous Year Question Papers:</strong> Spanning Semester 1 through Semester 8 for Computer Science, AI & DS, AI & ML, and CSD, sorted by branch, year, and semester number.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Interactive Search & Filters:</strong> Find any question paper by subject name, semester, academic year, or exam year in milliseconds.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Study Notes Repository:</strong> Share and access lecture notes and formulas.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Direct Source Access:</strong> Question papers reference{" "}
                <a
                  href="https://www.batuonline.com/btech-cs-question-papers.html#semester"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}
                >
                  batuonline.com <OpenInNewIcon sx={{ fontSize: 13, verticalAlign: "middle" }} />
                </a>.
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
}
