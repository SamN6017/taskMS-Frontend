import { useState } from "react";
import { registerCompany } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function RegisterCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    adminName: "",
    adminEmail: "",
    adminPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerCompany(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Create Your Company</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <input
          name="adminName"
          placeholder="Admin Name"
          value={formData.adminName}
          onChange={handleChange}
          required
        />

        <input
          name="adminEmail"
          type="email"
          placeholder="Admin Email"
          value={formData.adminEmail}
          onChange={handleChange}
          required
        />

        <input
          name="adminPassword"
          type="password"
          placeholder="Password"
          value={formData.adminPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Company"}
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
    width: "380px",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#555"
  },
  error: {
    color: "red",
    fontSize: "0.9rem"
  }
};

export default RegisterCompany;
