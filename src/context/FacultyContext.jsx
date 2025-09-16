import { createContext, useContext, useState } from "react";

const FacultyContext = createContext();

const initialFaculty = [
  { id: 1, name: "Dr. Sharma", email: "teacher1@gmail.com", subjects: ["Math|CSE 1st Year", "Chemistry|CSE 2nd Year"] },
  { id: 2, name: "Ms. Kapoor", email: "teacher2@gmail.com", subjects: ["Physics|CSE 1st Year"] },
];

export function FacultyProvider({ children }) {
  const [faculty, setFaculty] = useState(initialFaculty);
  // Pre-populate with demo subjects and batches
  const [subjects, setSubjects] = useState([
    { subject: "Math", batch: "CSE 1st Year" },
    { subject: "Physics", batch: "CSE 1st Year" },
    { subject: "Chemistry", batch: "CSE 2nd Year" },
  ]);

  function assignSubject(teacherId, subject) {
    setFaculty((prev) =>
      prev.map((t) =>
        t.id === teacherId && !t.subjects.includes(subject)
          ? { ...t, subjects: [...t.subjects, subject] }
          : t
      )
    );
  }

  function setInstitutionSubjects(list) {
    setSubjects(list);
  }

  return (
    <FacultyContext.Provider value={{ faculty, assignSubject, subjects, setInstitutionSubjects }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  return useContext(FacultyContext);
}
