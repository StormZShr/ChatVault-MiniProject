import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MediaGrid from "../components/MediaGrid";

export default function Vault() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-vault-bg flex flex-col transition-colors">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-1">
        <Sidebar onUploadSuccess={handleUploadSuccess} />
        <MediaGrid refreshTrigger={refreshTrigger} searchQuery={searchQuery} />
      </div>
    </div>
  );
}