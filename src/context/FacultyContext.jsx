import { createContext, useContext, useState, useEffect } from "react";

const FacultyContext = createContext();


export function FacultyProvider({ children }) {
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Fetch faculty list from backend
  useEffect(() => {
    fetch("http://localhost:8000/faculty_list")
      .then((res) => res.json())
      .then((data) => {
        // subjects may be comma-separated string, convert to array
        const fac = (data.faculty || []).map(f => ({
          ...f,
          subjects: typeof f.subjects === "string" && f.subjects.length > 0 ? f.subjects.split(",") : (f.subjects || [])
        }));
        setFaculty(fac);
      });
    fetch("http://localhost:8000/subject_names")
      .then((res) => res.json())
      .then((data) => setSubjects(data.subjects || []));
  }, []);

  async function assignSubject(teacherId, subjectName) {
    // Find subject id by name
    const subjectRes = await fetch("http://localhost:8000/subject_names");
    const subjectData = await subjectRes.json();
    // You may want to cache this in state for efficiency
    const allSubjects = subjectData.subjects || [];
    // Fetch all subject objects from backend for id lookup
    const subjectObjRes = await fetch("http://localhost:8000/subjects");
    const subjectObjs = await subjectObjRes.json();
    const subject = (subjectObjs.subjects || []).find(s => s.name === subjectName);
    if (!subject) return;
    // Call backend to assign subject
    await fetch("http://localhost:8000/assign_subject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacher_id: teacherId, subject_id: subject.id })
    });
    // Optionally update local state (fetch assignments again or append)
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
