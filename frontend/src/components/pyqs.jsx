import React, { useState, useEffect, useMemo, useRef } from "react";
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
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";

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

// O(1) Map lookup for instant sort index resolution
const REFERENCE_ORDER_MAP = new Map(
  REFERENCE_ORDER.map((item, index) => [item.toUpperCase(), index])
);

export default function PYQs() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Pre-initialize with local bundled data for instantaneous 0ms page load
  const [papers, setPapers] = useState(localPyqs || []);
  const [loading, setLoading] = useState(false);

  // Name format: 'portal_pdf' (default), 'friendly' (e.g. M1 PYQ 2026.pdf), or 'portal_raw'
  const [nameFormat, setNameFormat] = useState("portal_pdf");

  // Filters
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [selectedSemester, setSelectedSemester] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Virtual Pagination state: keeps DOM lightweight (<500 nodes) for instant responsiveness
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // In-Page PDF Viewer State
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);

  // Cache of prefetched URLs to avoid duplicate network requests
  const prefetchedUrls = useRef(new Set());

  // High-performance pre-fetcher for zero-wait PDF opening
  const prefetchPdf = (url) => {
    if (!url || prefetchedUrls.current.has(url)) return;
    prefetchedUrls.current.add(url);
    try {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "fetch";
      link.href = url;
      document.head.appendChild(link);
      if (typeof window.fetch === "function") {
        fetch(url, { priority: "low" }).catch(() => {});
      }
    } catch {}
  };

  // Only sync from backend if local data is empty
  useEffect(() => {
    if (!papers || papers.length === 0) {
      setLoading(true);
      api
        .get("/api/pyqs/")
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setPapers(res.data);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, []);

  // Reset pagination to page 1 on filter or search changes
  useEffect(() => {
    setPage(1);
  }, [selectedBranch, selectedSemester, searchQuery]);

  // Sort the full dataset ONCE with O(1) Map lookups, rather than re-sorting on every single keystroke
  const sortedBasePapers = useMemo(() => {
    const list = [...papers];
    list.sort((a, b) => {
      const titleA = (a.title || "").toUpperCase();
      const titleB = (b.title || "").toUpperCase();
      const idxA = REFERENCE_ORDER_MAP.get(titleA);
      const idxB = REFERENCE_ORDER_MAP.get(titleB);
      if (idxA !== undefined && idxB !== undefined) return idxA - idxB;
      if (idxA !== undefined) return -1;
      if (idxB !== undefined) return 1;
      return titleA.localeCompare(titleB);
    });
    return list;
  }, [papers]);

  // Fast O(N) filter pass without expensive re-sorting
  const filteredPapers = useMemo(() => {
    let result = sortedBasePapers;

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
      const q = searchQuery.toLowerCase().trim();
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

    return result;
  }, [sortedBasePapers, selectedBranch, selectedSemester, searchQuery]);

  // Paginated slice for fast DOM rendering
  const totalPages = Math.ceil(filteredPapers.length / (pageSize === "ALL" ? 1 : pageSize)) || 1;
  const paginatedPapers = useMemo(() => {
    if (pageSize === "ALL") return filteredPapers;
    const start = (page - 1) * pageSize;
    return filteredPapers.slice(start, start + pageSize);
  }, [filteredPapers, page, pageSize]);

  // Predictive pre-fetching: Automatically warm the browser cache with top visible PDFs
  useEffect(() => {
    if (paginatedPapers.length > 0) {
      paginatedPapers.slice(0, 5).forEach((p) => {
        prefetchPdf(p.pdf_url || p.url);
      });
    }
  }, [paginatedPapers]);

  // Open PDF in modal viewer with immediate feedback
  const handleOpenPdf = (paper) => {
    setCurrentPdf(paper);
    setPdfLoading(true);
    setViewerOpen(true);
    // Safety auto-dismiss: ensure viewer is never blocked if browser's native PDF plugin doesn't trigger iframe load event
    setTimeout(() => {
      setPdfLoading(false);
    }, 600);
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

  // Color logic: Summer exams are orange, Winter/Jan exams are deep blue (or cyan in dark mode)
  const getItemColor = (paper) => {
    const isSummer =
      paper.session?.toUpperCase() === "SUMMER" ||
      paper.title?.toUpperCase().includes("SUMMER") ||
      paper.filename?.toUpperCase().includes("SUMMER");

    if (isDark) {
      return isSummer ? "#fb923c" : "#38bdf8";
    }
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
    <Box sx={{ maxWidth: 1350, mx: "auto", p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header Banner */}
      <Card
        sx={{
          mb: 2.5,
          p: { xs: 2.5, sm: 3 },
          background: isDark
            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)"
            : "linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)",
          color: "white",
          borderRadius: 3.5,
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 25px rgba(13, 71, 161, 0.25)",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
              <SchoolIcon sx={{ fontSize: 36, color: "#38bdf8" }} />
              <Typography variant="h4" component="h1" fontWeight="800">
                {selectedBranch === "ALL" ? "DBATU Engineering PYQs" : `${selectedBranch} PYQs`}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)", maxWidth: 750 }}>
              Official DBATU University Previous Year Question Papers for{" "}
              <strong>{selectedBranch === "ALL" ? "All Engineering Branches" : selectedBranch}</strong>.
              Click any question paper link to open and view the PDF with zero loading delays!
            </Typography>
          </Box>

          <Chip
            icon={<PictureAsPdfIcon sx={{ "&&": { color: "white" } }} />}
            label={`${papers.length} PDF Papers`}
            sx={{
              bgcolor: isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.85rem",
              alignSelf: { xs: "flex-start", sm: "center" },
              border: isDark ? "1px solid rgba(56, 189, 248, 0.4)" : "none",
            }}
          />
        </Stack>
      </Card>

      {/* Simplified Controls Card */}
      <Card
        sx={{
          mb: 2.5,
          p: 2,
          borderRadius: 2.5,
          bgcolor: isDark ? "#0f172a" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
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

      {/* Result Count, Pagination Top Header & Page Size Selector */}
      <Box sx={{ mb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredPapers.length > 0 ? (page - 1) * (pageSize === "ALL" ? filteredPapers.length : pageSize) + 1 : 0}–
          {pageSize === "ALL" ? filteredPapers.length : Math.min(page * pageSize, filteredPapers.length)} of {filteredPapers.length} Question Paper{filteredPapers.length !== 1 ? "s" : ""}
          {selectedBranch !== "ALL" && (
            <>
              {" "}• <strong>{selectedBranch}</strong>
            </>
          )}
          {selectedSemester !== "ALL" && (
            <>
              {" "}• <strong>Sem {selectedSemester}</strong>
            </>
          )}
        </Typography>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="caption" color="text.secondary" fontWeight="600">
            Per page:
          </Typography>
          {[25, 50, 100, "ALL"].map((size) => (
            <Chip
              key={size}
              label={size === "ALL" ? "All" : size}
              size="small"
              variant={pageSize === size ? "filled" : "outlined"}
              color={pageSize === size ? "primary" : "default"}
              onClick={() => {
                setPageSize(size);
                setPage(1);
              }}
              sx={{ cursor: "pointer", fontWeight: 600, fontSize: "0.72rem", height: 24 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Loading state or Empty State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredPapers.length === 0 ? (
        <Card sx={{ p: 5, textAlign: "center", borderRadius: 3, bgcolor: isDark ? "#0f172a" : "#fbfbfb" }}>
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
        /* SINGLE LIST OF LINKS (FAST PAGINATED RENDER) */
        <Card
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2.5,
            boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
            bgcolor: isDark ? "#0f172a" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          }}
        >
          {/* Orange dashed horizontal line matching reference screenshot */}
          <Box
            sx={{
              width: "100%",
              borderTop: "2.5px dashed #f57c00",
              mb: 2.5,
            }}
          />

          {/* Vertical List of Links - Rendered in ultra-fast paginated batches */}
          <Stack spacing={1.2}>
            {paginatedPapers.map((paper, idx) => {
              const displayName = getDisplayName(paper);
              const itemColor = getItemColor(paper);
              const pdfUrl = paper.pdf_url || paper.url;

              return (
                <Box
                  key={`${paper.filename || paper.title}-${idx}`}
                  onMouseEnter={() => prefetchPdf(pdfUrl)}
                  sx={{
                    py: 1,
                    px: 1.5,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    transition: "all 0.15s ease",
                    borderBottom: idx !== paginatedPapers.length - 1 ? (isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid #f3f4f6") : "none",
                    "&:hover": {
                      bgcolor: isDark ? "rgba(56, 189, 248, 0.06)" : "#f8fafd",
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
                          color: isDark ? "#7dd3fc" : itemColor === "#e65100" ? "#bf360c" : "#1565c0",
                        },
                      }}
                      title="Click to view PDF instantly"
                    >
                      {displayName}
                    </Typography>

                    {/* Details tag for student clarity */}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.4 }} flexWrap="wrap">
                      <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#78909c", fontWeight: 500 }}>
                        {paper.subject} • Sem {paper.semester} • {paper.branch ? `${paper.branch} • ` : ""}{paper.session} {paper.exam_year}
                      </Typography>
                      {paper.paper_code && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "monospace",
                            bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "#eceff1",
                            px: 0.7,
                            py: 0.1,
                            borderRadius: 0.8,
                            color: isDark ? "#cbd5e1" : "#455a64",
                            fontSize: "0.68rem",
                          }}
                        >
                          {paper.paper_code}
                        </Typography>
                      )}
                    </Stack>
                  </Box>

                  {/* Right: Quick Actions (Zero-overhead native titles instead of heavy Tooltip portals) */}
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    className="action-icons"
                    sx={{
                      flexShrink: 0,
                      opacity: { xs: 1, sm: 0.85 },
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <IconButton
                      size="small"
                      color="primary"
                      title="View PDF Instantly"
                      aria-label="View PDF"
                      onClick={() => handleOpenPdf(paper)}
                      sx={{
                        bgcolor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(25, 118, 210, 0.08)",
                        "&:hover": { bgcolor: isDark ? "rgba(56, 189, 248, 0.25)" : "rgba(25, 118, 210, 0.18)" },
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      component="a"
                      href={pdfUrl}
                      download={paper.filename || `${paper.subject}.pdf`}
                      title="Download PDF"
                      aria-label="Download PDF"
                      sx={{
                        bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "#f5f5f5",
                        color: isDark ? "#cbd5e1" : "#546e7a",
                        "&:hover": { bgcolor: isDark ? "rgba(255, 255, 255, 0.16)" : "#e0e0e0" },
                      }}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      component="a"
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in New Tab"
                      aria-label="Open in New Tab"
                      sx={{
                        bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "#f5f5f5",
                        color: isDark ? "#cbd5e1" : "#546e7a",
                        "&:hover": { bgcolor: isDark ? "rgba(255, 255, 255, 0.16)" : "#e0e0e0" },
                      }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          {/* Bottom Pagination Bar */}
          {pageSize !== "ALL" && totalPages > 1 && (
            <Box sx={{ mt: 3, pt: 2, borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #f3f4f6", display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, val) => {
                  setPage(val);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                  },
                }}
              />
            </Box>
          )}
        </Card>
      )}

      {/* In-Page PDF Viewer Dialog (Fast loading iframe + visual status) */}
      <Dialog
        open={viewerOpen}
        onClose={handleClosePdf}
        fullWidth
        maxWidth={isFullscreen ? false : "lg"}
        fullScreen={isFullscreen}
        keepMounted={false}
        PaperProps={{
          sx: {
            borderRadius: isFullscreen ? 0 : 3,
            height: isFullscreen ? "100vh" : "88vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            bgcolor: isDark ? "#0f172a" : "#ffffff",
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
                bgcolor: isDark ? "#1e293b" : "#0d47a1",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
                borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PictureAsPdfIcon sx={{ color: "#38bdf8" }} />
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

            {/* Modal Content: Fast Direct Embedded PDF with Instant Loading Feedback */}
            <DialogContent
              sx={{
                p: 0,
                flexGrow: 1,
                bgcolor: isDark ? "#090d16" : "#525659",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Fast Direct iframe using compact PDF view options (#toolbar=1&navpanes=0&view=FitH) */}
              <iframe
                key={currentPdf.pdf_url || currentPdf.url}
                src={`${currentPdf.pdf_url || currentPdf.url}#toolbar=1&navpanes=0&view=FitH`}
                width="100%"
                height="100%"
                style={{
                  width: "100%",
                  height: "100%",
                  flexGrow: 1,
                  border: "none",
                  display: "block",
                  backgroundColor: isDark ? "#090d16" : "#525659",
                }}
                title={currentPdf.subject || "PDF Document"}
                onLoad={() => setPdfLoading(false)}
              />

              {/* Animated Loading Overlay while PDF bytes stream */}
              {pdfLoading && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(248, 250, 253, 0.92)",
                    backdropFilter: "blur(4px)",
                    gap: 2,
                    pointerEvents: "none",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <CircularProgress size={44} sx={{ color: "#38bdf8" }} />
                  <Typography variant="body1" sx={{ color: isDark ? "#f8fafc" : "#0f172a", fontWeight: 700 }}>
                    Opening PDF Document...
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                    {currentPdf.filename || currentPdf.title}
                  </Typography>
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
