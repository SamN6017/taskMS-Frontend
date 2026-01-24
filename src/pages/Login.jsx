import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authservice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await login(username, password);
    navigate("/profile");
  } catch (err) {
    setError("Invalid username or password");
  }
};

  return (
    <div>
      <h2>Login</h2>
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
