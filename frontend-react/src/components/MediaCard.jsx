import { Trash2, Download } from "lucide-react";
import client from "../api/client";

export default function MediaCard({ item, onDelete }) {
  const isVideo = ["mp4", "mov", "avi"].some(ext =>
    item.filename.toLowerCase().endsWith(ext)
  );

  const handleDownload = async () => {
    const res = await fetch(item.media_url);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    await client.delete(`/media/${item.id}`);
    onDelete(item.id);
  };

  return (
    <div className="bg-white dark:bg-vault-surface border border-slate-200 dark:border-vault-border rounded-lg overflow-hidden hover:border-sky-500 dark:hover:border-vault-gold transition-colors group shadow-sm dark:shadow-none">

      {/* Media Preview */}
      <div className="aspect-square bg-slate-50 dark:bg-vault-bg flex items-center justify-center overflow-hidden transition-colors">
        {isVideo ? (
          <video src={item.media_url} controls className="w-full h-full object-cover" />
        ) : (
          <img src={item.media_url} alt={item.filename} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-slate-800 dark:text-vault-text text-xs font-mono truncate transition-colors" title={item.filename}>
          📁 {item.filename}
        </p>
        <p className="text-slate-500 dark:text-vault-muted text-xs font-mono mt-1 transition-colors">
          👤 {item.uploader}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-1 bg-slate-100 dark:bg-vault-border text-slate-800 dark:text-vault-text py-1.5 rounded text-xs font-mono hover:bg-sky-500 hover:text-white dark:hover:bg-vault-gold dark:hover:text-vault-bg transition-colors"
          >
            <Download size={12} /> Download
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center px-2 bg-slate-100 dark:bg-vault-border text-red-500 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}