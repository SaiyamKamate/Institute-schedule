// src/context/TimetableContext.jsx
import React, { createContext, useContext, useState } from "react";

const TimetableContext = createContext();

// initial empty structure
const emptyWeek = { Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {} };

export function TimetableProvider({ children }) {
  // timetables[classId][day][time] = "Subject by Teacher"
  // Pre-populate with demo classes for one class
  const [timetables, setTimetables] = useState({
    "Math|CSE 1st Year": {
      Monday: { "8:00 AM": "Math by Dr. Sharma", "9:00 AM": "Physics by Prof. Patel" },
      Tuesday: { "10:30 AM": "Math by Dr. Sharma" },
      Wednesday: {},
      Thursday: { "1:30 PM": "Physics by Prof. Patel" },
      Friday: {},
    },
    "Chemistry|CSE 2nd Year": {
      Monday: { "8:00 AM": "Chemistry by Dr. Sharma" },
      Tuesday: {},
      Wednesday: { "9:00 AM": "Chemistry by Dr. Sharma" },
      Thursday: {},
      Friday: {},
    },
  });

  function addClass(classId, day, time, subject, teacher) {
    if (!timetables[classId]) timetables[classId] = { ...emptyWeek };

    // check slot availability
    if (timetables[classId][day]?.[time]) {
      alert("❌ Slot already taken!");
      return false;
    }

    // check daily limit
    if (Object.keys(timetables[classId][day]).length >= 7) {
      alert("❌ Max 7 sessions per day reached!");
      return false;
    }

    setTimetables((prev) => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [day]: {
          ...prev[classId][day],
          [time]: `${subject} by ${teacher}`,
        },
      },
    }));

    return true;
  }

  return (
    <TimetableContext.Provider value={{ timetables, addClass }}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetable() {
  return useContext(TimetableContext);
}