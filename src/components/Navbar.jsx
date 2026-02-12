import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-800 shadow-lg">
      <div className="flex items-center gap-10">
        <h3 className="text-2xl font-bold text-blue-500 tracking-tight">TaskMS</h3>
        
        {isAuthenticated && (
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link to="/tasks" className="text-slate-300 hover:text-white transition">Tasks</Link>
            {/* "My Team" visible to all authenticated users */}
            <Link to="/my-team" className="text-slate-300 hover:text-white transition">My Team</Link>
            
            {/* "Projects" limited to Admins/Managers */}
            {["ROLE_ADMIN", "CEO", "MANAGER"].includes(role) && (
              <Link to="/projects" className="text-slate-300 hover:text-white transition">Projects</Link>
            )}
          </div>
        )}
      </div>

      <div>
        {isAuthenticated ? (
          <button 
            onClick={() => { logout(); navigate("/login"); }}
            className="text-sm font-bold text-red-400 hover:text-red-300 transition"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-sm font-bold text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;