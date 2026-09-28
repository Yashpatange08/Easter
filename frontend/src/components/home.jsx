import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DescriptionIcon from "@mui/icons-material/Description";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 2 }}>
      {/* Hero Welcome Banner */}
      <Card
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #42a5f5 100%)",
          color: "white",
          boxShadow: "0 10px 30px rgba(13, 71, 161, 0.25)",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: "#bbdefb", fontWeight: 700, fontSize: "0.85rem" }}>
            ✦ WELCOME TO EASTER
          </Typography>
          <Typography variant="h3" component="h1" fontWeight="800">
            {user ? `Hello, ${user.username}!` : "Your Complete Engineering Study Platform"}
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)", maxWidth: 700, fontSize: "1.1rem" }}>
            Access verified DBATU University Computer Science Previous Year Question Papers for Semester 1 and Semester 2 with instant in-page PDF viewing.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ pt: 2 }} flexWrap="wrap">
            <Button
              component={Link}
              to="/pyqs"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "#0d47a1",
                fontWeight: 700,
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Explore Sem 1 & 2 PYQs
            </Button>
            {!user && (
              <Button
                component={Link}
                to="/signup"
                variant="outlined"
                size="large"
                sx={{
                  color: "white",
                  borderColor: "white",
                  fontWeight: 600,
                  "&:hover": { borderColor: "#bbdefb", bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                Create Free Account
              </Button>
            )}
          </Stack>
        </Stack>
      </Card>

      {/* Quick Navigation Cards */}
      <Typography variant="h5" fontWeight="700" sx={{ mb: 2.5 }}>
        Explore Resources
      </Typography>

      <Grid container spacing={3}>
        {/* PYQs Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              boxShadow: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Box sx={{ p: 1.5, width: 48, height: 48, borderRadius: 2, bgcolor: "#e3f2fd", color: "#1976d2", mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DescriptionIcon />
              </Box>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                CS PYQ Papers (Sem 1 & 2)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Verified DBATU B.Tech CS question papers with built-in in-page PDF viewer.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button component={Link} to="/pyqs" size="small" variant="contained" fullWidth>
                Browse PYQs
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Notes Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              boxShadow: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Box sx={{ p: 1.5, width: 48, height: 48, borderRadius: 2, bgcolor: "#e8f5e9", color: "#2e7d32", mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LibraryBooksIcon />
              </Box>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                Study Notes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Curated lecture notes and summaries. Create, save, and manage your personal revision notes.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button component={Link} to="/notes" size="small" variant="contained" fullWidth color="success">
                View Notes
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Exams Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              boxShadow: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Box sx={{ p: 1.5, width: 48, height: 48, borderRadius: 2, bgcolor: "#fff3e0", color: "#ed6c02", mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookIcon />
              </Box>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                Exam Schedule
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check mid-term, internal assessment, and final semester exam schedules and locations.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button component={Link} to="/exams" size="small" variant="contained" fullWidth color="warning">
                Check Exams
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Study Helper Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              boxShadow: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Box sx={{ p: 1.5, width: 48, height: 48, borderRadius: 2, bgcolor: "#f3e5f5", color: "#8e24aa", mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChatIcon />
              </Box>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                Study Helper
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ask questions about subjects, exam preparation strategies, and get revision guidance.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button component={Link} to="/helper" size="small" variant="contained" fullWidth color="secondary">
                Ask Helper
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
