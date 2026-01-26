import axios from "./axios";

export function registerCompanyApi(data) {
  return axios.post("/api/setup/register-company", data, { withCredentials: true });
}

export function loginApi(data) {
    console.log("Login API called with data:", data);
return axios.post("http://localhost:8080/api/auth/login", data, { withCredentials: true });
}
