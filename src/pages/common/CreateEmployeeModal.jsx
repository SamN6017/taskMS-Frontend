import { useState } from "react";
import { createEmployee } from "../services/userService";

function CreateEmployeeModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "TEAM_MEMBER",
    reportsToId: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createEmployee(form);
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
          name="reportsToId"
          placeholder="Reports To (User ID)"
          onChange={handleChange}
          required
        />

        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateEmployeeModal;
