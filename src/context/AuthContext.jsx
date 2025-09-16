// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { users } from "../data/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser));
    else localStorage.removeItem("currentUser");
  }, [currentUser]);

  async function login(email, password) {
    // Relaxed logic: accept any email/password
    let role = "teacher";
    let name = email.split("@")[0];
    // Use demo user name if available
    const demo = users.find(u => u.email === email);
    if (demo) {
      role = demo.role;
      name = demo.name;
    }
    if (email === "admin@gmail.com") role = "admin";
    const user = {
      email,
      password,
      role,
      name,
    };
    setCurrentUser(user);
    return user;
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
