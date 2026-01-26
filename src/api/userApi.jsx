import api from "./axios";

export async function fetchProfile() {
  const response = await api.get("/api/users/me", { withCredentials: true });
  console.log("Fetched profile:", response.data);
  return response.data;
}

export const fetchMyTeam = () => {
  return api.get("/api/users/my-team", { withCredentials: true });
};
