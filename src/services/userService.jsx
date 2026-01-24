import { fetchProfile } from "../api/userApi";

export async function getProfile() {
  return await fetchProfile();
}
