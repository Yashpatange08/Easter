import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return token || user ? <Outlet /> : <Navigate to="/login" replace />;
}
