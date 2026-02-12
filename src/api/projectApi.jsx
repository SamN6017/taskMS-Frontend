import api from "./axios";

export const fetchAllProjects = () => {
  return api.get("/api/projects", { withCredentials: true });
};

export const createProject = (projectData) => {
  // Only Admin/CEO roles should hit this endpoint
  return api.post("/api/projects", projectData);
};

export const assignEmployeeToProject = (projectId, employeeId) => {
  return api.post(`/api/projects/${projectId}/assign/${employeeId}`);
};