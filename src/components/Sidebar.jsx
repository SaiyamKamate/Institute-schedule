import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    alert("✅ Logged out!");
    navigate("/login");
  }

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between">
      <div>
        {/* Admin Info */}
        <div className="flex flex-col items-center py-6 border-b border-blue-700">
          {/* Profile Picture: show only if set in currentUser (admin) */}
          {currentUser?.profile_picture ? (
            <img
              src={currentUser.profile_picture}
              alt="Admin"
              className="w-16 h-16 rounded-full border-2 border-white shadow-md"
            />
          ) : null}
          {/* Placeholder for future profile picture upload */}
          {/* <button className="mt-2 text-xs text-blue-200 underline">Set Profile Picture</button> */}
          <h2 className="mt-3 font-semibold">Admin Name</h2>
          <p className="text-sm text-blue-200">admin@gmail.com</p>
        </div>

        {/* Sidebar menu */}
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition"
              >
                🏫 Institution Details
              </Link>
            </li>
            <li>
              <Link
                to="/timetables"
                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                📅 Timetables
              </Link>
            </li>
            <li>
              <Link
                to="/faculty"
                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                👨‍🏫 Faculty List
              </Link>
            </li>
            <li>
              <Link
                to="/subjects"
                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                📚 Subject List
              </Link>
            </li>
            <li>
              <Link
                to="/leaves"
                className="block px-3 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                📝 Leave Requests
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
