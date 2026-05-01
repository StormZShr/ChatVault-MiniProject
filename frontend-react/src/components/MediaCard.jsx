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
    <div className="bg-vault-surface border border-vault-border rounded-lg overflow-hidden hover:border-vault-gold transition-colors group">

      {/* Media Preview */}
      <div className="aspect-square bg-vault-bg flex items-center justify-center overflow-hidden">
        {isVideo ? (
          <video src={item.media_url} controls className="w-full h-full object-cover" />
        ) : (
          <img src={item.media_url} alt={item.filename} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-vault-text text-xs font-mono truncate" title={item.filename}>
          📁 {item.filename}
        </p>
        <p className="text-vault-muted text-xs font-mono mt-1">
          👤 {item.uploader}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-1 bg-vault-border text-vault-text py-1.5 rounded text-xs font-mono hover:bg-vault-gold hover:text-vault-bg transition-colors"
          >
            <Download size={12} /> Download
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center px-2 bg-vault-border text-red-400 rounded hover:bg-red-900 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}