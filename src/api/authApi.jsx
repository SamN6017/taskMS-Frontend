import axios from "./axios";

export function registerCompanyApi(data) {
  return axios.post("/api/setup/register-company", data);
}

export function loginApi(data) {
  return axios.post("/api/auth/login", data);
}
