import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import BookIcon from "@mui/icons-material/Book";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RoomIcon from "@mui/icons-material/Room";
import api from "../api/axios";

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/exams/");
      setExams(res.data);
    } catch {
      setError("Unable to load exams from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 1, sm: 2, md: 3 } }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <BookIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" fontWeight="bold">
          Exam Schedule
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Upcoming mid-term, internal assessment, and final examinations
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : exams.length === 0 ? (
        <Card sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary">
            No exams scheduled right now.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {exams.map((exam) => (
            <Grid item xs={12} md={4} key={exam.id}>
              <Card sx={{ height: "100%", borderRadius: 2.5, boxShadow: 2, borderTop: "4px solid #1976d2" }}>
                <CardContent>
                  <Chip label={exam.subject} size="small" color="primary" sx={{ mb: 1.5, fontWeight: "bold" }} />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {exam.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {exam.description}
                  </Typography>

                  <Stack spacing={1} sx={{ pt: 1, borderTop: "1px solid #f0f0f0" }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EventIcon fontSize="small" color="action" />
                      <Typography variant="body2"><strong>Date:</strong> {exam.exam_date}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2"><strong>Duration:</strong> {exam.duration}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <RoomIcon fontSize="small" color="action" />
                      <Typography variant="body2"><strong>Room:</strong> {exam.room}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
