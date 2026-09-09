import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const res = await api.get("/api/profile/");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch {
          setUser(null);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

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
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
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
