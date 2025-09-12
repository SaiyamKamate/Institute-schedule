const dummyLabs = [
  { lab: "Computer Lab 1", slots: "Mon 2-4PM, Thu 10-12AM" },
  { lab: "Electronics Lab", slots: "Tue 1-3PM, Fri 9-11AM" },
];

export default function TeacherLabs() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">🧪 Lab Rooms</h1>
      <div className="bg-white shadow-md rounded-xl p-6 space-y-3">
        {dummyLabs.map((l, idx) => (
          <div key={idx} className="border-b pb-2">
            <p><strong>{l.lab}</strong></p>
            <p>Available Slots: {l.slots}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
