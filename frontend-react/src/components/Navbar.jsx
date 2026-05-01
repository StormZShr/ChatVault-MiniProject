import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-vault-surface/80 backdrop-blur-md border-b border-vault-border/50 px-6 py-4 flex justify-between items-center shadow-lg shadow-black/20">
      <div>
        <h1 className="font-display text-2xl text-vault-gold">🗄️ ChatVault</h1>
        <p className="text-vault-muted text-xs font-mono">Your class media, organised.</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-vault-muted text-sm font-mono">👤 {username}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-vault-border text-vault-text px-3 py-1.5 rounded hover:bg-vault-gold hover:text-vault-bg transition-colors text-sm font-mono"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </nav>
  );
}