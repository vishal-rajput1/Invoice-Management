import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Teammember from "./components/teammember";
import Invoice from "./components/Invoice";
import Dashboard from "./components/dashboard";
import Courses from "./components/courses";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teammember" element={<Teammember />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
