import Sidebar from "../components/Sidebar";
import { useFaculty } from "../context/FacultyContext";

export default function FacultyList() {
  const { faculty, assignSubject, subjects } = useFaculty();

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
                    {f.subjects.length > 0 ? f.subjects.join(", ") : <span className="text-gray-400">None</span>}
                  </td>
                  <td className="p-3">
                    <select
                      onChange={(e) => assignSubject(f.id, e.target.value)}
                      className="border rounded-lg px-3 py-1"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Subject
                      </option>
                      {subjects.map((s, i) => (
                        <option key={i} value={`${s.subject}|${s.batch}`}>
                          {s.subject} ({s.batch})
                        </option>
                      ))}
                    </select>
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
