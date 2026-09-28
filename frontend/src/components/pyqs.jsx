import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import DownloadIcon from "@mui/icons-material/Download";
import SchoolIcon from "@mui/icons-material/School";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import api from "../api/axios";
import localPyqs from "../data/batu_cs_pyqs.json";

// Exact sequence matching the DBATU portal reference screenshot
const REFERENCE_ORDER = [
  "BTECH-1-YEAR-ENGINEERING-GRAPHICS-24AF2EGRES104-WINTER-2026",
  "BTECH-1-YEAR-ENGINEERING-MATHEMATICS-1-24AF1000BS101-SUMMER-2026",
  "BTECH-1-YEAR-ENGINEERING-PHYSICS-23UD1PHBS102-SUMMER-2026",
  "BTECH-1-SEM-2-SEM-COMMUNICATION-SKILLS-BTHM104-JAN-2026",
  "BTECH-1-SEM-2-SEM-ENGINEERING-GRAPHICS-24AF1EGES104-JAN-2026",
  "BTECH-1-SEM-COMPUTER-PROGRAMMING-IN-C-BTES204-JAN-2026",
  "BTECH-1-SEM-ENGINEERING-CHEMISTRY-BTBS102-JAN-2026",
  "BTECH-1-SEM-ENGINEERING-CHEMISTRY-BTBS202-JAN-2026",
  "BTECH-1-SEM-ENGINEERING-GRAPHICS-BTES103G-JAN-2026",
  "BTECH-1-SEM-ENGINEERING-MATHEMATICS-1-BTBS101-JAN-2026",
  "BTECH-1-SEM-ENGINEERING-PHYSICS-BTBS102P-JAN-2026",
  "BTECH-1-SEM-PROGRAMMING-FOR-PROBLEM-SOLVING-24F1000ES106A-JAN-2026",
  "BTECH-1-YEAR-BASIC-CIVIL-ENGINEERING-23UD1191ES106-JAN-2026",
  "BTECH-1-YEAR-BASIC-ELECTRICAL-AND-ELECTRONICS-ENGINEERING-23UD1000ES106-JAN-2026",
  "BTECH-1-YEAR-DIGITAL-ELECTRONICS-23UD1245ES106-JAN-2026",
  "BTECH-1-YEAR-ENGINEERING-CHEMISTRY-23UD1CHEBS102-JAN-2026",
  "BTECH-1-YEAR-ENGINEERING-MATHEMATICS-1-23UD1000BS101-JAN-2026",
  "BTECH-1-YEAR-ENGINEERING-MECHANICS-23UD1EMES104-JAN-2026",
  "BTECH-1-YEAR-PROGRAMMING-FOR-PROBLEM-SOLVING-24AF1000ES106A-JAN-2026",
  "BTECH-2-SEM-ENGINEERING-MATHEMATICS-2-BTBS201-JAN-2026",
  "BTECH-2-SEM-ENGINEERING-MATHEMATICS-2-MATH-201-JAN-2026",
];

