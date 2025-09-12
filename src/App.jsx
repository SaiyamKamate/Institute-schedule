// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import TeacherLayout from "./pages/teacher/TeacherLayout";
import TeacherInfo from "./pages/teacher/TeacherInfo";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherLeaves from "./pages/teacher/TeacherLeaves";
import TeacherLabs from "./pages/teacher/TeacherLabs";
import TeacherTimetable from "./pages/teacher/TeacherTimetable";
import ProtectedRoute from "./components/ProtectedRoute";
import Timetables from "./pages/Timetables";
import FacultyList from "./pages/FacultyList";
import Subjects from "./pages/Subjects";
import Leaverequests from "./pages/Leaverequests";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/timetables" element={<Timetables />} />
      <Route path="/faculty" element={<FacultyList />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/leaves" element={<Leaverequests />} />

      {/* Teacher */}
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route path="info" element={<TeacherInfo />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="leaves" element={<TeacherLeaves />} />
        <Route path="labs" element={<TeacherLabs />} />
        {/* ✅ Fixed: no :id, now matches /teacher/timetable */}
        <Route path="timetable" element={<TeacherTimetable />} />
      </Route>

      {/* Default + 404 */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
