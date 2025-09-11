import Sidebar from "../components/Sidebar";

const dummySubjects = [
  { subject: "Math", teachers: ["Dr. Sharma"], year: "1st Year" },
  { subject: "Physics", teachers: ["Prof. Patel"], year: "2nd Year" },
];

export default function Subjects() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">📚 Subject List</h1>

        <div className="bg-white p-6 rounded-xl shadow-md">
          {dummySubjects.map((s, idx) => (
            <div key={idx} className="border-b py-3">
              <h2 className="text-lg font-semibold">{s.subject}</h2>
              <p className="text-gray-600">
                Teachers: {s.teachers.join(", ")} | Year: {s.year}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
