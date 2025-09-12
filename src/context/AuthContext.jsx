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
    if (email === "admin@gmail.com") role = "admin";
    const user = {
      email,
      password,
      role,
      name: email.split("@")[0],
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
