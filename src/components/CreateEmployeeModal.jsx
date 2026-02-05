import { useState } from "react";
import { createEmployee } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

function CreateEmployeeModal({ onClose }) {
  const { user } = useAuth(); // Get currently logged-in manager

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  role: "TEAM_MEMBER",
  reportsToEmail: user?.email // Auto-assign the current user as the boss
});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createEmployee(formData);
      alert("Employee created successfully");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create employee");
    }
  }

  return (
    <div className="modal">
      <h3>Create Employee</h3>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <select name="role" onChange={handleChange}>
          <option value="TEAM_MEMBER">Team Member</option>
          <option value="TEAM_LEADER">Team Leader</option>
          <option value="MANAGER">Manager</option>
        </select>

        <input
          type="email"
          name="reportsToEmail" // Must match the key in formData
          value={formData.reportsToEmail}
          onChange={handleChange}
          placeholder="Supervisor Email"
        />

        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateEmployeeModal;
