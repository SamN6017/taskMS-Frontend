import { loginApi } from "../api/authApi";

export async function login(username, password) {
  const data = await loginApi(username, password);

  const token = data.token;

  if (!token) {
    throw new Error("Token missing");
  }

  localStorage.setItem("token", token);
}
