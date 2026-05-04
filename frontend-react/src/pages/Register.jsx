import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../api/client";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);
      await client.post("/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-vault-bg transition-colors">
      <div className="bg-white dark:bg-vault-surface border border-slate-200 dark:border-vault-border rounded-lg p-8 w-full max-w-md shadow-sm dark:shadow-none">

        <h1 className="font-display text-4xl text-purple-500 dark:text-vault-gold mb-2">🗄️ ChatVault</h1>
        <p className="text-slate-500 dark:text-vault-muted text-sm mb-8">Your class media, organised.</p>

        <h2 className="font-mono text-slate-800 dark:text-vault-text text-lg mb-6">Register</h2>

        {error && <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 dark:text-green-400 text-sm mb-4">Registered! Redirecting...</p>}

        <input
          className="w-full bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-4 py-2 mb-4 text-slate-800 dark:text-vault-text font-mono text-sm focus:outline-none focus:border-purple-500 dark:focus:border-vault-gold transition-colors"
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-4 py-2 mb-6 text-slate-800 dark:text-vault-text font-mono text-sm focus:outline-none focus:border-purple-500 dark:focus:border-vault-gold transition-colors"
          placeholder="Choose a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleRegister()}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-purple-500 dark:bg-vault-gold text-white dark:text-vault-bg font-mono font-bold py-2 rounded hover:bg-sky-600 dark:hover:bg-vault-goldHover transition-colors disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-slate-500 dark:text-vault-muted text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500 dark:text-vault-gold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}