import { fetchProfile, fetchMyTeam } from "../api/userApi.jsx";

export async function getCurrentUser() {
  console.log("Fetching current user profile...");
  const data = await fetchProfile();
  return data; // UserProfileDTO
}

/**
 * Returns team members (if user is leader)
 */
export async function getMyTeam() {
  const response = await fetchMyTeam();
  return response.data; // List<UserProfileDTO>
}