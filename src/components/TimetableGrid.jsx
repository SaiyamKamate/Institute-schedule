import { useTimetable } from "../context/TimetableContext";

const times = [
  "8:00 AM", "9:00 AM",
  "10:30 AM", "11:30 AM", "12:30 PM",
  "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM", "5:30 PM",
];

export default function TimetableGrid({ classId }) {
  const { timetables } = useTimetable();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const schedule = timetables[classId] || {};

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-3 border text-left">Time</th>
            {days.map((day) => (
              <th key={day} className="p-3 border text-left">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="p-3 border font-medium bg-gray-50">{time}</td>
              {days.map((day) => (
                <td key={day + time} className="p-3 border h-16">
                  {schedule[day]?.[time] ? (
                    <div className="bg-blue-600 text-white rounded-lg p-2 text-sm shadow-md">
                      {schedule[day][time]}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Free</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
