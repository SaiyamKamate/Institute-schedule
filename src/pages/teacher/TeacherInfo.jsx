import { useAuth } from "../../context/AuthContext";

export default function TeacherInfo() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">👤 Personal Information</h1>
      <div className="bg-white shadow-md rounded-xl p-6">
        <p><strong>Name:</strong> {currentUser.name || "-"}</p>
        <p><strong>Email:</strong> {currentUser.email || "-"}</p>
        <p><strong>Department:</strong> {currentUser.department || "-"}</p>
        <p><strong>Subjects:</strong> {currentUser.subjects || "-"}</p>
      </div>
    </div>
  );
}
