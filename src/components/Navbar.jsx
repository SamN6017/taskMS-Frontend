import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, role, logout, loading } = useAuth(); //
  const navigate = useNavigate();

  function handleLogout() {
    logout(); //
    navigate("/login");
  }

  // 1. Prevent rendering links while checking session status
  if (loading) {
    return (
      <nav style={styles.nav}>
        <h3 style={styles.logo}>TaskMS</h3>
        <div style={styles.spinner}>Loading...</div> 
      </nav>
    );
  }

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>TaskMS</h3>

      <div style={styles.links}>
        {!isAuthenticated && ( //
          <>
            <Link to="/login">Login</Link>
            <Link to="/register-company">Register Company</Link>
          </>
        )}

        {isAuthenticated && ( //
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/tasks">Tasks</Link>

            {/* Ensure these role strings match your backend exactly (e.g., "ROLE_ADMIN") */}
            {["CEO", "MANAGER", "TEAM_LEADER", "ROLE_ADMIN"].includes(role) && (
              <Link to="/projects">Projects</Link>
            )}

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    background: "#0f172a",
    color: "white"
  },
  logo: { margin: 0 },
  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center"
  },
  spinner: {
    fontSize: "0.9rem",
    fontStyle: "italic",
    opacity: 0.8
  }
};

export default Navbar;