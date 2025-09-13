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
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }
      const data = await response.json();
      // You may want to adjust this depending on your backend's response structure
      const user = {
        email: data.user?.email || email,
        role: data.user?.role || "teacher", // Adjust if your backend returns role
        name: data.user?.user_metadata?.name || email.split("@")[0],
        token: data.session?.access_token,
      };
      setCurrentUser(user);
      return user;
    } catch (err) {
      throw err;
    }
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
