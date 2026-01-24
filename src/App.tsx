import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/public/Login";
import RegisterCompany from "./pages/public/RegisterCompany";
import Profile from "./pages/common/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
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
  );
}

export default App;
