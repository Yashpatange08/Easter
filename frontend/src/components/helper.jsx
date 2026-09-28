import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SchoolIcon from "@mui/icons-material/School";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import api from "../api/axios";

// Local Sem 1 & 2 Question Papers for 1-click selection
const LOCAL_SAMPLE_PAPERS = [
  { label: "Computer Programming in C (BTES204 - Jan 2026)", filename: "btech-1-sem-computer-programming-in-c-btes204-jan-2026.pdf" },
  { label: "Engineering Mathematics - I (BTBS101 - Jan 2026)", filename: "btech-1-sem-engineering-mathematics-1-btbs101-jan-2026.pdf" },
  { label: "Engineering Physics (BTBS102P - Jan 2026)", filename: "btech-1-sem-engineering-physics-btbs102p-jan-2026.pdf" },
  { label: "Engineering Chemistry (BTBS102 - Jan 2026)", filename: "btech-1-sem-engineering-chemistry-btbs102-jan-2026.pdf" },
  { label: "Programming for Problem Solving (24F1000ES106A)", filename: "btech-1-sem-programming-for-problem-solving-24f1000es106a-jan-2026.pdf" },
  { label: "Engineering Mathematics - II (BTBS201 - Jan 2026)", filename: "btech-2-sem-engineering-mathematics-2-btbs201-jan-2026.pdf" },
  { label: "Communication Skills (BTHM104 - Jan 2026)", filename: "btech-1-sem-2-sem-communication-skills-bthm104-jan-2026.pdf" },
];

