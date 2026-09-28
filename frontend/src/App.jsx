import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import About from "./components/about";
import Home from "./components/home";
import Exams from "./components/exams";
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import PYQs from "./components/pyqs";
import Helper from "./components/helper";
import Login from "./components/login";
import Signup from "./components/signup";
import ProtectedRoute from "./components/ProtectedRoute";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#090d16",
      paper: "#0f172a",
    },
    primary: {
      main: "#38bdf8",
      light: "#7dd3fc",
      dark: "#0284c7",
      contrastText: "#090d16",
    },
    secondary: {
      main: "#c084fc",
    },
    success: {
      main: "#34d399",
    },
    warning: {
      main: "#fbbf24",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  shape: {
    borderRadius: 14,
  },
});

function App() {
  const Mywidth = 230;
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <div className="App">
        <Navbar
          drawerWidth={Mywidth}
          content={
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/About" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/exams" element={<Exams />} />
                <Route path="/Exams" element={<Exams />} />
                <Route path="/pyqs" element={<PYQs />} />
                <Route path="/PYQs" element={<PYQs />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/Notes" element={<Notes />} />
                <Route path="/helper" element={<Helper />} />
                <Route path="/Helper" element={<Helper />} />
              </Route>
            </Routes>
          }
        />
      </div>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