export default function PYQs() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Name format: 'portal_pdf' (default), 'friendly' (e.g. M1 PYQ 2026.pdf), or 'portal_raw'
  const [nameFormat, setNameFormat] = useState("portal_pdf");

  // Filters
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [selectedSemester, setSelectedSemester] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // In-Page PDF Viewer State
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/pyqs/");
      if (Array.isArray(res.data) && res.data.length > 0) {
        setPapers(res.data);
      } else {
        setPapers(localPyqs);
      }
    } catch {
      setPapers(localPyqs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // Filter papers and maintain the reference portal order
  const filteredPapers = useMemo(() => {
    let result = [...papers];

    // Branch filter
    if (selectedBranch !== "ALL") {
      result = result.filter((p) => p.branch === selectedBranch);
    }

    // Semester filter
    if (selectedSemester !== "ALL") {
      result = result.filter((p) => Number(p.semester) === Number(selectedSemester));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.subject?.toLowerCase().includes(q) ||
          p.paper_code?.toLowerCase().includes(q) ||
          p.branch?.toLowerCase().includes(q) ||
          p.session?.toLowerCase().includes(q) ||
          p.filename?.toLowerCase().includes(q) ||
          String(p.exam_year).includes(q)
      );
    }

    // Default to the reference order from DBATU portal photo
    result.sort((a, b) => {
      const titleA = (a.title || "").toUpperCase();
      const titleB = (b.title || "").toUpperCase();
      const idxA = REFERENCE_ORDER.indexOf(titleA);
      const idxB = REFERENCE_ORDER.indexOf(titleB);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return titleA.localeCompare(titleB);
    });

    return result;
  }, [papers, selectedBranch, selectedSemester, searchQuery]);

  // Open PDF in modal viewer
  const handleOpenPdf = (paper) => {
    setCurrentPdf(paper);
    setViewerOpen(true);
  };

  const handleClosePdf = () => {
    setViewerOpen(false);
    setCurrentPdf(null);
    setIsFullscreen(false);
  };

  // Helper to generate link display name based on user format preference
  const getDisplayName = (paper) => {
    if (nameFormat === "friendly") {
      let sub = paper.subject || "";
      if (/Mathematics\s*[-–]?\s*I\b/i.test(sub) || /Maths\s*[-–]?\s*1/i.test(sub)) {
        sub = "M1 (Engineering Mathematics-1)";
      } else if (/Mathematics\s*[-–]?\s*II\b/i.test(sub) || /Maths\s*[-–]?\s*2/i.test(sub)) {
        sub = "M2 (Engineering Mathematics-2)";
      } else if (/Mathematics\s*[-–]?\s*III\b/i.test(sub) || /Maths\s*[-–]?\s*3/i.test(sub)) {
        sub = "M3 (Engineering Mathematics-3)";
      }
      const sessionStr = paper.session ? ` ${paper.session}` : "";
      const yearStr = paper.exam_year ? ` ${paper.exam_year}` : "";
      return `${sub} PYQ${sessionStr}${yearStr}.pdf`;
    }

    const baseTitle =
      paper.title ||
      paper.filename?.replace(/\.pdf$/i, "").toUpperCase() ||
      paper.subject?.toUpperCase();

    if (nameFormat === "portal_raw") {
      return baseTitle.replace(/\.pdf$/i, "");
    }

    // Default 'portal_pdf'
    return baseTitle.toLowerCase().endsWith(".pdf") ? baseTitle : `${baseTitle}.pdf`;
  };

  // Color logic matching reference screenshot: Summer exams are orange, Winter/Jan exams are deep blue
  const getItemColor = (paper) => {
    const isSummer =
      paper.session?.toUpperCase() === "SUMMER" ||
      paper.title?.toUpperCase().includes("SUMMER") ||
      paper.filename?.toUpperCase().includes("SUMMER");

    return isSummer ? "#e65100" : "#002060";
  };

  const branchCounts = useMemo(() => {
    const counts = {};
    papers.forEach((p) => {
      const b = p.branch || "Other";
      counts[b] = (counts[b] || 0) + 1;
    });
    return counts;
  }, [papers]);

  const availableBranches = useMemo(() => {
    return Object.keys(branchCounts).sort();
  }, [branchCounts]);

  const semesterCounts = useMemo(() => {
    const counts = {};
    papers.forEach((p) => {
      if (selectedBranch === "ALL" || p.branch === selectedBranch) {
        const s = Number(p.semester);
        if (s) counts[s] = (counts[s] || 0) + 1;
      }
    });
    return counts;
  }, [papers, selectedBranch]);

  const availableSemesters = useMemo(() => {
    return Object.keys(semesterCounts).map(Number).sort((a, b) => a - b);
  }, [semesterCounts]);

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header Banner */}
      <Card
        sx={{
          mb: 2.5,
          p: { xs: 2.5, sm: 3 },
          background: "linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)",
          color: "white",
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(13, 71, 161, 0.25)",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
              <SchoolIcon sx={{ fontSize: 36, color: "#bbdefb" }} />
              <Typography variant="h4" component="h1" fontWeight="800">
                {selectedBranch === "ALL" ? "DBATU Engineering PYQs" : `${selectedBranch} PYQs`}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)", maxWidth: 750 }}>
              Official DBATU University Previous Year Question Papers for{" "}
              <strong>{selectedBranch === "ALL" ? "All Engineering Branches" : selectedBranch}</strong>.
              Click any question paper link to open and view the PDF directly!
            </Typography>
          </Box>

          <Chip
            icon={<PictureAsPdfIcon sx={{ "&&": { color: "white" } }} />}
            label={`${papers.length} PDF Papers`}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontWeight: 600,
              alignSelf: { xs: "flex-start", sm: "center" },
            }}
          />
        </Stack>
      </Card>

      {/* Simplified Controls Card */}
      <Card sx={{ mb: 2.5, p: 2, borderRadius: 2.5, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Bar */}
          <Grid item xs={12} sm={6} md={3.5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by subject, code, or session..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Branch Selector */}
          <Grid item xs={12} sm={6} md={3.5}>
            <TextField
              select
              fullWidth
              size="small"
              label="Branch"
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setSelectedSemester("ALL");
              }}
            >
              <MenuItem value="ALL">All Branches ({papers.length})</MenuItem>
              {availableBranches.map((b) => (
                <MenuItem key={b} value={b}>
                  {b} ({branchCounts[b]})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Semester Selector */}
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              select
              fullWidth
              size="small"
              label="Semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <MenuItem value="ALL">All Semesters</MenuItem>
              {availableSemesters.map((sem) => (
                <MenuItem key={sem} value={sem}>
                  Sem {sem} ({semesterCounts[sem]})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Name Display Format Toggle */}
          <Grid item xs={6} sm={8} md={3} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
            <Stack direction="row" spacing={0.8} alignItems="center" flexWrap="wrap">
              <Typography variant="caption" fontWeight="600" color="text.secondary">
                Format:
              </Typography>
              <Chip
                label="Portal (.pdf)"
                size="small"
                variant={nameFormat === "portal_pdf" ? "filled" : "outlined"}
                color={nameFormat === "portal_pdf" ? "primary" : "default"}
                onClick={() => setNameFormat("portal_pdf")}
                sx={{ cursor: "pointer", fontWeight: 600, fontSize: "0.75rem" }}
              />
              <Chip
                label="Friendly"
                size="small"
                variant={nameFormat === "friendly" ? "filled" : "outlined"}
                color={nameFormat === "friendly" ? "primary" : "default"}
                onClick={() => setNameFormat("friendly")}
                sx={{ cursor: "pointer", fontWeight: 600, fontSize: "0.75rem" }}
              />
              <Chip
                label="Exact"
                size="small"
                variant={nameFormat === "portal_raw" ? "filled" : "outlined"}
                color={nameFormat === "portal_raw" ? "primary" : "default"}
                onClick={() => setNameFormat("portal_raw")}
                sx={{ cursor: "pointer", fontWeight: 600, fontSize: "0.75rem" }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Result Count and Branch Info */}
      <Box sx={{ mb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Branch: <strong>{selectedBranch === "ALL" ? "All Branches" : selectedBranch}</strong>
          {selectedSemester !== "ALL" && (
            <>
              {" "}• Semester: <strong>Semester {selectedSemester}</strong>
            </>
          )}
        </Typography>
        <Typography variant="body2" fontWeight="700" color="primary">
          Showing {filteredPapers.length} Question Paper{filteredPapers.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Loading state */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredPapers.length === 0 ? (
        <Card sx={{ p: 5, textAlign: "center", borderRadius: 3, bgcolor: "#fbfbfb" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No question papers found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Try clearing the search query or selecting a different semester.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedSemester("ALL");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </Card>
      ) : (
        /* SINGLE LIST OF LINKS (REFERENCE SCREENSHOT STYLE) */
        <Card
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2.5,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            bgcolor: "#ffffff",
          }}
        >
          {/* Orange dashed horizontal line from the user's reference photo */}
          <Box
            sx={{
              width: "100%",
              borderTop: "2.5px dashed #f57c00",
              mb: 2.5,
            }}
          />

          {/* Vertical List of Links */}
          <Stack spacing={1.2}>
            {filteredPapers.map((paper, idx) => {
              const displayName = getDisplayName(paper);
              const itemColor = getItemColor(paper);
              const pdfUrl = paper.pdf_url || paper.url;

              return (
                <Box
                  key={`${paper.filename || paper.title}-${idx}`}
                  sx={{
                    py: 1,
                    px: 1.5,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    transition: "all 0.15s ease",
                    borderBottom: idx !== filteredPapers.length - 1 ? "1px solid #f3f4f6" : "none",
                    "&:hover": {
                      bgcolor: "#f8fafd",
                      "& .link-text": {
                        textDecoration: "underline",
                      },
                      "& .action-icons": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  {/* Left: Clickable Link & Metadata */}
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      component="a"
                      href={pdfUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenPdf(paper);
                      }}
                      className="link-text"
                      sx={{
                        color: itemColor,
                        fontWeight: 600,
                        fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.02rem" },
                        fontFamily: "'Roboto', 'Segoe UI', -apple-system, sans-serif",
                        letterSpacing: "0.2px",
                        display: "inline-block",
                        textDecoration: "none",
                        cursor: "pointer",
                        wordBreak: "break-word",
                        lineHeight: 1.45,
                        transition: "color 0.15s ease",
                        "&:hover": {
                          color: itemColor === "#e65100" ? "#bf360c" : "#1565c0",
                        },
                      }}
                      title="Click to view PDF directly in page"
                    >
                      {displayName}
                    </Typography>

                    {/* Subtle details tag for student clarity */}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.4 }} flexWrap="wrap">
                      <Typography variant="caption" sx={{ color: "#78909c", fontWeight: 500 }}>
                        {paper.subject} • Sem {paper.semester} • {paper.branch ? `${paper.branch} • ` : ""}{paper.session} {paper.exam_year}
                      </Typography>
                      {paper.paper_code && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "monospace",
                            bgcolor: "#eceff1",
                            px: 0.7,
                            py: 0.1,
                            borderRadius: 0.8,
                            color: "#455a64",
                            fontSize: "0.68rem",
                          }}
                        >
                          {paper.paper_code}
                        </Typography>
                      )}
                    </Stack>
                  </Box>

                  {/* Right: Quick Actions */}
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    className="action-icons"
                    sx={{
                      flexShrink: 0,
                      opacity: { xs: 1, sm: 0.8 },
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <Tooltip title="View PDF in Modal">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenPdf(paper)}
                        sx={{ bgcolor: "rgba(25, 118, 210, 0.08)", "&:hover": { bgcolor: "rgba(25, 118, 210, 0.18)" } }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Download PDF">
                      <IconButton
                        size="small"
                        component="a"
                        href={pdfUrl}
                        download={paper.filename || `${paper.subject}.pdf`}
                        sx={{ bgcolor: "#f5f5f5", color: "#546e7a", "&:hover": { bgcolor: "#e0e0e0" } }}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Open PDF in New Browser Tab">
                      <IconButton
                        size="small"
                        component="a"
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ bgcolor: "#f5f5f5", color: "#546e7a", "&:hover": { bgcolor: "#e0e0e0" } }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Card>
      )}

      {/* In-Page PDF Viewer Dialog */}
      <Dialog
        open={viewerOpen}
        onClose={handleClosePdf}
        fullWidth
        maxWidth={isFullscreen ? false : "lg"}
        fullScreen={isFullscreen}
        PaperProps={{
          sx: {
            borderRadius: isFullscreen ? 0 : 3,
            height: isFullscreen ? "100vh" : "88vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        }}
      >
        {currentPdf && (
          <>
            {/* Modal Header */}
            <DialogTitle
              sx={{
                p: 2,
                px: 3,
                bgcolor: "#0d47a1",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PictureAsPdfIcon sx={{ color: "#ff8a80" }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "white", lineHeight: 1.2 }}>
                    {currentPdf.subject}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                    Semester {currentPdf.semester} • {currentPdf.branch} • {currentPdf.session} {currentPdf.exam_year}
                  </Typography>
                </Box>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                {/* Download Button */}
                <Button
                  component="a"
                  href={currentPdf.pdf_url || currentPdf.url}
                  download={currentPdf.filename || `${currentPdf.subject}.pdf`}
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.7)",
                    textTransform: "none",
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Download
                </Button>

                {/* Open in new tab */}
                <Button
                  component="a"
                  href={currentPdf.pdf_url || currentPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  startIcon={<OpenInNewIcon />}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.7)",
                    textTransform: "none",
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  New Tab
                </Button>

                {/* Fullscreen Toggle */}
                <IconButton
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  sx={{ color: "white" }}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>

                {/* Close Button */}
                <IconButton onClick={handleClosePdf} sx={{ color: "white" }} title="Close Viewer">
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>

            {/* Modal Content: Embedded PDF */}
            <DialogContent sx={{ p: 0, flexGrow: 1, bgcolor: "#525659", display: "flex", flexDirection: "column" }}>
              <object
                data={currentPdf.pdf_url || currentPdf.url}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ flexGrow: 1, border: "none" }}
              >
                <iframe
                  src={currentPdf.pdf_url || currentPdf.url}
                  width="100%"
                  height="100%"
                  style={{ flexGrow: 1, border: "none" }}
                  title={currentPdf.subject}
                >
                  <Box sx={{ p: 4, textAlign: "center", bgcolor: "white", m: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      PDF Viewer Notice
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Your browser cannot display this PDF directly in the frame.
                    </Typography>
                    <Button
                      variant="contained"
                      component="a"
                      href={currentPdf.pdf_url || currentPdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open PDF Directly
                    </Button>
                  </Box>
                </iframe>
              </object>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
