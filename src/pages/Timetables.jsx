import Sidebar from "../components/Sidebar";

export default function Timetables() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">📅 Timetables</h1>
        <p className="text-gray-600 mb-4">View timetables of all batches.</p>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500">[Timetable UI will go here]</p>
        </div>
      </main>
    </div>
  );
}
