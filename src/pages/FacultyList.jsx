import Sidebar from "../components/Sidebar";

const dummyFaculty = [
  { name: "Dr. Sharma", subject: "Math", email: "sharma@inst.edu" },
  { name: "Prof. Patel", subject: "Physics", email: "patel@inst.edu" },
];

export default function FacultyList() {
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
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {dummyFaculty.map((f, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3">{f.name}</td>
                  <td className="p-3">{f.subject}</td>
                  <td className="p-3">{f.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
