// src/pages/teacher/TeacherLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function TeacherLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(); // clear session from AuthContext
    alert("✅ Teacher logged out!");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between">
        <div>
          {/* Teacher Info */}
          <div className="flex flex-col items-center py-6 border-b border-blue-700">
            {/* Profile Picture: show only if set in currentUser */}
            {currentUser?.profile_picture ? (
              <img
                src={currentUser.profile_picture}
                alt="Teacher"
                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
              />
            ) : null}
            {/* Placeholder for future profile picture upload */}
            {/* <button className="mt-2 text-xs text-blue-200 underline">Set Profile Picture</button> */}
            <h2 className="mt-3 font-semibold">
              {currentUser?.name || "Teacher"}
            </h2>
            <p className="text-sm text-blue-200">
              {currentUser?.email || "teacher@gmail.com"}
            </p>
          </div>

          {/* Sidebar Links */}
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li>
                <NavLink
                  to="/teacher/info"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-600"
                    }`
                  }
                >
                  👤 Personal Information
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teacher/classes"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-600"
                    }`
                  }
                >
                  📚 Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teacher/leaves"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-600"
                    }`
                  }
                >
                  🗓️ Holidays
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teacher/labs"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-600"
                    }`
                  }
                >
                  🧪 Lab Rooms
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teacher/timetable"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-600"
                    }`
                  }
                >
                  🗒️ My Timetable
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet /> {/* renders nested teacher pages */}
      </main>
    </div>
  );
}
