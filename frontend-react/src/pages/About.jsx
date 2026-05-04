import Navbar from "../components/Navbar";
import { Code, Database, Layout, Server, Shield } from "lucide-react";

export default function About() {
  const techStack = [
    { name: "React + Vite", icon: <Layout size={18} />, desc: "Frontend UI" },
    { name: "FastAPI", icon: <Server size={18} />, desc: "Backend API" },
    { name: "PostgreSQL", icon: <Database size={18} />, desc: "Database" },
    { name: "ImageKit", icon: <Layout size={18} />, desc: "Media CDN" },
    { name: "JWT + bcrypt", icon: <Shield size={18} />, desc: "Authentication" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-vault-bg flex flex-col transition-colors">
      <Navbar searchQuery="" setSearchQuery={() => {}} />
      
      <div className="flex-1 max-w-7xl mx-auto w-full p-8 mt-8">
        <div className="bg-white dark:bg-vault-surface border border-slate-200 dark:border-vault-border rounded-xl p-8 shadow-sm">
          <h1 className="font-display text-4xl text-sky-500 dark:text-vault-gold mb-2">About ChatVault</h1>
          <p className="text-slate-500 dark:text-vault-muted font-mono text-sm mb-8">
            Built to solve the "Buried in the group chat" problem.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-slate-800 dark:text-vault-text font-mono text-lg border-b border-slate-200 dark:border-vault-border pb-2 mb-4">
                The Mission
              </h2>
              <p className="text-slate-500 dark:text-vault-muted text-sm leading-relaxed font-mono">
                ChatVault is a categorized media-sharing platform for classmates. Instead of important notes, 
                schedules, and memes getting lost in endless WhatsApp floods, everything here is securely archived, 
                searchable, and neatly organized by category.
              </p>
            </section>

            <section>
              <h2 className="text-slate-800 dark:text-vault-text font-mono text-lg border-b border-slate-200 dark:border-vault-border pb-2 mb-4">
                Tech Stack
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {techStack.map((tech) => (
                  <div key={tech.name} className="bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded p-4 flex flex-col gap-2 transition-colors">
                    <div className="text-sky-500 dark:text-vault-gold">{tech.icon}</div>
                    <span className="text-slate-800 dark:text-vault-text font-mono text-sm">{tech.name}</span>
                    <span className="text-slate-500 dark:text-vault-muted font-mono text-xs">{tech.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-slate-800 dark:text-vault-text font-mono text-lg border-b border-slate-200 dark:border-vault-border pb-2 mb-4">
                The Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-6 py-3 transition-colors">
                  <span className="text-sky-500 dark:text-vault-gold font-mono text-sm block mb-1">Backend Developer</span>
                  <span className="text-slate-800 dark:text-vault-text font-mono text-sm">Syed Sohrab Haider Rizvi</span>
                </div>
                <div className="bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-6 py-3 transition-colors">
                  <span className="text-sky-500 dark:text-vault-gold font-mono text-sm block mb-1">Frontend Developer</span>
                  <span className="text-slate-800 dark:text-vault-text font-mono text-sm">Anshika Mishra</span>
                </div>
                <div className="bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-6 py-3 transition-colors">
                  <span className="text-sky-500 dark:text-vault-gold font-mono text-sm block mb-1">Database Architect</span>
                  <span className="text-slate-800 dark:text-vault-text font-mono text-sm">Simran Mishra</span>
                </div>
                <div className="bg-slate-50 dark:bg-vault-bg border border-slate-200 dark:border-vault-border rounded px-6 py-3 transition-colors">
                  <span className="text-sky-500 dark:text-vault-gold font-mono text-sm block mb-1">UI Developer</span>
                  <span className="text-slate-800 dark:text-vault-text font-mono text-sm">Ali Siddique</span>
                </div>
              </div>
            </section>

            <div className="pt-4 flex justify-center">
              <a 
                href="https://github.com/StormZShr/ChatVault-MiniProject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 dark:text-vault-muted hover:text-sky-500 dark:hover:text-vault-gold font-mono text-sm transition-colors"
              >
                <Code size={16} /> View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}