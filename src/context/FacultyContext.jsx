import { createContext, useContext, useState } from "react";

const FacultyContext = createContext();

const initialFaculty = [
  { id: 1, name: "Dr. Sharma", email: "sharma@inst.edu", subjects: [] },
  { id: 2, name: "Prof. Patel", email: "patel@inst.edu", subjects: [] },
];

export function FacultyProvider({ children }) {
  const [faculty, setFaculty] = useState(initialFaculty);
  const [subjects, setSubjects] = useState([]); // subjects from AdminPage

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
