import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data.subjects || []));
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">📚 Subject List</h1>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Code</th>
                <th className="text-left px-4 py-2">Department</th>
                <th className="text-left px-4 py-2">Weekly Classes</th>
                <th className="text-left px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj) => (
                <tr key={subj.id}>
                  <td className="px-4 py-2">{subj.name}</td>
                  <td className="px-4 py-2">{subj.code}</td>
                  <td className="px-4 py-2">{subj.department}</td>
                  <td className="px-4 py-2">{subj.weekly_classes}</td>
                  <td className="px-4 py-2">{subj.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}