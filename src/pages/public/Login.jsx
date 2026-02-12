import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Added loading state toggle
    try {
      const data = await login(formData.email, formData.password);
      console.log("Login response:", data.role);
      setUser(data);
      
      if (data && data.token) {
        await refreshUser();
        navigate("/profile");
        return;
      }
      if (localStorage.getItem("token")) {
        navigate("/profile");
        return;
      }
      setError("Login succeeded but role/redirect info was missing.");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      {/* Container Card */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Log in to manage your team and projects</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
              type="email"
              name="email"
              placeholder="name@company.com"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg 
            ${loading 
              ? "bg-slate-700 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;