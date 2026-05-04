import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; 
import { LogOut, Search, Info, Sun, Moon } from "lucide-react"; 
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { username, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-vault-surface/80 backdrop-blur-md border-b border-slate-200/50 dark:border-vault-border/50 px-6 py-4 flex justify-between items-center shadow-sm dark:shadow-black/20 transition-colors">
      
      <div className="w-64 shrink-0"> 
        <Link to="/">
          <h1 className="font-display text-2xl text-purple-500 dark:text-vault-gold hover:text-sky-600 dark:hover:text-vault-goldHover transition-colors">🗄️ ChatVault</h1>
        </Link>
        <p className="text-slate-500 dark:text-vault-muted text-xs font-mono">Your class media, organised.</p>
      </div>

      <div className="flex-1 max-w-xl mx-8 relative">
        {setSearchQuery && (
          <>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400 dark:text-vault-muted" />
            </div>
            <input
              type="text"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by filename or uploader..."
              className="w-full bg-slate-100 dark:bg-vault-bg/50 border border-slate-200 dark:border-vault-border rounded-lg pl-10 pr-4 py-2 text-slate-800 dark:text-vault-text font-mono text-sm focus:outline-none focus:border-purple-500 dark:focus:border-vault-gold focus:bg-white dark:focus:bg-vault-bg transition-colors"
            />
          </>
        )}
      </div>

      <div className="min-w-fit flex justify-end items-center gap-4">
        
        <button 
          onClick={toggleTheme} 
          className="p-1.5 rounded-md text-slate-500 dark:text-vault-muted hover:bg-slate-100 dark:hover:bg-vault-border transition-colors"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <span className="text-slate-500 dark:text-vault-muted text-sm font-mono whitespace-nowrap">
          👤 {username}
        </span>

        <Link 
          to="/about"
          className="flex items-center gap-1 text-slate-500 dark:text-vault-muted hover:text-purple-500 dark:hover:text-vault-gold text-sm font-mono transition-colors border-l border-slate-200 dark:border-vault-border pl-4"
        >
          <Info size={14} /> About
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-100 dark:bg-vault-border text-slate-800 dark:text-vault-text px-3 py-1.5 rounded hover:bg-purple-500 dark:hover:bg-vault-gold hover:text-white dark:hover:text-vault-bg transition-colors text-sm font-mono"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

    </nav>
  );
}