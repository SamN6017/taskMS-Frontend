import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create a function that components can call to refresh user data
  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return null;
    }
    try {
      const data = await getCurrentUser();
      setUser(data);
      return data;
    } catch (error) {
      setUser(null);
      return null;
    }
  };

  // On mount try to load the current user if a token is present. Ensure
  // `loading` is set to false afterwards so ProtectedRoute won't hang.
  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        if (mounted) setUser(null);
        if (mounted) setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        if (mounted) setUser(data);
      } catch (err) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const isAuthenticated = !!user;

  // Logout helper: clear local session and user state. Components (like
  // NavBar) may call logout() and then navigate to the login page.
  const logout = () => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      /* ignore */
    }
    setUser(null);
  };

  const role = user?.role ?? null;

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated, role, refreshUser, logout }}>
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
