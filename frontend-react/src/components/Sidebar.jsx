import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import client from "../api/client";

export default function Sidebar({ onUploadSuccess }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const onDrop = useCallback(accepted => {
    setFiles(accepted);
    setMessage(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: true
  });

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    setMessage(null);

    try {
      for (const file of files) {
        const form = new FormData();
        form.append("files", file);

        await client.post("/upload", form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
      }
      
      setMessage({ type: "success", text: `✅ ${files.length} file(s) auto-categorized!` });
      setFiles([]);
      onUploadSuccess(); 
    } catch (err) {
      setMessage({ type: "error", text: "Upload failed. Try again." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside className="w-72 bg-white dark:bg-vault-surface border border-slate-200 dark:border-vault-border/80 rounded-xl ml-6 my-6 p-6 flex flex-col gap-6 sticky top-[calc(73px+24px)] h-[calc(100vh-73px-48px)] overflow-y-auto shadow-sm transition-colors">
      <div>
        <h2 className="font-mono text-purple-500 dark:text-vault-gold font-bold text-sm uppercase tracking-widest mb-6">
          Upload Media
        </h2>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-4
            ${isDragActive
              ? "border-purple-500 bg-sky-50 dark:border-vault-gold dark:bg-vault-gold/10"
              : "border-slate-300 dark:border-vault-border hover:border-purple-500 dark:hover:border-vault-gold"
            }`}
        >
          <input {...getInputProps()} />
          <Upload size={24} className="mx-auto text-slate-400 dark:text-vault-muted mb-2" />
          {files.length > 0 ? (
            <p className="text-purple-500 dark:text-vault-gold text-xs font-mono">{files.length} file(s) selected</p>
          ) : (
            <p className="text-slate-500 dark:text-vault-muted text-xs font-mono">
              {isDragActive ? "Drop here..." : "Drag & drop or click to select"}
            </p>
          )}
        </div>

        {/* Selected files list */}
        {files.length > 0 && (
          <ul className="mb-4 space-y-1">
            {files.map(f => (
              <li key={f.name} className="text-slate-500 dark:text-vault-muted text-xs font-mono truncate">
                📎 {f.name}
              </li>
            ))}
          </ul>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !files.length}
          className="w-full bg-purple-500 dark:bg-vault-gold text-white dark:text-vault-bg font-mono font-bold py-2 rounded hover:bg-sky-600 dark:hover:bg-vault-goldHover transition-colors disabled:opacity-40"
        >
          {uploading ? "Analyzing & Sorting..." : "Upload"}
        </button>

        {/* Message */}
        {message && (
          <p className={`text-xs font-mono mt-3 ${message.type === "success" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
            {message.text}
          </p>
        )}
      </div>
    </aside>
  );
}