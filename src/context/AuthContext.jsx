import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // AuthContext.jsx
useEffect(() => {
  async function loadUser() {
    const token = localStorage.getItem("token");
    
    // Check if token exists before trying to fetch the profile
    if (!token) {
      setLoading(false);
      setUser(null);
      return; 
    }

    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error) {
      console.error("Session expired or invalid token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  loadUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
