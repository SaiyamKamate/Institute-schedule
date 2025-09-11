import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // wraps Login
import AdminPage from "./pages/AdminPage.jsx";
import FacultyList from "./pages/FacultyList.jsx";
import Leaverequests from "./pages/Leaverequests.jsx"; // ✅ lowercase "r"
import Subjects from "./pages/Subjects.jsx";
import Timetables from "./pages/Timetables.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default = Login */}
        <Route path="/" element={<App />} />
        
        {/* Admin pages */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/faculty" element={<FacultyList />} />
        <Route path="/leaves" element={<Leaverequests />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/timetables" element={<Timetables />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
