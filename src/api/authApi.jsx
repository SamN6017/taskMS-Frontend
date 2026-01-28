import axios from "./axios";

// Register API (kept at same server path). Exported as `registerApi` so
// services/authService can call it without renaming.
export function registerApi(data) {
  return axios.post("/api/setup/register-company", data, { withCredentials: true });
}

// Login API: accept either a payload object or (username, password) args.
// Use relative path so axios.baseURL is applied.
export function loginApi(dataOrUsername, password) {
  const payload =
    typeof dataOrUsername === "object"
      ? dataOrUsername
      : { email: dataOrUsername, password };

  console.log("Login API called with payload:", payload);

  return axios.post("/api/auth/login", payload, { withCredentials: true });
}
