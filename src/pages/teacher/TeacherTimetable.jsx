// src/pages/teacher/TeacherTimetable.jsx
import React from "react";
import TimetableGrid from "../../components/TimetableGrid";

export default function TeacherTimetable({ entries }) {
  if (!entries || entries.length === 0) {
    return <p>No timetable assigned.</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Your Timetable</h2>
      <TimetableGrid entries={entries} />
    </div>
  );
}

