import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function TeacherInfo() {
  const { currentUser, login } = useAuth();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [department, setDepartment] = useState(currentUser?.department || "Computer Science");
  const [subjects, setSubjects] = useState(currentUser?.subjects || "Data Structures, Algorithms");
  const [editing, setEditing] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    // Save to localStorage and update AuthContext
    const updatedUser = { ...currentUser, name, email, department, subjects };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    login(email, currentUser.password); // update context
    setEditing(false);
    alert("✅ Information updated!");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👤 Personal Information</h1>
      <div className="bg-white shadow-md rounded-xl p-6">
        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input className="w-full border rounded-lg px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input className="w-full border rounded-lg px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium">Department</label>
              <input className="w-full border rounded-lg px-3 py-2" value={department} onChange={e => setDepartment(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Subjects</label>
              <input className="w-full border rounded-lg px-3 py-2" value={subjects} onChange={e => setSubjects(e.target.value)} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
            <button type="button" className="ml-2 px-4 py-2 rounded-lg border" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Department:</strong> {department}</p>
            <p><strong>Subjects:</strong> {subjects}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => setEditing(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}
