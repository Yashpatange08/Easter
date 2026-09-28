import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);

  const checkHealth = useCallback(async () => {
    try {
      const res = await api.get("/api/health/");
      setBackendOnline(true);
      setBackendHealth(res.data);
      return res.data;
    } catch {
      setBackendOnline(false);
      setBackendHealth(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      // Check backend health
      await checkHealth();

      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const res = await api.get("/api/profile/");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setUser(null);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [checkHealth]);

  const login = async (username, password) => {
    const res = await api.post("/api/login/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);

    const profileRes = await api.get("/api/profile/");
    setUser(profileRes.data);
    localStorage.setItem("user", JSON.stringify(profileRes.data));
    return profileRes.data;
  };

  const signup = async (userData) => {
    return await api.post("/api/signup/", userData);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        backendOnline,
        backendHealth,
        checkHealth,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
