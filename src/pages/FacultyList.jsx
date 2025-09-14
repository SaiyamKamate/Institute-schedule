import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

export default function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({}); // { [teacherId]: subjectId }

  // Fetch faculty with assigned subjects
  useEffect(() => {
    fetch("http://localhost:8000/faculty_with_subjects")
      .then((res) => res.json())
      .then((data) => setFaculty(data));
  }, []);

  // Fetch all subjects (id and name)
  useEffect(() => {
    fetch("http://localhost:8000/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data.subjects || []));
  }, []);

  // Assign subject to teacher
  const assignSubject = (teacher_id, subject_id) => {
    fetch("http://localhost:8000/assign_subject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacher_id, subject_id }),
    })
      .then((res) => res.json())
      .then(() => {
        // Refresh faculty list after assignment
        fetch("http://localhost:8000/faculty_with_subjects")
          .then((res) => res.json())
          .then((data) => setFaculty(data));
      });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">👨‍🏫 Faculty List</h1>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Subjects</th>
                <th className="p-3 text-left">Assign Subject</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f) => (
                <tr key={f.teacher_id} className="border-b">
                  <td className="p-3">{f.teacher_name}</td>
                  <td className="p-3">{f.teacher_email}</td>
                  <td className="p-3">
                    {f.subjects && f.subjects.length > 0
                      ? f.subjects.join(", ")
                      : <span className="text-gray-400">None</span>}
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <select
                      value={selectedSubjects[f.teacher_id] || ""}
                      onChange={(e) => {
                        setSelectedSubjects((prev) => ({
                          ...prev,
                          [f.teacher_id]: e.target.value,
                        }));
                      }}
                      className="border rounded-lg px-3 py-1"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subj) => (
                        <option key={subj.id} value={subj.id}>
                          {subj.name}
                        </option>
                      ))}
                    </select>
                    {selectedSubjects[f.teacher_id] && (
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition"
                        onClick={() => {
                          assignSubject(f.teacher_id, selectedSubjects[f.teacher_id]);
                          setSelectedSubjects((prev) => ({
                            ...prev,
                            [f.teacher_id]: "",
                          }));
                        }}
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}