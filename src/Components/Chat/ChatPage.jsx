import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import Sidebar from "../Sidebar/Sidebar";
import { Menu, Sparkle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThinkingModel from "./ThinkingModel";
import AccountModel from "../models/AccountModel";
import { useChat } from "../../hooks/useChat";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { MODELS, DEFAULT_MODEL } from "../../config/models";
import { ChevronDown } from "lucide-react";

export default function ChatPage() {
    const { chatId } = useParams();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const [hoverIcon, setHoverIcon] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL.id);
    const [modelChangeOpen, setModelChangeOpen] = useState(false);

    // Auto-close sidebar on mobile when navigating/initially
    useEffect(() => {
        if (isMobile) setSidebarOpen(false);
        else setSidebarOpen(true);
    }, [isMobile]);

    const {
        user, chats, activeChatId, projects, activeProjectId, projectChats, projectChatsProjectId, activeProjectChatId,
        isThinking, thinkngText, storedThinkingText, activeMessages,
        fetchChats, fetchProjects, fetchProjectChats, handleSelectChat, handleSelectProject, handleSelectProjectChat,
        handleNewChat, handleNewProject, handleNewProjectChat, handleSendMessage, setThinkngText, setStoredThinkingText
    } = useChat({ initialChatId: chatId });

    const activeChat = activeProjectChatId
        ? projectChats.find(pc => pc.id === activeProjectChatId) || null
        : chats.find(c => c.id === activeChatId) || null;

    if (!user) return <div className="h-screen w-screen" style={{ background: "var(--obsidian)" }} />;

    return (
        <div
            className="flex h-screen w-screen overflow-hidden font-sans"
            style={{
                background: "var(--obsidian)",
                color: "var(--paper)",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }}
        >
            {/* Sidebar Container */}
            <motion.div
                initial={false}
                animate={{ 
                    width: isMobile ? (sidebarOpen ? "100%" : 0) : (sidebarOpen ? 272 : 64),
                    x: isMobile && !sidebarOpen ? -272 : 0
                }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
                className={`${isMobile ? "fixed inset-0 z-[100]" : "relative z-20 flex-shrink-0"} flex flex-col`}
                style={{
                    background: isMobile ? "rgba(0,0,0,0.4)" : "var(--charcoal)",
                    borderRight: isMobile ? "none" : "1px solid var(--border-subtle)",
                    backdropBlur: isMobile && sidebarOpen ? "8px" : "none"
                }}
                onClick={() => isMobile && setSidebarOpen(false)}
            >
                <motion.div 
                    className={`h-full flex flex-col shrink-0 ${isMobile ? "w-[280px] shadow-2xl" : "w-full"}`}
                    style={{ background: "var(--charcoal)" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <AnimatePresence mode="wait">
                        {sidebarOpen ? (
                            <motion.div
                                key="open-sidebar"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col pt-6"
                            >
                                <Sidebar
                                    user={user}
                                    setSidebarOpen={setSidebarOpen}
                                    chats={chats}
                                    projects={projects}
                                    fetchChats={fetchChats}
                                    fetchProjects={fetchProjects}
                                    fetchProjectChats={fetchProjectChats}
                                    projectChats={projectChats}
                                    projectChatsProjectId={projectChatsProjectId}
                                    activeChatId={activeChatId}
                                    activeProjectId={activeProjectId}
                                    activeProjectChatId={activeProjectChatId}
                                    setActiveChatId={handleSelectChat}
                                    setActiveProjectId={handleSelectProject}
                                    setActiveProjectChatId={handleSelectProjectChat}
                                    onNewChat={handleNewChat}
                                    onNewProject={handleNewProject}
                                    onNewProjectChat={handleNewProjectChat}
                                    onOpenSettings={() => setSettingsOpen(true)}
                                />
                            </motion.div>
                        ) : (
                            !isMobile && (
                                <motion.div
                                    key="closed-sidebar"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full w-[64px] shrink-0 flex flex-col items-center pt-10 gap-6"
                                >
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        onMouseEnter={() => setHoverIcon(true)}
                                        onMouseLeave={() => setHoverIcon(false)}
                                        className="p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center hover:bg-[var(--overlay-subtle)]"
                                        style={{
                                            color: "var(--txt-secondary)"
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            {hoverIcon ? (
                                                <motion.div key="sparkle" initial={{ opacity: 0, scale: 0.8, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.8, rotate: 45 }} transition={{ duration: 0.15 }}>
                                                    <Sparkle size={20} style={{ color: "#8BA88E" }} />
                                                </motion.div>
                                            ) : (
                                                <motion.div key="menu" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                                                    <Menu size={20} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Mobile Header */}
                {isMobile && (
                    <div className="h-16 border-b border-[var(--border-subtle)] flex items-center px-4 justify-between bg-[var(--obsidian)] z-[60] shrink-0">
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                            
                            {/* Model Selector for Mobile */}
                            <div className="relative">
                                <button 
                                    onClick={() => setModelChangeOpen(!modelChangeOpen)}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/5 transition-all"
                                >
                                    <span className="text-xs font-medium tracking-tight">aura<span className="text-sage">.</span></span>
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/5 text-txt-muted">
                                        {MODELS.find(m => m.id === selectedModel)?.shortName}
                                    </span>
                                    <ChevronDown size={14} className={`text-txt-muted transition-transform ${modelChangeOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {modelChangeOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-0 mt-2 w-56 bg-[var(--charcoal)] border border-[var(--border-medium)] rounded-xl shadow-2xl p-1 z-[70] backdrop-blur-xl"
                                        >
                                            {MODELS.map((model) => (
                                                <button
                                                    key={model.id}
                                                    onClick={() => {
                                                        setSelectedModel(model.id);
                                                        setModelChangeOpen(false);
                                                    }}
                                                    className={`w-full text-left p-2.5 rounded-lg transition-all flex flex-col gap-0.5 ${selectedModel === model.id ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                                                >
                                                    <span className="text-sm font-medium">{model.name}</span>
                                                    <span className="text-[10px] text-txt-muted line-clamp-1">{model.description}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Potential additional mobile actions like 'New Chat' could go here */}
                        </div>
                    </div>
                )}

                <div className="flex-1 flex overflow-hidden relative">
                    <div className="flex-1 flex flex-col relative overflow-hidden">
                        <Chat
                            activeChat={activeChat}
                            messages={activeMessages}
                            onSendMessage={handleSendMessage}
                            isThinking={isThinking}
                            thinkingText={thinkngText}
                            onViewThinking={(text) => {
                                setThinkngText(text);
                                setStoredThinkingText(text);
                            }}
                            selectedModel={selectedModel}
                            setSelectedModel={setSelectedModel}
                            hideHeader={isMobile}
                        />
                    </div>

                    {/* Thinking Panel — side panel on desktop, full-screen overlay on mobile */}
                    <AnimatePresence>
                        {thinkngText.trim() !== "" && (
                            isMobile ? (
                                // Mobile: full-screen overlay
                                <motion.div
                                    key="thinking-overlay"
                                    initial={{ opacity: 0, y: "100%" }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: "100%" }}
                                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
                                    className="fixed inset-0 z-[200] flex flex-col"
                                    style={{ background: "var(--charcoal)" }}
                                >
                                    <ThinkingModel
                                        text={storedThinkingText}
                                        isStreaming={isThinking}
                                        onClose={() => setThinkngText("")}
                                    />
                                </motion.div>
                            ) : (
                                // Desktop: animated side panel
                                <motion.div
                                    key="thinking-panel"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 360, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
                                    className="shrink-0 h-full overflow-hidden z-10"
                                    style={{
                                        borderLeft: "1px solid var(--border-subtle)",
                                        background: "var(--charcoal)"
                                    }}
                                >
                                    <ThinkingModel text={storedThinkingText} isStreaming={isThinking} onClose={() => setThinkngText("")} />
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AccountModel 
                isOpen={settingsOpen} 
                onClose={() => setSettingsOpen(false)} 
                user={user} 
                projects={projects}
                fetchProjects={fetchProjects}
                chats={chats}
                fetchChats={fetchChats}
            />
        </div>
    );
}