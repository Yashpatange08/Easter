import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./components/about";
import Home from "./components/home";
import Exams from "./components/exams";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exams" element={<Exams />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
