import { useNavigate } from "react-router-dom";
import { useFaculty } from "../../context/FacultyContext";
import { useAuth } from "../../context/AuthContext";

export default function TeacherClasses() {
  const navigate = useNavigate();
  const { faculty } = useFaculty();
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "teacher") {
    return <p className="p-6">Please log in as a teacher.</p>;
  }

  const teacher = faculty.find((f) => f.email === currentUser.email);

  if (!teacher) {
    return <p className="p-6">No classes assigned yet.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📚 My Classes</h1>
      <div className="grid grid-cols-2 gap-6">
        {teacher.subjects.map((s, i) => {
          const [subject, batch] = s.split("|");
          return (
            <div
              key={i}
              onClick={() => navigate(`/teacher/timetable/${subject}|${batch}`)}
              className="cursor-pointer bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{subject}</h2>
              <p className="text-gray-600">{batch}</p>
              <p className="text-sm text-blue-600 mt-2">
                Click to view timetable →
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
