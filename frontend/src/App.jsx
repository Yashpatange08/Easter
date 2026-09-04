import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./components/about";
import Home from "./components/home";
import Exams from "./components/exams";
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import PYQs from "./components/pyqs";
import Helper from "./components/helper";
function App() {
  return (
    <>
    <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/PYQs" element={<PYQs />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Helper" element={<Helper />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
