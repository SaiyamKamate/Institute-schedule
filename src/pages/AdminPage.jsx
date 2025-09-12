import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useFaculty } from "../context/FacultyContext";
import Timetables from "./Timetables";

export default function AdminPage() {
  const { setInstitutionSubjects } = useFaculty();

  const [classrooms, setClassrooms] = useState(0);
  const [capacity, setCapacity] = useState(60);
  const [batches, setBatches] = useState(0);
  const [maxClassesPerDay, setMaxClassesPerDay] = useState(7);
  const [classesPerWeek, setClassesPerWeek] = useState(4);

  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [newBatch, setNewBatch] = useState("");

  const [specialClasses, setSpecialClasses] = useState([]);
  const [newSpecialClass, setNewSpecialClass] = useState("");

  function addSubject() {
    if (!newSubject || !newBatch) return;
    setSubjects([...subjects, { subject: newSubject, batch: newBatch }]);
    setNewSubject("");
    setNewBatch("");
  }

  function removeSubject(index) {
    setSubjects(subjects.filter((_, i) => i !== index));
  }

  function addSpecialClass() {
    if (!newSpecialClass) return;
    setSpecialClasses([...specialClasses, newSpecialClass]);
    setNewSpecialClass("");
  }

  function removeSpecialClass(index) {
    setSpecialClasses(specialClasses.filter((_, i) => i !== index));
  }

  function handleSave() {
    const data = {
      classrooms,
      capacity,
      batches,
      maxClassesPerDay,
      classesPerWeek,
      subjects,
      specialClasses,
    };
    console.log("Institution details:", data);
    setInstitutionSubjects(subjects); // ✅ update FacultyContext
    alert("✅ Institution details saved!");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">🏫 Institution Details</h1>

        <div className="bg-white shadow-md rounded-xl p-8 space-y-6">

          <div>
            <label className="block text-sm font-medium">Number of Classrooms</label>
            <input
              type="number"
              value={classrooms}
              onChange={(e) => setClassrooms(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Classes per Subject (per week)</label>
            <input
              type="number"
              value={classesPerWeek}
              onChange={(e) => setClassesPerWeek(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium">Subjects</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Subject name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Batch (e.g. CSE 1st Year)"
                value={newBatch}
                onChange={(e) => setNewBatch(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button
                type="button"
                onClick={addSubject}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {subjects.map((s, i) => (
                <li key={i} className="flex justify-between items-center border p-2 rounded-lg">
                  <span>{s.subject} → {s.batch}</span>
                  <button
                    onClick={() => removeSubject(i)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Classes */}
          <div>
            <label className="block text-sm font-medium">Special Classes (fixed slots)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. Lab every Wed 2-4 PM"
                value={newSpecialClass}
                onChange={(e) => setNewSpecialClass(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button
                type="button"
                onClick={addSpecialClass}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {specialClasses.map((sc, i) => (
                <li key={i} className="flex justify-between items-center border p-2 rounded-lg">
                  <span>{sc}</span>
                  <button
                    onClick={() => removeSpecialClass(i)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800"
          >
            Save Institution Details
          </button>
        </div>
        {/* Timetables section removed as requested */}
      </main>
    </div>
  );
}
