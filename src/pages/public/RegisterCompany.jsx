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
console.log("Current Form Data:", formData);
  return (
    <div>
      <h2>Create Your Company</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

    <form onSubmit={handleSubmit}>
    <input
        name="companyName" // Matches state key
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        required
    />

  <input
    name="adminName" // Changed from "name" to match state
    placeholder="Admin Name"
    value={formData.adminName}
    onChange={handleChange}
    required
  />

  <input
    name="adminEmail" // Changed from "email" to match state
    type="email"
    placeholder="Admin Email"
    value={formData.adminEmail}
    onChange={handleChange}
    required
  />

  <input
    name="adminPassword" // Changed from "password" to match state
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

export default RegisterCompany;
