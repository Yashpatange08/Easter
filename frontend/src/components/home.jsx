import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import DescriptionIcon from "@mui/icons-material/Description";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const resources = [
    {
      title: "Previous Year Question Papers (PYQs)",
      badge: "1,516+ Papers",
      badgeColor: "#38bdf8",
      badgeBg: "rgba(56, 189, 248, 0.12)",
      description:
        "Official DBATU university examination question papers with built-in instant in-page PDF reader, search filters, and one-click downloads.",
      tags: ["Semesters 1 & 2", "All CS Subjects", "In-Page PDF Viewer", "Verified DBATU"],
      action: "Browse Papers",
      link: "/pyqs",
      icon: <DescriptionIcon sx={{ fontSize: 26 }} />,
      accent: "#38bdf8",
      tint: "rgba(56, 189, 248, 0.12)",
      border: "rgba(56, 189, 248, 0.28)",
      glow: "rgba(56, 189, 248, 0.18)",
    },
    {
      title: "Subject Notes & Revision Summaries",
      badge: "High-Yield",
      badgeColor: "#34d399",
      badgeBg: "rgba(52, 211, 153, 0.12)",
      description:
        "Curated lecture notes, formulas, and topic summaries designed specifically for DBATU syllabus revision and quick recall before exams.",
      tags: ["Unit Breakdowns", "Formula Sheets", "Personal Note Saver"],
      action: "Explore Notes",
      link: "/notes",
      icon: <LibraryBooksIcon sx={{ fontSize: 26 }} />,
      accent: "#34d399",
      tint: "rgba(52, 211, 153, 0.12)",
      border: "rgba(52, 211, 153, 0.28)",
      glow: "rgba(52, 211, 153, 0.18)",
    },
    {
      title: "University Examination Schedule",
      badge: "Timetables",
      badgeColor: "#fbbf24",
      badgeBg: "rgba(251, 191, 36, 0.12)",
      description:
        "Check official university examination timetables, mid-term assessment dates, internal deadlines, and academic calendar notifications.",
      tags: ["Mid-Term Assessments", "End-Semester Dates", "Official Notices"],
      action: "Check Schedule",
      link: "/exams",
      icon: <BookIcon sx={{ fontSize: 26 }} />,
      accent: "#fbbf24",
      tint: "rgba(251, 191, 36, 0.12)",
      border: "rgba(251, 191, 36, 0.28)",
      glow: "rgba(251, 191, 36, 0.18)",
    },
    {
      title: "Study Helper & AI Tutor",
      badge: "Instant Help",
      badgeColor: "#c084fc",
      badgeBg: "rgba(192, 132, 252, 0.12)",
      description:
        "Ask questions about challenging engineering concepts, solve numerical doubts, and get structured exam preparation recommendations.",
      tags: ["Concept Walkthroughs", "Doubt Solving", "Instant AI Tutor"],
      action: "Launch Helper",
      link: "/helper",
      icon: <ChatIcon sx={{ fontSize: 26 }} />,
      accent: "#c084fc",
      tint: "rgba(192, 132, 252, 0.12)",
      border: "rgba(192, 132, 252, 0.28)",
      glow: "rgba(192, 132, 252, 0.18)",
    },
  ];

  const popularSubjects = [
    "Engineering Mathematics-I",
    "Engineering Mathematics-II",
    "Engineering Physics",
    "Engineering Chemistry",
    "Basic Electrical Engineering",
    "Engineering Mechanics",
    "Programming in C",
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto", py: 1.5, px: { xs: 0.5, sm: 1.5, md: 2 } }}>
      {/* Sleek Dark Mode Hero Welcome Banner */}
      <Card
        sx={{
          p: { xs: 3, md: 4.5 },
          mb: 3.5,
          borderRadius: 4,
          bgcolor: "#0f172a",
          backgroundImage: "radial-gradient(circle at top right, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0) 65%), linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Stack spacing={1.5}>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 99,
                    bgcolor: "rgba(56, 189, 248, 0.12)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    color: "#38bdf8",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  ✦ DBATU UNIVERSITY PORTAL • 2024–25
                </Box>
              </Box>

              <Typography
                variant="h3"
                component="h1"
                fontWeight="800"
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.6rem" },
                  color: "#f8fafc",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.15,
                }}
              >
                {user ? `Welcome back, ${user.username}!` : "Your Complete Engineering Study Platform"}
              </Typography>

              <Typography variant="body1" sx={{ color: "#94a3b8", maxWidth: 700, fontSize: "1.05rem", lineHeight: 1.6 }}>
                Access verified Dr. Babasaheb Ambedkar Technological University Previous Year Question Papers for Semester 1 and Semester 2 with instant in-page PDF viewing, notes, and revision tools.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ pt: 1.5 }} flexWrap="wrap">
                <Button
                  component={Link}
                  to="/pyqs"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#38bdf8",
                    color: "#090d16",
                    fontWeight: 700,
                    borderRadius: 2.5,
                    px: 3.5,
                    py: 1,
                    boxShadow: "0 0 20px rgba(56, 189, 248, 0.35)",
                    "&:hover": {
                      bgcolor: "#7dd3fc",
                      boxShadow: "0 0 28px rgba(56, 189, 248, 0.5)",
                    },
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
                      color: "#f8fafc",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 2.5,
                      fontWeight: 600,
                      px: 3,
                      "&:hover": {
                        borderColor: "#38bdf8",
                        color: "#38bdf8",
                        bgcolor: "rgba(56, 189, 248, 0.08)",
                      },
                    }}
                  >
                    Create Free Account
                  </Button>
                )}
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Floating Stat Cards */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.5} sx={{ pl: { md: 2 } }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "rgba(30, 41, 59, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight="800" sx={{ color: "#38bdf8", lineHeight: 1 }}>
                    1,516+
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 500 }}>
                    Verified Question Papers
                  </Typography>
                </Box>
                <PictureAsPdfIcon sx={{ color: "#38bdf8", fontSize: 28, opacity: 0.8 }} />
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "rgba(30, 41, 59, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight="800" sx={{ color: "#34d399", lineHeight: 1 }}>
                    6 Branches
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 500 }}>
                    CSE, IT, ME, CE, EE, CHEM
                  </Typography>
                </Box>
                <SchoolIcon sx={{ color: "#34d399", fontSize: 28, opacity: 0.8 }} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Main 2-Column Dashboard Layout */}
      <Grid container spacing={3.5}>
        {/* LEFT COLUMN: Resource Cards (Stacked ONE BELOW EACH OTHER) */}
        <Grid item xs={12} lg={7.5}>
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#f8fafc",
                letterSpacing: "-0.4px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Explore Academic Resources
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.3, fontSize: "0.92rem" }}>
              Direct access to university question banks, lecture summaries, and study tools.
            </Typography>
          </Box>

          {/* Stacked Cards - One below each other */}
          <Stack spacing={2.25}>
            {resources.map((item, idx) => (
              <Card
                key={idx}
                component={Link}
                to={item.link}
                sx={{
                  textDecoration: "none",
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 3.5,
                  bgcolor: "#0f172a",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { sm: "center" },
                  gap: { xs: 2, sm: 2.5 },
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: item.border,
                    boxShadow: `0 12px 30px -4px ${item.glow}`,
                    "& .card-action-btn": {
                      bgcolor: item.accent,
                      color: "#090d16",
                      borderColor: item.accent,
                    },
                    "& .card-title": {
                      color: item.accent,
                    },
                  },
                }}
              >
                {/* Left: Icon Badge */}
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    minWidth: 52,
                    borderRadius: 2.5,
                    bgcolor: item.tint,
                    color: item.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${item.border}`,
                  }}
                >
                  {item.icon}
                </Box>

                {/* Center: Title, Description, Tags */}
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap" sx={{ mb: 0.6 }}>
                    <Typography
                      className="card-title"
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.05rem", sm: "1.15rem" },
                        color: "#f8fafc",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        bgcolor: item.badgeBg,
                        color: item.badgeColor,
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        border: `1px solid ${item.border}`,
                        height: 22,
                      }}
                    />
                  </Stack>

                  <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.55, mb: 1.5, fontSize: "0.88rem" }}>
                    {item.description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 0.8 }}>
                    {item.tags.map((t, tIdx) => (
                      <Box
                        key={tIdx}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.6,
                          fontSize: "0.75rem",
                          color: "#cbd5e1",
                          bgcolor: "rgba(30, 41, 59, 0.6)",
                          px: 1.1,
                          py: 0.3,
                          borderRadius: 1.5,
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          fontWeight: 500,
                        }}
                      >
                        <Box sx={{ width: 4.5, height: 4.5, borderRadius: "50%", bgcolor: item.accent }} />
                        {t}
                      </Box>
                    ))}
                  </Stack>
                </Box>

                {/* Right: Action Button */}
                <Box sx={{ minWidth: 140, display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
                  <Button
                    className="card-action-btn"
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 2,
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      color: "#cbd5e1",
                      transition: "all 0.2s ease",
                      px: 2.25,
                      py: 0.75,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Open
                  </Button>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* RIGHT COLUMN: Informative Panels (Fills empty space with valuable information) */}
        <Grid item xs={12} lg={4.5}>
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#f8fafc",
                letterSpacing: "-0.4px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Academic Highlights
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.3, fontSize: "0.92rem" }}>
              University database coverage and semester preparation guides.
            </Typography>
          </Box>

          <Stack spacing={2.5}>
            {/* Widget 1: University Database Matrix */}
            <Card
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: "rgba(56, 189, 248, 0.12)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="800" sx={{ color: "#f8fafc", lineHeight: 1.2 }}>
                    DBATU University Hub
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                    Dr. Babasaheb Ambedkar Tech Univ • Lonere
                  </Typography>
                </Box>
              </Stack>

              {/* 2x2 Stats Grid */}
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.5)", borderRadius: 2, border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <Typography variant="h5" fontWeight="800" sx={{ color: "#38bdf8" }}>
                      1,516+
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, display: "block" }}>
                      Verified PYQs
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.5)", borderRadius: 2, border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <Typography variant="h5" fontWeight="800" sx={{ color: "#34d399" }}>
                      6 Branches
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, display: "block" }}>
                      CSE, IT, ME, CE...
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.5)", borderRadius: 2, border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <Typography variant="h5" fontWeight="800" sx={{ color: "#fbbf24" }}>
                      Sem 1 & 2
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, display: "block" }}>
                      First Year Core
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.5)", borderRadius: 2, border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <Typography variant="h5" fontWeight="800" sx={{ color: "#c084fc" }}>
                      100% Free
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, display: "block" }}>
                      In-Page Reader
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 1.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />

              <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5 }}>
                Archive includes official university papers from <strong>2018 to 2024</strong>. Direct in-page PDF reader with zero external software required.
              </Typography>
            </Card>

            {/* Widget 2: High-Yield Exam Preparation Guidelines */}
            <Card
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: "#f8fafc", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                <span>📌</span> High-Yield Exam Strategy
              </Typography>

              <Stack spacing={1.75}>
                <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
                  <Box sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "0.85rem", minWidth: 20, mt: "1px" }}>01</Box>
                  <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.84rem", lineHeight: 1.45 }}>
                    <strong style={{ color: "#f8fafc" }}>Pattern Mastery:</strong> Approximately 70% of DBATU university questions repeat or adapt models from the last 4 semesters.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
                  <Box sx={{ color: "#34d399", fontWeight: 800, fontSize: "0.85rem", minWidth: 20, mt: "1px" }}>02</Box>
                  <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.84rem", lineHeight: 1.45 }}>
                    <strong style={{ color: "#f8fafc" }}>Unit Weightage:</strong> Units 1 and 2 in Engineering Mathematics and Physics carry maximum fundamental scoring marks.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
                  <Box sx={{ color: "#c084fc", fontWeight: 800, fontSize: "0.85rem", minWidth: 20, mt: "1px" }}>03</Box>
                  <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.84rem", lineHeight: 1.45 }}>
                    <strong style={{ color: "#f8fafc" }}>Step Marking:</strong> Always show complete formula substitutions and labeled diagrams to secure step marks.
                  </Typography>
                </Box>
              </Stack>
            </Card>

            {/* Widget 3: Popular Subjects Direct Jump */}
            <Card
              sx={{
                p: 3,
                borderRadius: 3.5,
                bgcolor: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: "#f8fafc", mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <span>⚡</span> Popular Core Subjects
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mb: 1.75, fontSize: "0.82rem" }}>
                Click any subject to jump straight to filtered papers:
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                {popularSubjects.map((subject, sIdx) => (
                  <Chip
                    key={sIdx}
                    component={Link}
                    to="/pyqs"
                    label={subject}
                    clickable
                    size="small"
                    sx={{
                      bgcolor: "rgba(30, 41, 59, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#cbd5e1",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      py: 0.5,
                      "&:hover": {
                        bgcolor: "rgba(56, 189, 248, 0.15)",
                        borderColor: "rgba(56, 189, 248, 0.4)",
                        color: "#38bdf8",
                      },
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
