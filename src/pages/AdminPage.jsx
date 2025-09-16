import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useFaculty } from "../context/FacultyContext";
import Timetables from "./Timetables";

export default function AdminPage() {
  const { setInstitutionSubjects } = useFaculty();


  // Institution parameters
  const [classrooms, setClassrooms] = useState(5);
  const [batches, setBatches] = useState(2);
  const [subjectsPerSemester, setSubjectsPerSemester] = useState(3);
  const [maxClassesPerDay, setMaxClassesPerDay] = useState(6);
  const [classesPerSubjectPerWeek, setClassesPerSubjectPerWeek] = useState(4);
  const [classesPerSubjectPerDay, setClassesPerSubjectPerDay] = useState(1);

  // Subject management
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
      batches,
      subjectsPerSemester,
      maxClassesPerDay,
      classesPerSubjectPerWeek,
      classesPerSubjectPerDay,
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
          {/* Number of classrooms */}
          <div>
            <label className="block text-sm font-medium">Number of Classrooms</label>
            <input
              type="number"
              value={classrooms}
              onChange={(e) => setClassrooms(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
              min={1}
            />
          </div>

          {/* Number of batches */}
          <div>
            <label className="block text-sm font-medium">Number of Batches</label>
            <input
              type="number"
              value={batches}
              onChange={(e) => setBatches(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
              min={1}
            />
          </div>

          {/* Number of subjects per semester */}
          <div>
            <label className="block text-sm font-medium">Number of Subjects (per semester)</label>
            <input
              type="number"
              value={subjectsPerSemester}
              onChange={(e) => setSubjectsPerSemester(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
              min={1}
            />
          </div>

          {/* Subject names and batches */}


          <div>
            <label className="block text-sm font-medium">Subject Names &amp; Batches</label>
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

          {/* Maximum number of classes per day */}
          <div>
            <label className="block text-sm font-medium">Maximum Number of Classes per Day</label>
            <input
              type="number"
              value={maxClassesPerDay}
              onChange={(e) => setMaxClassesPerDay(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
              min={1}
            />
          </div>

          {/* Number of classes per subject per week */}
          <div>
            <label className="block text-sm font-medium">Number of Classes per Subject per Week</label>
            <input
              type="number"
              value={classesPerSubjectPerWeek}
              onChange={(e) => setClassesPerSubjectPerWeek(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
              min={1}
            />
          </div>

          {/* Number of classes per subject per day */}
          <div>
            <label className="block text-sm font-medium">Number of Classes per Subject per Day</label>
            <input
              type="number"
              value={classesPerSubjectPerDay}
              onChange={(e) => setClassesPerSubjectPerDay(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2"
              min={1}
            />
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
