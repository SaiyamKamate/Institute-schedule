import { useState } from "react";

export default function TeacherLeaves() {
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`✅ Leave requested for ${leaveDate}: ${reason}`);
    setLeaveDate("");
    setReason("");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🗓️ Apply for Leave</h1>
      <div className="bg-white shadow-md rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for leave"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
