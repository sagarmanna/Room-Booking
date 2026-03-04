"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email) => {
    const userObj = { email };
    localStorage.setItem("user", JSON.stringify(userObj));
    document.cookie = "user=loggedIn";
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("user");
    document.cookie = "user=; Max-Age=0";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);