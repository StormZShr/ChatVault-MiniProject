import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);
      const res = await client.post("/login", form);
      login(res.data.access_token, username);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-vault-bg transition-colors">
      <div className="bg-white dark:bg-vault-surface border border-slate-200 dark:border-vault-border rounded-lg p-8 w-full max-w-md shadow-sm dark:shadow-none">

        <h1 className="font-display text-4xl text-sky-500 dark:text-vault-gold mb-2">🗄️ ChatVault</h1>
        <p className="text-slate-500 dark:text-vault-muted text-sm mb-8">Your class media, organised.</p>

        <h2 className="font-mono text-slate-800 dark:text-vault-text text-lg mb-6">Login</h2>

        {error && <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>}

        <input
          className="w-full bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-4 py-2 mb-4 text-slate-800 dark:text-vault-text font-mono text-sm focus:outline-none focus:border-sky-500 dark:focus:border-vault-gold transition-colors"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-4 py-2 mb-6 text-slate-800 dark:text-vault-text font-mono text-sm focus:outline-none focus:border-sky-500 dark:focus:border-vault-gold transition-colors"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-sky-500 dark:bg-vault-gold text-white dark:text-vault-bg font-mono font-bold py-2 rounded hover:bg-sky-600 dark:hover:bg-vault-goldHover transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-slate-500 dark:text-vault-muted text-sm mt-4 text-center">
          No account?{" "}
          <Link to="/register" className="text-sky-500 dark:text-vault-gold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}