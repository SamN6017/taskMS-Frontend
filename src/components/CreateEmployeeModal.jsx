import { useState } from "react";
import { createEmployee } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

function CreateEmployeeModal({ onClose }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "TEAM_MEMBER",
    reportsToEmail: user?.email 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">Add New Employee</h3>
          <p className="text-slate-400 text-sm">Register a new team member to your hierarchy.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            name="name" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required 
          />
          <input 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            name="email" 
            placeholder="Work Email" 
            onChange={handleChange} 
            required 
          />
          <input 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            name="password" 
            type="password" 
            placeholder="Initial Password" 
            onChange={handleChange} 
            required 
          />

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Assigned Role</label>
            <select 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
              name="role" 
              onChange={handleChange}
            >
              <option value="TEAM_MEMBER">Team Member</option>
              <option value="TEAM_LEADER">Team Leader</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Reporting Manager</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-400 cursor-not-allowed italic"
              type="email"
              name="reportsToEmail"
              value={formData.reportsToEmail}
              readOnly
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployeeModal;