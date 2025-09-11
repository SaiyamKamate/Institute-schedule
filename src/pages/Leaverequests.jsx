import { useState } from "react";
import Sidebar from "../components/Sidebar";

const dummyRequests = [
  { name: "Prof. Patel", date: "2025-09-12", reason: "Medical leave" },
  { name: "Dr. Sharma", date: "2025-09-15", reason: "Conference" },
];

export default function Leaverequests() {
  const [requests, setRequests] = useState(dummyRequests);

  function handleDecision(idx, approved) {
    const req = requests[idx];
    alert(
      approved
        ? `✅ Approved leave for ${req.name}`
        : `❌ Declined leave for ${req.name}`
    );
    setRequests(requests.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">📝 Leave Requests</h1>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          {requests.length === 0 && (
            <p className="text-gray-500">No leave requests right now.</p>
          )}

          {requests.map((r, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-gray-600">
                  {r.date} — {r.reason}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleDecision(idx, true)}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(idx, false)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

