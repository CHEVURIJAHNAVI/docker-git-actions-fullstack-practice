import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AddHabit from "./components/AddHabit";

import "./components/style.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2>Habit Tracker</h2>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/add">Add Habit</Link>
            
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddHabit />} />
          
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
