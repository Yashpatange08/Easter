import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const { user } = useAuth();

  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
    } catch {
      setError("Unable to load notes. Please verify you are logged in and backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    try {
      const res = await api.post("/api/notes/", {
        title: title.trim(),
        subject: subject.trim() || "General",
        content: content.trim(),
      });
      setNotes([res.data, ...notes]);
      setOpenModal(false);
      setTitle("");
      setSubject("");
      setContent("");
    } catch {
      setError("Failed to save note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 1, sm: 2, md: 3 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} flexWrap="wrap" gap={2}>
        <Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <LibraryBooksIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" fontWeight="bold">
              Study Notes
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Shared & personal lecture summaries synced live with Django backend
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{ borderRadius: 2 }}
        >
          Add Note
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : notes.length === 0 ? (
        <Card sx={{ p: 5, textAlign: "center", borderRadius: 3, bgcolor: "#fafafa" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Study Notes Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Be the first to create and save notes for your subjects.
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
            Create First Note
          </Button>
        </Card>
      ) : (
        <Grid container spacing={2.5}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2.5, boxShadow: 2 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" color="primary" fontWeight="bold" sx={{ textTransform: "uppercase" }}>
                    {note.subject}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {note.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: "pre-wrap",
                      display: "-webkit-box",
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {note.content}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 2, pb: 2, pt: 1, borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="caption" color="text.secondary">
                    By: {note.author_username || user?.username || "Student"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {note.created_at ? new Date(note.created_at).toLocaleDateString() : "Recently"}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Note Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleCreateNote}>
          <DialogTitle>Create New Study Note</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 3 - B+ Trees & Indexing Summary"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Database Management Systems"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={5}
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your study notes, key formulas, or questions here..."
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving..." : "Save Note"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
