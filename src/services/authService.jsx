import { loginApi, registerCompanyApi } from "../api/Authapi";

export async function registerCompany(data) {
  return await registerCompanyApi(data);
}

// src/services/authService.jsx
export async function login(email, password) {
  const response = await loginApi(email, password); 
  
  // Verify if the token is inside response.data.token
  const token = response.data.token; 

  if (token) {
    localStorage.setItem("token", token);
    console.log("Token successfully saved!");
    return response.data;
  } else {
    throw new Error("No token received");
  }
}