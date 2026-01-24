import { loginApi, registerCompanyApi } from "../api/Authapi";

export async function registerCompany(data) {
  return await registerCompanyApi(data);
}

export async function login(email, password) {
  // Wrap them in an object so the backend receives JSON keys "email" and "password"
  const response = await loginApi({ email, password }); 
  
  // Note: Your Postman output shows the key is "token", not "jwt"
  const token = response.data.token; 

  if (!token) {
    throw new Error("Token missing from server response");
  }

  localStorage.setItem("token", token);
  return response.data;
}