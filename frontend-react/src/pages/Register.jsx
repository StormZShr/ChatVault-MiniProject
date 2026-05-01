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
    <div className="min-h-screen flex items-center justify-center bg-vault-bg">
      <div className="bg-vault-surface border border-vault-border rounded-lg p-8 w-full max-w-md">

        <h1 className="font-display text-4xl text-vault-gold mb-2">🗄️ ChatVault</h1>
        <p className="text-vault-muted text-sm mb-8">Your class media, organised.</p>

        <h2 className="font-mono text-vault-text text-lg mb-6">Register</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-4">Registered! Redirecting...</p>}

        <input
          className="w-full bg-vault-bg border border-vault-border rounded px-4 py-2 mb-4 text-vault-text font-mono text-sm focus:outline-none focus:border-vault-gold"
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full bg-vault-bg border border-vault-border rounded px-4 py-2 mb-6 text-vault-text font-mono text-sm focus:outline-none focus:border-vault-gold"
          placeholder="Choose a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleRegister()}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-vault-gold text-vault-bg font-mono font-bold py-2 rounded hover:bg-vault-goldHover transition-colors disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-vault-muted text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-vault-gold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}