import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, role, logout, loading } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-slate-900 text-white shadow-lg">
      <h3 className="text-2xl font-bold tracking-tight text-blue-400">TaskMS</h3>

      <div className="flex items-center gap-6">
        {!isAuthenticated && !loading && (
          <>
            <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
            <Link to="/register-company" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition">Get Started</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>
            <Link to="/tasks" className="hover:text-blue-400 transition">Tasks</Link>
            
            {/* Added My Team Link */}
            <Link to="/my-team" className="hover:text-blue-400 transition text-yellow-400 font-medium">My Team</Link>

            {["CEO", "MANAGER", "ROLE_ADMIN"].includes(role) && (
              <Link to="/projects" className="hover:text-blue-400 transition">Projects</Link>
            )}

            <button 
              onClick={handleLogout}
              className="ml-4 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;