import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData.email, formData.password); // This now returns response.data
      // Log response to help debug shape (token, role, user etc.)
      console.log("Login response:", data.role);
      setUser(data); // Update user context with logged-in user data
      // Some backends return { token, user: { role } } or just { token }
      if (data && data.token) {
        navigate("/profile");
        return;
      }
      if (localStorage.getItem("token")) {
        navigate("/profile");
        return;
      }
      // If we reach here, login succeeded but we couldn't determine a redirect target
      setError("Login succeeded but role/redirect info was missing.");
  } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials and try again.");
  }
};

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "320px",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  error: { color: "red" }
};

export default Login;
