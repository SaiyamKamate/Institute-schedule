import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    classrooms: "",
    batches: "",
    subjectsCount: "",
    subjects: "",
    maxClassesPerDay: "",
    subjectFrequency: "",
    faculties: "",
    avgLeaves: "",
    specialClasses: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Admin Parameters:", formData);
    alert("✅ Parameters saved!");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-2">
          🏫 Institution Details
        </h1>

        <div className="bg-white shadow-md rounded-xl p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of classrooms
              </label>
              <input
                name="classrooms"
                value={formData.classrooms}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of batches
              </label>
              <input
                name="batches"
                value={formData.batches}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of subjects
              </label>
              <input
                name="subjectsCount"
                value={formData.subjectsCount}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject names
              </label>
              <textarea
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. Math, Physics, Chemistry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max classes per day
              </label>
              <input
                name="maxClassesPerDay"
                value={formData.maxClassesPerDay}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Classes per subject (week/day)
              </label>
              <input
                name="subjectFrequency"
                value={formData.subjectFrequency}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 4 per week"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faculties available
              </label>
              <input
                name="faculties"
                value={formData.faculties}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avg leaves per faculty
              </label>
              <input
                name="avgLeaves"
                value={formData.avgLeaves}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 2"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special classes (fixed slots)
              </label>
              <textarea
                name="specialClasses"
                value={formData.specialClasses}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. Lab every Wednesday 2-4 PM"
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 shadow-md transition"
              >
                Save Parameters
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
