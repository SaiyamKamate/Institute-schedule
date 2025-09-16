
import { useFaculty } from "../../context/FacultyContext";
import { useAuth } from "../../context/AuthContext";
import { useTimetable } from "../../context/TimetableContext";
import TimetableGrid from "../../components/TimetableGrid";
import { useState } from "react";


export default function TeacherClasses() {
  const { faculty } = useFaculty();
  const { currentUser } = useAuth();
  const { addClass } = useTimetable();
  const [showForm, setShowForm] = useState(null); // classId for which to show form
  const [form, setForm] = useState({ day: "Monday", time: "8:00 AM", subject: "", teacher: currentUser?.name || "" });
  const [selectedClass, setSelectedClass] = useState("");

  if (!currentUser || currentUser.role !== "teacher") {
    return <p className="p-6">Please log in as a teacher.</p>;
  }

  const teacher = faculty.find((f) => f.email === currentUser.email);
  if (!teacher) {
    return <p className="p-6">No classes assigned yet.</p>;
  }

  function handleSchedule(classId) {
    setShowForm(classId);
    setForm({ day: "Monday", time: "8:00 AM", subject: classId.split("|")[0], teacher: currentUser.name });
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e, classId) {
    e.preventDefault();
    const ok = addClass(classId, form.day, form.time, form.subject, form.teacher);
    if (ok) {
      setShowForm(null);
    }
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "8:00 AM", "9:00 AM",
    "10:30 AM", "11:30 AM", "12:30 PM",
    "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM", "5:30 PM",
  ];

  // Class selector logic
  const classOptions = teacher.subjects;
  const currentClass = selectedClass || classOptions[0] || "";

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📚 My Classes</h1>
      {classOptions.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Class</label>
          <select
            value={currentClass}
            onChange={e => { setSelectedClass(e.target.value); setShowForm(null); }}
            className="border rounded-lg px-4 py-2"
          >
            {classOptions.map((s, i) => {
              const [subject, batch] = s.split("|");
              return <option key={i} value={s}>{subject} ({batch})</option>;
            })}
          </select>
        </div>
      )}
      {currentClass && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">
            {currentClass.split("|")[0]} <span className="text-gray-500">({currentClass.split("|")[1]})</span>
          </h2>
          <button
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => handleSchedule(currentClass)}
          >
            Schedule New Class
          </button>
          {showForm === currentClass && (
            <form onSubmit={e => handleFormSubmit(e, currentClass)} className="mb-4 space-y-2 bg-blue-50 p-4 rounded-lg">
              <div>
                <label className="block text-sm font-medium">Day</label>
                <select name="day" value={form.day} onChange={handleFormChange} className="border rounded-lg px-3 py-2">
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Time</label>
                <select name="time" value={form.time} onChange={handleFormChange} className="border rounded-lg px-3 py-2">
                  {times.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input name="subject" value={form.subject} onChange={handleFormChange} className="border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Teacher</label>
                <input name="teacher" value={form.teacher} onChange={handleFormChange} className="border rounded-lg px-3 py-2" />
              </div>
              <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg">Add</button>
              <button type="button" className="ml-2 px-4 py-2 rounded-lg border" onClick={() => setShowForm(null)}>Cancel</button>
            </form>
          )}
          <TimetableGrid classId={currentClass} />
        </div>
      )}
    </div>
  );
}
