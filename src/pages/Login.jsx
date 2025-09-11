import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // temporary behaviour for MVP:
    alert(`Login attempt — role: ${role}\nemail: ${email}`);
    // TODO: replace with real auth / routing later
  }

  return (
    <div className="flex h-screen items-center justify-center bg-blue-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Institute Scheduler
        </h1>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-lg font-medium ${
              role === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-lg font-medium ${
              role === "teacher"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login as {role === "admin" ? "Admin" : "Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
}
