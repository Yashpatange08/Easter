import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function EasterLogo({ size = "small", to = "/" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const isSmall = size === "small";
  const boxSize = isSmall ? 32 : 40;
  const iconSize = isSmall ? 18 : 22;

  const handleClick = () => {
    setPulsing(true);
    setTimeout(() => setPulsing(false), 550);
  };

  return (
    <Box
      component={to ? Link : "div"}
      to={to}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        textDecoration: "none",
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        py: 0.5,
        px: 0.75,
        borderRadius: 2,
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "scale(0.97)",
        },
      }}
    >
      {/* Sleek Frosted Glass Icon Badge */}
      <Box
        sx={{
          position: "relative",
          width: boxSize,
          height: boxSize,
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: isHovered ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.12)",
          border: isHovered ? "1px solid rgba(255, 255, 255, 0.45)" : "1px solid rgba(255, 255, 255, 0.22)",
          backdropFilter: "blur(12px)",
          boxShadow: isHovered
            ? "0 4px 16px rgba(56, 189, 248, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.4)"
            : "0 2px 6px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Subtle Click Pulse Wave */}
        {pulsing && (
          <Box
            sx={{
              position: "absolute",
              inset: -3,
              borderRadius: "12px",
              border: "2px solid #38bdf8",
              pointerEvents: "none",
              animation: "pulseWave 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              "@keyframes pulseWave": {
                "0%": { transform: "scale(0.95)", opacity: 0.8 },
                "100%": { transform: "scale(1.5)", opacity: 0 },
              },
            }}
          />
        )}

        {/* Minimalist Geometric Monogram with Cyan Dot */}
        <Box
          component="svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          sx={{
            transform: isHovered ? "rotate(8deg) scale(1.06)" : "rotate(0deg) scale(1)",
            transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Top Bar */}
          <path d="M5 4.5h14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Mid Bar */}
          <path d="M5 12h8.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bottom Bar */}
          <path d="M5 19.5h14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Vertical Stem */}
          <path d="M5 4.5v15" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Focal Cyan Spark */}
          <circle cx="18" cy="12" r="2.2" fill="#38bdf8" />
        </Box>
      </Box>

      {/* Clean Aesthetic Typography */}
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Typography
          component="span"
          sx={{
            fontWeight: 800,
            fontSize: isSmall ? "1.25rem" : "1.6rem",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: "0.2px",
            color: "#ffffff",
            lineHeight: 1,
            textShadow: isHovered ? "0 0 16px rgba(255, 255, 255, 0.4)" : "none",
            transition: "all 0.25s ease",
          }}
        >
          Easter
        </Typography>
        {/* Modern Accent Dot */}
        <Box
          component="span"
          sx={{
            width: isSmall ? 5 : 6,
            height: isSmall ? 5 : 6,
            borderRadius: "50%",
            bgcolor: "#38bdf8",
            ml: 0.6,
            display: "inline-block",
            boxShadow: isHovered
              ? "0 0 8px #38bdf8, 0 0 16px #38bdf8"
              : "0 0 4px rgba(56, 189, 248, 0.6)",
            transform: isHovered ? "scale(1.3)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </Box>
    </Box>
  );
}
