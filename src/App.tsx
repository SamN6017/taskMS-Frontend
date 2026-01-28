import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Login from "./pages/public/Login";
import RegisterCompany from "./pages/public/RegisterCompany";
import Profile from "./pages/common/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import NavBar from "./components/NavBar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the custom event dispatched by the axios interceptor when
    // a 401 is received. Use SPA navigation to avoid a full page reload.
    const handler = (e: Event) => {
      // If the event is a CustomEvent it may carry the backend response in
      // `detail` — otherwise log the event object.
      const detail = (e as CustomEvent)?.detail ?? e;
      console.warn("app:unauthorized received in App", detail);
      // Remove any local token and navigate to login page
      try {
        localStorage.removeItem("token");
      } catch (err) {
        /* ignore */
      }
      navigate("/login");
    };

    window.addEventListener("app:unauthorized", handler as EventListener);
    return () => window.removeEventListener("app:unauthorized", handler as EventListener);
  }, [navigate]);

  return (
    <>
      <NavBar />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register-company" element={<RegisterCompany />} />

        {/* Protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
