import api from "./axios";

export async function loginApi(email, password) {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function registerApi(name, email, password) {
  const response = await api.post("/api/users/register", {
    name,
    email,
    password,
  });

  return response.data;
}