export default function Helper() {
  const [messages, setMessages] = useState([
    {
      id: "m_welcome",
      sender: "bot",
      text: "👋 **Hello! I am your AI Study Helper & Question Paper Solver.**\n\nUpload any question paper PDF or select from your local Sem 1 & 2 papers above. I will extract the questions, detect their marks weightage, and format detailed answers for you!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [activePaper, setActivePaper] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [selectedLocalPaper, setSelectedLocalPaper] = useState("");

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loadingAnswer]);

  // Handle uploading or selecting a PDF
  const handleAnalyzePdf = async (fileOrFilename) => {
    setAnalyzing(true);
    let payload;
    let isFormData = false;

    if (typeof fileOrFilename === "string") {
      payload = { filename: fileOrFilename };
    } else {
      payload = new FormData();
      payload.append("pdf", fileOrFilename);
      isFormData = true;
    }

    try {
      const res = await api.post(
        "/api/helper/upload-pdf/",
        payload,
        isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {}
      );

      const paperData = res.data;
      setActivePaper(paperData);

      // Add user announcement
      const uploadNotice = {
        id: `m_${Date.now()}_u`,
        sender: "user",
        text: `📄 Uploaded paper: **${paperData.filename}**`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      // Add bot prompt asking for format
      const botResponse = {
        id: `m_${Date.now()}_b`,
        sender: "bot",
        text: paperData.bot_message,
        paper: paperData,
        showFormatButtons: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, uploadNotice, botResponse]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now()}_err`,
          sender: "bot",
          text: "⚠️ Sorry, I could not analyze this PDF file. Please ensure the Django backend is running or choose a local Sem 1 & 2 paper.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setAnalyzing(false);
    }
  };

  // Generate answers according to chosen format or question
  const handleRequestAnswer = async (queryText, formatType = "long") => {
    if (!queryText.trim() || loadingAnswer) return;

    const userMessage = {
      id: `m_${Date.now()}_u`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setLoadingAnswer(true);

    try {
      const res = await api.post("/api/helper/chat/", {
        query: queryText,
        format_type: formatType,
        subject_key: activePaper?.subject_key || "computer_programming_in_c",
      });

      const botAnswer = {
        id: `m_${Date.now()}_b`,
        sender: "bot",
        text: res.data.reply,
        format_type: formatType,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botAnswer]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now()}_err`,
          sender: "bot",
          text: "⚠️ Could not generate the answer from the server. Please verify backend connectivity.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoadingAnswer(false);
    }
  };

  // Copy answer to clipboard
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download all messages as text/markdown
  const handleDownloadSolutions = () => {
    const content = messages
      .map((m) => `[${m.sender.toUpperCase()} - ${m.timestamp}]\n${m.text}\n\n------------------------------------\n\n`)
      .join("");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activePaper?.subject || "PYQ_Solutions"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setActivePaper(null);
    setSelectedLocalPaper("");
    setMessages([
      {
        id: "m_welcome",
        sender: "bot",
        text: "👋 **Hello! I am your AI Study Helper & Question Paper Solver.**\n\nUpload any question paper PDF or select from your local Sem 1 & 2 papers above. I will extract the questions, detect their marks weightage, and format detailed answers for you!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header Banner */}
      <Card
        sx={{
          mb: 3,
          p: { xs: 2, sm: 3 },
          background: "linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #8e24aa 100%)",
          color: "white",
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(74, 20, 140, 0.25)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
              <SchoolIcon sx={{ fontSize: 36, color: "#e1bee7" }} />
              <Typography variant="h4" component="h1" fontWeight="800">
                AI Question Paper Solver & Study Helper
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)", maxWidth: 750 }}>
              Upload any question paper PDF. The AI chatbot analyzes the questions, checks marks weightage (e.g. 6 marks $\to$ 10-15 lines), and generates exam-ready answers according to your chosen format.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {activePaper && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadSolutions}
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.7)" }}
              >
                Export Answers
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
              sx={{ color: "white", borderColor: "rgba(255,255,255,0.7)" }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Card>

      {/* Upload and Quick Paper Selection Bar */}
      <Card sx={{ mb: 3, p: 2.5, borderRadius: 2.5, boxShadow: 2, border: "1px solid #e0e0e0" }}>
        <Grid container spacing={2} alignItems="center">
          {/* Custom PDF Upload Button */}
          <Grid item xs={12} sm={5}>
            <input
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleAnalyzePdf(e.target.files[0]);
                }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<CloudUploadIcon />}
              onClick={() => fileInputRef.current?.click()}
              disabled={analyzing}
              sx={{ py: 1.2, fontWeight: 700, borderRadius: 2 }}
            >
              {analyzing ? "Analyzing PDF..." : "Upload Question Paper PDF"}
            </Button>
          </Grid>

          {/* Quick Select from 21 Local Sem 1 & 2 Papers */}
          <Grid item xs={12} sm={7}>
            <TextField
              select
              fullWidth
              size="small"
              label="Or Select Local Sem 1 & 2 Paper"
              value={selectedLocalPaper}
              disabled={analyzing}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedLocalPaper(val);
                if (val) {
                  handleAnalyzePdf(val);
                }
              }}
            >
              <MenuItem value="">-- Select a Question Paper --</MenuItem>
              {LOCAL_SAMPLE_PAPERS.map((p) => (
                <MenuItem key={p.filename} value={p.filename}>
                  {p.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Active Paper Status Pill */}
        {activePaper && (
          <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Chip
              icon={<PictureAsPdfIcon />}
              label={`Active Paper: ${activePaper.subject}`}
              color="primary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={`Total Marks: ${activePaper.total_marks}`}
              variant="outlined"
              size="small"
            />
            <Chip
              label={`${activePaper.questions?.length || 0} Questions Detected`}
              variant="outlined"
              color="secondary"
              size="small"
            />
          </Box>
        )}
      </Card>

      {/* Main Chat Conversation Card */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, display: "flex", flexDirection: "column", height: "68vh", overflow: "hidden" }}>
        {/* Messages Scroll Area */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 2, sm: 3 }, bgcolor: "#fbfcfe", display: "flex", flexDirection: "column", gap: 2.5 }}>
          {messages.map((m) => (
            <Box
              key={m.id}
              sx={{
                display: "flex",
                flexDirection: m.sender === "user" ? "row-reverse" : "row",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              {/* Avatar */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: m.sender === "user" ? "#1976d2" : "#6a1b9a",
                  color: "white",
                  flexShrink: 0,
                  boxShadow: 1,
                }}
              >
                {m.sender === "user" ? <PersonIcon /> : <SmartToyIcon />}
              </Box>

              {/* Message Bubble */}
              <Paper
                elevation={1}
                sx={{
                  maxWidth: { xs: "90%", md: "78%" },
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: m.sender === "user" ? "#e3f2fd" : "#ffffff",
                  border: m.sender === "user" ? "1px solid #90caf9" : "1px solid #e0e0e0",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                    color: "#212121",
                    "& strong": { color: "#0d47a1" },
                    "& code": {
                      bgcolor: "#f5f5f5",
                      px: 0.8,
                      py: 0.3,
                      borderRadius: 1,
                      fontFamily: "monospace",
                      fontSize: "0.85em",
                      color: "#c2185b",
                    },
                  }}
                >
                  {m.text}
                </Typography>

                {/* Format selection buttons offered by chatbot */}
                {m.showFormatButtons && (
                  <Box sx={{ mt: 2.5, pt: 2, borderTop: "1px solid #eeeeee" }}>
                    <Typography variant="subtitle2" fontWeight="700" color="primary" gutterBottom>
                      Select Answer Format:
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<FormatListNumberedIcon />}
                        onClick={() => handleRequestAnswer("Explain the switch statement with syntax, rules, and an example", "long")}
                        sx={{ textTransform: "none", fontWeight: 700 }}
                      >
                        1. Long Format (6-Mark • 10-15 Lines)
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleRequestAnswer("Solve Q.1 Objective Type Questions", "short")}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      >
                        2. Solve Q.1 MCQs
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleRequestAnswer("Solve Q.4 (A) Array size specification rules", "long")}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      >
                        3. Solve Q.4 Array Rules
                      </Button>
                    </Stack>
                  </Box>
                )}

                {/* Detected Questions Quick Pick */}
                {m.paper?.questions && (
                  <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px dashed #e0e0e0" }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      Click any detected question to generate its answer:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {m.paper.questions.map((q) => (
                        <Chip
                          key={q.id}
                          label={`${q.number} (${q.marks}M)`}
                          clickable
                          size="small"
                          onClick={() => handleRequestAnswer(`Answer ${q.number}: ${q.title}`, "long")}
                          sx={{ bgcolor: "#f3e5f5", color: "#4a148c", fontWeight: 600 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Message Footer: Timestamp and Copy Button */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {m.timestamp}
                  </Typography>

                  {m.sender === "bot" && (
                    <Tooltip title={copiedId === m.id ? "Copied!" : "Copy Answer"}>
                      <IconButton size="small" onClick={() => handleCopy(m.text, m.id)}>
                        {copiedId === m.id ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Paper>
            </Box>
          ))}

          {/* Typing Indicator */}
          {loadingAnswer && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#6a1b9a",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SmartToyIcon />
              </Box>
              <Paper sx={{ p: 2, borderRadius: 3, display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={18} color="secondary" />
                <Typography variant="body2" color="text.secondary">
                  Chatbot is analyzing question weightage and generating marks-calibrated answer...
                </Typography>
              </Paper>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input Form Bar */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRequestAnswer(inputQuery, "long");
          }}
          sx={{
            p: 2,
            borderTop: "1px solid #e0e0e0",
            bgcolor: "white",
            display: "flex",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder={
              activePaper
                ? `Ask about ${activePaper.subject} (e.g. "Solve Q.2 A in long format", "Explain Q.4 C with code")...`
                : "Ask about any PYQ question or upload a PDF above..."
            }
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={loadingAnswer || analyzing}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!inputQuery.trim() || loadingAnswer || analyzing}
            endIcon={<SendIcon />}
            sx={{ px: 3, fontWeight: 700, borderRadius: 2 }}
          >
            Send
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
