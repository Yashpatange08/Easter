import "./App.css";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const Mywidth = 230;
  return (
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
  );
}

export default App;
