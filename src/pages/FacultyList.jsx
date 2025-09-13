import Sidebar from "../components/Sidebar";
import { useFaculty } from "../context/FacultyContext";

import { useState } from "react";

export default function FacultyList() {
  const { faculty, assignSubject, subjects } = useFaculty();
  const [selectedSubjects, setSelectedSubjects] = useState({}); // { [teacherId]: subjectName }

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
                <tr key={f.id} className="border-b">
                  <td className="p-3">{f.name}</td>
                  <td className="p-3">{f.email}</td>
                  <td className="p-3">
                    {f.subjects && f.subjects.length > 0 ? f.subjects.join(", ") : <span className="text-gray-400">None</span>}
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <select
                      value={selectedSubjects[f.id] || ""}
                      onChange={(e) => {
                        setSelectedSubjects((prev) => ({ ...prev, [f.id]: e.target.value }));
                      }}
                      className="border rounded-lg px-3 py-1"
                    >
                      <option value="">
                        Select Subject
                      </option>
                      {subjects.map((name, i) => (
                        <option key={i} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    {selectedSubjects[f.id] && (
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition"
                        onClick={() => {
                          assignSubject(f.id, selectedSubjects[f.id]);
                          setSelectedSubjects((prev) => ({ ...prev, [f.id]: "" }));
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
