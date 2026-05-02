import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import client from "../api/client";

export default function Sidebar({ onUploadSuccess }) {
  // 1. Notice the category state is completely gone
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
        // 2. We no longer append a category here!

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
    // Preserved our floating, bordered sidebar aesthetic
    <aside className="w-72 bg-vault-surface border border-vault-border/80 rounded-xl ml-6 my-6 p-6 flex flex-col gap-6 sticky top-[calc(73px+24px)] h-[calc(100vh-73px-48px)] overflow-y-auto shadow-sm">
      <div>
        <h2 className="font-mono text-vault-gold font-bold text-sm uppercase tracking-widest mb-6">
          Upload Media
        </h2>

        {/* 3. The <select> dropdown that was here has been completely deleted */}

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-4
            ${isDragActive
              ? "border-vault-gold bg-vault-gold/10"
              : "border-vault-border hover:border-vault-gold"
            }`}
        >
          <input {...getInputProps()} />
          <Upload size={24} className="mx-auto text-vault-muted mb-2" />
          {files.length > 0 ? (
            <p className="text-vault-gold text-xs font-mono">{files.length} file(s) selected</p>
          ) : (
            <p className="text-vault-muted text-xs font-mono">
              {isDragActive ? "Drop here..." : "Drag & drop or click to select"}
            </p>
          )}
        </div>

        {/* Selected files list */}
        {files.length > 0 && (
          <ul className="mb-4 space-y-1">
            {files.map(f => (
              <li key={f.name} className="text-vault-muted text-xs font-mono truncate">
                📎 {f.name}
              </li>
            ))}
          </ul>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !files.length}
          className="w-full bg-vault-gold text-vault-bg font-mono font-bold py-2 rounded hover:bg-vault-goldHover transition-colors disabled:opacity-40"
        >
          {uploading ? "Analyzing & Sorting..." : "Upload"}
        </button>

        {/* Message */}
        {message && (
          <p className={`text-xs font-mono mt-3 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {message.text}
          </p>
        )}
      </div>
    </aside>
  );
}