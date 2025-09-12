import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TimetableGrid from "../components/TimetableGrid";
import { useFaculty } from "../context/FacultyContext";

export default function Timetables() {
  const facultyContext = useFaculty();
  const subjects = facultyContext?.subjects ?? [];
  const [selectedClass, setSelectedClass] = useState(
    subjects.length > 0 ? `${subjects[0].subject}|${subjects[0].batch}` : ""
  );

  if (subjects.length === 0) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">📅 Timetables</h1>
          <p className="text-gray-600">
            No classes found. Please add subjects and batches in Institution Details.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">📅 Timetables</h1>

        {/* Class selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            {subjects.map((s, i) => (
              <option key={i} value={`${s.subject}|${s.batch}`}>
                {s.subject} ({s.batch})
              </option>
            ))}
          </select>
        </div>

        {selectedClass && <TimetableGrid classId={selectedClass} subjects={subjects} />}
      </main>
    </div>
  );
}

