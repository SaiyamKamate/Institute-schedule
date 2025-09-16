// src/pages/teacher/TeacherTimetable.jsx

import React from "react";
import { useFaculty } from "../../context/FacultyContext";
import { useAuth } from "../../context/AuthContext";
import { useTimetable } from "../../context/TimetableContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [
  "8:00 AM", "9:00 AM",
  "10:30 AM", "11:30 AM", "12:30 PM",
  "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM", "5:30 PM",
];

export default function TeacherTimetable() {
  const { faculty } = useFaculty();
  const { currentUser } = useAuth();
  const { timetables } = useTimetable();

  if (!currentUser || currentUser.role !== "teacher") {
    return <p className="p-6">Please log in as a teacher.</p>;
  }
  // Always show Dr. Sharma's classes for demo/testing
  const teacher = faculty.find((f) => f.name === "Mr. Sharma" || f.name === "Dr. Sharma");
  if (!teacher || !teacher.subjects.length) {
    return <p className="p-6">No classes assigned yet.</p>;
  }

  const merged = {};
  days.forEach(day => {
    merged[day] = {};
    times.forEach(time => {
      for (const classId of teacher.subjects) {
        const entry = timetables[classId]?.[day]?.[time];
        if (entry && entry.includes("Sharma")) {
          merged[day][time] = `${classId.split("|")[0]}: ${entry}`;
          break;
        }
      }
    });
  });

  return (
    <div style={{ marginTop: 20 }}>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">🗓️ My Timetable</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 border text-left">Time</th>
              {days.map((day) => (
                <th key={day} className="p-3 border text-left">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="p-3 border font-medium bg-gray-50">{time}</td>
                {days.map((day) => (
                  <td key={day + time} className="p-3 border h-16">
                    {merged[day][time] ? (
                      <div className="bg-blue-600 text-white rounded-lg p-2 text-sm shadow-md">
                        {merged[day][time]}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Free</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

