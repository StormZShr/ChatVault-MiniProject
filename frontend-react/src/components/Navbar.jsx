import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; 
import { LogOut, Search, Info } from "lucide-react"; 

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-vault-surface/80 backdrop-blur-md border-b border-vault-border/50 px-6 py-4 flex justify-between items-center shadow-lg shadow-black/20">
      
      <div className="w-64 shrink-0"> 
        <Link to="/">
          <h1 className="font-display text-2xl text-vault-gold hover:text-vault-goldHover transition-colors">🗄️ ChatVault</h1>
        </Link>
        <p className="text-vault-muted text-xs font-mono">Your class media, organised.</p>
      </div>

      <div className="flex-1 max-w-xl mx-8 relative">
        {setSearchQuery && (
          <>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-vault-muted" />
            </div>
            <input
              type="text"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by filename or uploader..."
              className="w-full bg-vault-bg/50 border border-vault-border rounded-lg pl-10 pr-4 py-2 text-vault-text font-mono text-sm focus:outline-none focus:border-vault-gold focus:bg-vault-bg transition-colors"
            />
          </>
        )}
      </div>

      <div className="min-w-fit flex justify-end items-center gap-4">

        <span className="text-vault-muted text-sm font-mono whitespace-nowrap">
          👤 {username}
        </span>

        <Link 
          to="/about"
          className="flex items-center gap-1 text-vault-muted hover:text-vault-gold text-sm font-mono transition-colors border-l border-vault-border pl-4"
        >
          <Info size={14} /> About
        </Link>
        
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