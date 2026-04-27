import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, FolderClosed, LogOut, MessageSquare, Plus, Search, Sun, Moon, Sparkle, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../Sidebar/SidebarItem";
import ProfileModel from "../models/ProfileModel";

export default function Sidebar({
  user, setSidebarOpen, chats, projects,
  fetchChats, fetchProjects, fetchProjectChats,
  projectChats = [], projectChatsProjectId,
  activeChatId, setActiveChatId,
  activeProjectId, setActiveProjectId,
  activeProjectChatId, setActiveProjectChatId,
  onNewChat, onNewProject, onNewProjectChat, onOpenSettings
}) {
  const navigate = useNavigate();
  const profileref = useRef(null);
  const [profileModel, setProfileModel] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renamingValue, setRenamingValue] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [projectOpen, setProjectOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [hoverIcon, setHoverIcon] = useState(false);
  const [activeAI, setActiveAI] = useState("text");

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.contains('light');
    const newTheme = isLight ? 'dark' : 'light';

    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    localStorage.setItem('theme', newTheme);
    setIsDarkMode(newTheme === 'dark');
    setProfileModel(false);
  };

  // Search logic
  const searchLower = searchTerm.trim().toLowerCase();
  const filteredChats = searchLower ? chats.filter(c => c.name?.toLowerCase().includes(searchLower)) : chats;
  const filteredProjects = searchLower ? projects.filter(p => p.name?.toLowerCase().includes(searchLower)) : projects;

  useEffect(() => {
    if (activeProjectId) setExpandedProjects(new Set([activeProjectId]));
  }, [activeProjectId]);

  // Click outside to close profile model
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileref.current && !profileref.current.contains(event.target)) {
        setProfileModel(false);
      }
    };
    if (profileModel) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileModel]);

  const handleRename = async ({ projectId, chatId, projectChatId, newname }) => {
    if (!newname.trim()) return;
    if (projectId) await supabase.from("projects").update({ project_name: newname.trim() }).eq("id", projectId);
    if (chatId) await supabase.from("chats").update({ title: newname.trim() }).eq("id", chatId);
    if (projectChatId) await supabase.from("project-chats").update({ name: newname.trim() }).eq("id", projectChatId);

    if (projectId) fetchProjects();
    if (chatId) fetchChats();
    if (projectChatId) fetchProjectChats?.(activeProjectId);
    setRenamingId(null);
  };

  const handleDelete = async ({ projectId, chatId, projectChatId }) => {
    if (projectId) {
      await supabase.from('projects').delete().eq('id', projectId);
      fetchProjects();
      if (activeProjectId === projectId) setActiveProjectId(null);
    }
    if (chatId) {
      await supabase.from('chats').delete().eq('id', chatId);
      fetchChats();
      if (activeChatId === chatId) setActiveChatId(null);
    }
    if (projectChatId) {
      await supabase.from('project-chats').delete().eq('id', projectChatId);
      fetchProjectChats?.(activeProjectId);
      if (activeProjectChatId === projectChatId) setActiveProjectChatId(null);
    }
  };

  return (
    <motion.div
      className="flex flex-col h-full select-none pt-2 md:pt-0"
      style={{ color: "var(--paper)" }}
    >
      {/* Header */}
      <div className="px-5 pb-5 flex items-center justify-between">
        <div
          onClick={() => setSidebarOpen(false)}
          onMouseEnter={() => setHoverIcon(true)}
          onMouseLeave={() => setHoverIcon(false)}
          className="flex items-center justify-between gap-3 px-3 py-0 md:py-2.5 rounded-xl cursor-pointer transition-all"
          onMouseEnterCapture={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
          onMouseLeaveCapture={e => e.currentTarget.style.background = "transparent"}
        >
          <AnimatePresence mode="wait">
            {hoverIcon ? (
              <motion.div
                key="sparkle"
                className="pb-2"
                initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                <Sparkle size={18} style={{ color: "#8BA88E" }} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                <Menu size={18} style={{ color: "var(--txt-secondary)" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex">
          <div onClick={() => setActiveAI("text")} className={`text-xs font-bold border border-gray-500 rounded-l-md px-2 py-1 ${activeAI === "text" ? "bg-sage text-black" : ""}`}>
            Text
          </div>
          <div onClick={() => setActiveAI("vision")} className={`text-xs font-medium border border-gray-500 rounded-r-md px-2 py-1 ${activeAI === "vision" ? "bg-sage text-black" : ""}`}>
            Vision
          </div>
        </div>


      </div>

      {/* Global Actions */}
      <div className="px-4 space-y-2 mb-6">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2.5 w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "#8BA88E",
            color: "#0D0D0E",
            letterSpacing: "0.01em"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#7a9a7d"}
          onMouseLeave={e => e.currentTarget.style.background = "#8BA88E"}
        >
          <Plus size={16} strokeWidth={2.5} /> New chat
        </button>
        <button
          onClick={onNewProject}
          className="flex items-center gap-2.5 w-full py-2.5 px-4 rounded-xl text-sm transition-all"
          style={{
            background: "var(--overlay-subtle)",
            color: "var(--txt-secondary)",
            border: "1px solid var(--border-subtle)"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--overlay-medium)"; e.currentTarget.style.color = "var(--paper)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--overlay-subtle)"; e.currentTarget.style.color = "var(--txt-secondary)"; }}
        >
          <Plus size={16} strokeWidth={2.5} /> New Project
        </button>
        <div
          className="flex items-center gap-2.5 w-full px-4 rounded-xl text-sm h-[42px]"
          style={{
            background: "var(--overlay-subtle)",
            border: "1px solid var(--border-subtle)",
            color: "var(--txt-secondary)"
          }}
        >
          <Search size={16} className="shrink-0" />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent border-none outline-none text-sm"
            style={{ color: "var(--paper)" }}
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-2 space-y-5" style={{ scrollbarWidth: "none" }}>

        {/* Projects */}
        <div>
          <button
            onClick={() => setProjectOpen(!projectOpen)}
            className="flex w-full items-center justify-between py-1 px-3 text-[10px] font-semibold uppercase tracking-widest mb-1.5 transition-colors"
            style={{ color: "var(--txt-muted)", letterSpacing: "0.12em" }}
          >
            <span>Projects</span>
            {projectOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>

          {projectOpen && (
            <div className="space-y-0.5">
              {filteredProjects.map(project => (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  key={project.id}
                >
                  <SidebarItem
                    label={project.name}
                    isproject={true}
                    isExpanded={expandedProjects.has(project.id)}
                    isActive={activeProjectId === project.id}
                    projctId={project.id}
                    onnewprojectchat={onNewProjectChat}
                    icon={FolderClosed}
                    iconColor="sage"
                    onClick={() => {
                      const isExpanding = !expandedProjects.has(project.id);
                      setExpandedProjects(isExpanding ? new Set([project.id]) : new Set());
                      setActiveProjectId(project.id);
                      setActiveChatId(null);
                      if (isExpanding) fetchProjectChats(project.id);
                    }}
                    onRename={() => { setRenamingId(project.id); setRenamingValue(project.name); }}
                    onDelete={() => handleDelete({ projectId: project.id })}
                    isRenaming={renamingId === project.id}
                    renamingValue={renamingValue}
                    setRenamingValue={setRenamingValue}
                    onRenameSubmit={() => handleRename({ projectId: project.id, newname: renamingValue })}
                    onRenameCancel={() => setRenamingId(null)}
                  >
                    <button onClick={(e) => {
                      e.stopPropagation();
                      const isExpanding = !expandedProjects.has(project.id);
                      setExpandedProjects(isExpanding ? new Set([project.id]) : new Set());
                      if (isExpanding) fetchProjectChats(project.id);
                    }} className="p-0.5 rounded" style={{ color: "var(--txt-muted)" }}>
                      {expandedProjects.has(project.id) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                  </SidebarItem>

                  {expandedProjects.has(project.id) && (
                    <div className="ml-5 pl-3 py-1" style={{ borderLeft: "1px solid var(--border-subtle)" }}>
                      {(project.id === projectChatsProjectId ? projectChats : []).map(pc => (
                        <motion.div
                          key={pc.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <SidebarItem
                            label={pc.name}
                            isActive={activeProjectChatId === pc.id}
                            icon={MessageSquare}
                            isproject={false}
                            iconColor="sage"
                            onClick={() => setActiveProjectChatId(pc.id, project.id)}
                            onRename={() => { setRenamingId(pc.id); setRenamingValue(pc.name); }}
                            onDelete={() => handleDelete({ projectChatId: pc.id })}
                            isRenaming={renamingId === pc.id}
                            renamingValue={renamingValue}
                            setRenamingValue={setRenamingValue}
                            onRenameSubmit={() => handleRename({ projectChatId: pc.id, newname: renamingValue })}
                            onRenameCancel={() => setRenamingId(null)}
                            className="text-[13px]"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Chats */}
        <div>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="flex w-full items-center justify-between py-1 px-3 text-[10px] font-semibold uppercase tracking-widest mb-1.5 transition-colors"
            style={{ color: "var(--txt-muted)", letterSpacing: "0.12em" }}
          >
            <span>Recent Chats</span>
            {chatOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
          {chatOpen && filteredChats.map(chat => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarItem
                label={chat.name}
                isActive={activeChatId === chat.id}
                icon={MessageSquare}
                iconColor="sage"
                onClick={() => { setActiveChatId(chat.id); setActiveProjectId(null); }}
                onRename={() => { setRenamingId(chat.id); setRenamingValue(chat.name); }}
                onDelete={() => handleDelete({ chatId: chat.id })}
                isRenaming={renamingId === chat.id}
                renamingValue={renamingValue}
                setRenamingValue={setRenamingValue}
                onRenameSubmit={() => handleRename({ chatId: chat.id, newname: renamingValue })}
                onRenameCancel={() => setRenamingId(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 mt-auto relative" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div
          onClick={() => setProfileModel(!profileModel)}
          className="flex items-center gap-3 w-full p-2 rounded-xl transition-all cursor-pointer"
          onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0"
            style={{ background: "rgba(139,168,142,0.2)", color: "#8BA88E", border: "1px solid rgba(139,168,142,0.3)" }}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium truncate" style={{ color: "var(--paper)" }}>{user?.email}</span>
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--txt-muted)" }}>Free Plan</span>
          </div>
        </div>

        <AnimatePresence>
          {profileModel && (
            <div ref={profileref}>
              <ProfileModel
                user={user}
                toggleTheme={toggleTheme}
                onClose={() => setProfileModel(false)}
                onOpenSettings={onOpenSettings}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}