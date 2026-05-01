import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MediaGrid from "../components/MediaGrid";

export default function Vault() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // 1. Add this state

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-vault-bg flex flex-col">
      {/* 2. Pass state to Navbar */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-1">
        <Sidebar onUploadSuccess={handleUploadSuccess} />
        {/* 3. Pass state to MediaGrid */}
        <MediaGrid refreshTrigger={refreshTrigger} searchQuery={searchQuery} />
      </div>
    </div>
  );
}