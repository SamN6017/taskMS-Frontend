import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchAllProjects, createProject } from "../api/projectApi";

function Projects() {
  const { role } = useAuth(); //
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  // Access control: Only Admin/CEO can add/assign
  const isAdmin = ["ROLE_ADMIN", "CEO"].includes(role); //

  useEffect(() => {
    fetchAllProjects().then((res) => setProjects(res.data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      setShowForm(false);
      // Refresh list
      const updated = await fetchAllProjects();
      setProjects(updated.data);
    } catch (err) {
      alert("Error creating project");
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Project Management</h1>
          {isAdmin && (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              {showForm ? "Cancel" : "+ Create Project"}
            </button>
          )}
        </div>

        {/* Admin Form: Add Project */}
        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4">
              <input 
                className="p-2 border rounded-md"
                placeholder="Project Name"
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                required
              />
              <textarea 
                className="p-2 border rounded-md"
                placeholder="Description"
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              />
              <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
                Save Project
              </button>
            </form>
          </div>
        )}

        {/* Project List Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">Project Name</th>
                <th className="p-4">Description</th>
                {isAdmin && <th className="p-4 text-center">Management</th>}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold">{p.name}</td>
                  <td className="p-4 text-slate-600">{p.description || "No description"}</td>
                  {isAdmin && (
                    <td className="p-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Assign Staff
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projects;