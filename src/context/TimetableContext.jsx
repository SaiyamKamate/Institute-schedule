// src/context/TimetableContext.jsx
import React, { createContext, useContext } from "react";

const TimetableContext = createContext();

const sampleTimetables = {
  "teacher1@gmail.com": [
    { day: "Monday", time: "09:00 - 10:00", subject: "Math", className: "10A" },
    { day: "Monday", time: "10:00 - 11:00", subject: "Physics", className: "10A" },
  ],
  "teacher2@gmail.com": [
    { day: "Tuesday", time: "11:00 - 12:00", subject: "English", className: "9B" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "History", className: "9B" },
  ],
};

export function TimetableProvider({ children }) {
  function getTimetableByEmail(email) {
    return sampleTimetables[email] || [];
  }

  return (
    <TimetableContext.Provider value={{ getTimetableByEmail }}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetable() {
  return useContext(TimetableContext);
}
