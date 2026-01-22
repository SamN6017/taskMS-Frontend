import { loginApi,registerApi } from "../api/Authapi";

export async function login(username, password) {
  const data = await loginApi(username, password);
  const token = data.token;

  if (!token) {
    throw new Error("Token missing");
  }

  localStorage.setItem("token", token);
}

export async function register(username, email, password) {
  await registerApi(username, email, password);
}
