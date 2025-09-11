import { useState } from "react";

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
    alert("✅ Parameters saved! (Check console for details)");
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        {/* Admin Info */}
        <div className="flex flex-col items-center py-6 border-b border-blue-700">
          <img
            src="https://i.pravatar.cc/100"
            alt="Admin"
            className="w-16 h-16 rounded-full border-2 border-white shadow-md"
          />
          <h2 className="mt-3 font-semibold">Admin Name</h2>
          <p className="text-sm text-blue-200">admin@gmail.com</p>
        </div>

        {/* Sidebar menu */}
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition">
                Institution Details
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-2">
          🏫 Institution Details
        </h1>

        <div className="bg-white shadow-md rounded-xl p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Row 1 */}
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

            {/* Row 2 */}
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

            {/* Row 3 */}
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

            {/* Row 4 */}
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
                Avg leaves per faculty (month)
              </label>
              <input
                name="avgLeaves"
                value={formData.avgLeaves}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="e.g. 2"
              />
            </div>

            {/* Row 5 */}
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

            {/* Submit button */}
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
