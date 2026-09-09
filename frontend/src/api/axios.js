import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/login/") &&
      !originalRequest.url.includes("/api/token/refresh/")
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const res = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh: refreshToken,
          });
          if (res.data.access) {
            localStorage.setItem("access_token", res.data.access);
            originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
