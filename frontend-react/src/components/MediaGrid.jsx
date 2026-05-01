import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import client from "../api/client";
import MediaCard from "./MediaCard";

const CATEGORIES = ["notes", "information", "funny"];
const CATEGORY_LABELS = {
  notes: "📒 Notes",
  information: "ℹ️ Information",
  funny: "😂 Funny Media"
};

// 1. We receive searchQuery as a prop from Vault.jsx
export default function MediaGrid({ refreshTrigger, searchQuery }) {
  const [activeTab, setActiveTab] = useState("notes");
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(false);

  // Note: The local 'search' state that used to be here has been deleted.

  const fetchMedia = async (cat) => {
    setLoading(true);
    try {
      const res = await client.get(`/media?category=${cat}`);
      setMedia(prev => ({ ...prev, [cat]: res.data }));
    } catch {
      setMedia(prev => ({ ...prev, [cat]: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(activeTab);
  }, [activeTab, refreshTrigger]);

  const handleDelete = (id) => {
    setMedia(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(item => item.id !== id)
    }));
  };

  // 2. The filter logic now uses 'searchQuery' instead of the old 'search' state
  const filtered = (media[activeTab] || []).filter(item =>
    !searchQuery ||
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.uploader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-6">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-vault-border">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            // Note: Removed the setSearch("") reset from onClick since the state moved
            onClick={() => setActiveTab(cat)} 
            className={`px-4 py-2 font-mono text-sm transition-colors border-b-2 -mb-px
              ${activeTab === cat
                ? "border-vault-gold text-vault-gold"
                : "border-transparent text-vault-muted hover:text-vault-text"
              }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Note: The old <input> field that was sitting here has been completely deleted. */}

      {/* Grid */}
      {loading ? (
        <p className="text-vault-muted font-mono text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-vault-muted font-mono text-sm">
          {/* 3. Updated empty state message to reflect searchQuery */}
          {searchQuery ? `🔎 No results for "${searchQuery}"` : "📭 Nothing here yet. Upload something!"}
        </div>
      ) : (
        <>
          {searchQuery && (
            <p className="text-vault-muted text-xs font-mono mb-4">
              {filtered.length} result(s) for "{searchQuery}"
            </p>
          )}
          
          {/* Animated Grid using Framer Motion */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                layout
              >
                <MediaCard item={item} onDelete={handleDelete} />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}