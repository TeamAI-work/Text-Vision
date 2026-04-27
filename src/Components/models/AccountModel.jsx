import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import {
    X, Settings, Shield, User, CreditCard,
    Trash2, Download, LogOut, Check, ChevronRight,
    Palette, Globe, Bell,
    ArrowRight,
    Trash,
    ExternalLink,
    Moon, Sun,
    Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectmanageModel from "./ProjectmanageModel";
import ChatManageModel from "./ChatManageModel";

export default function AccountModel({ isOpen, onClose, user, projects, fetchProjects, chats, fetchChats }) {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("General");
    const [dbUser, setDbUser] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState("");
    const [isUpdatingName, setIsUpdatingName] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [manageProjectsOpen, setManageProjectsOpen] = useState(false);
    const [manageChatsOpen, setManageChatsOpen] = useState(false);

    const features = [
                "Everything in Aura Core",
                "Vision + Text multi-modal model",
                "High-res image analysis",
                "Chart & data extraction",
                "Priority high-speed responses",
                "Early access to new features",
                "Cloud-sync for unlimited devices",
                "Priority support channel"
            ]

    useEffect(() => {
        if (isOpen && user?.id) {
            fetchUserProfile();
        }
        // Sync dark mode state with document
        setIsDarkMode(!document.documentElement.classList.contains("light"));
    }, [isOpen, user?.id]);

    const handleToggleTheme = () => {
        const newIsDark = !isDarkMode;
        setIsDarkMode(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    };

    const fetchUserProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', user.id);

            if (error) throw error;

            if (data && data.length > 0) {
                const profile = data[0];
                setDbUser(profile);
                setNewName(profile.username || profile.name || profile.full_name || "");
            } else {
                setDbUser(null);
            }
        } catch (err) {
            console.error("Error fetching user profile:", err.message);
        }
    };

    const handleUpdateName = async () => {
        if (!newName.trim() || !user?.id) return;
        setIsUpdatingName(true);
        setErrorMsg("");

        try {
            // Check if user profile already exists
            const { data: existingUser } = await supabase
                .from('users')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (existingUser) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('users')
                    .update({
                        username: newName.trim(),
                        email: user.email
                    })
                    .eq('user_id', user.id);
                if (updateError) throw updateError;
            } else {
                // Insert new
                const { error: insertError } = await supabase
                    .from('users')
                    .insert({
                        user_id: user.id,
                        username: newName.trim(),
                        email: user.email
                    });
                if (insertError) throw insertError;
            }

            await fetchUserProfile();
            setIsEditingName(false);
        } catch (err) {
            if (err.code === "23505") {
                setErrorMsg("This username is already taken.");
            } else {
                setErrorMsg("Update failed. Please try again.");
            }
            console.error("Update error:", err);
        } finally {
            setIsUpdatingName(false);
        }
    };

    const handleDeleteAllChats = async () => {
        if (!window.confirm("CRITICAL: This will permanently delete ALL your conversations. This action cannot be undone. Are you sure?")) return;
        
        setIsUpdatingName(true);
        try {
            const { error } = await supabase
                .from('chats')
                .delete()
                .eq('user_id', user.id);
            
            if (error) throw error;
            if (fetchChats) fetchChats();
        } catch (err) {
            console.error("Error deleting all chats:", err);
            alert("Failed to delete chats. Please try again.");
        } finally {
            setIsUpdatingName(false);
        }
    };

    const tabs = [
        { id: "General", icon: Settings, label: "General" },
        { id: "Data", icon: Shield, label: "Data Controls" },
        { id: "Account", icon: User, label: "Account" },
        { id: "Subscription", icon: CreditCard, label: "Subscriptions" },
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl h-[90vh] sm:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
                    style={{
                        background: "var(--obsidian)",
                        border: "1px solid var(--border-medium)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Sidebar — hidden on mobile, shown on sm+ */}
                    <div
                        className="hidden sm:flex w-64 h-full border-r border-[var(--border-subtle)] flex-col pt-8"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                        <div className="px-6 mb-8">
                            <h2 className="text-xl font-semibold tracking-tight" style={{ color: "var(--paper)" }}>Settings</h2>
                        </div>

                        <nav className="flex-1 px-3 space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 group"
                                        style={{
                                            color: isActive ? "var(--paper)" : "var(--txt-muted)",
                                            background: isActive ? "var(--overlay-medium)" : "transparent"
                                        }}
                                        onMouseEnter={e => !isActive && (e.currentTarget.style.background = "var(--overlay-subtle)")}
                                        onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
                                    >
                                        <Icon size={18} className={isActive ? "text-sage" : "group-hover:text-paper"} />
                                        <span className="font-medium">{tab.label}</span>
                                        {isActive && <motion.div layoutId="active-pill" className="ml-auto w-1 h-4 rounded-full bg-sage" />}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Mobile top tab bar — shown only on mobile */}
                    <div className="flex sm:hidden items-center border-b border-[var(--border-subtle)] overflow-x-auto shrink-0 px-2 pt-4"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                                        isActive
                                            ? "border-sage text-paper"
                                            : "border-transparent text-txt-muted"
                                    }`}
                                >
                                    <Icon size={14} className={isActive ? "text-sage" : ""} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 h-full flex flex-col relative overflow-hidden bg-obsidian min-h-0">
                        {/* Close button */}
                        <div className="absolute top-4 right-4 z-20">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-[var(--overlay-subtle)] text-txt-muted hover:text-paper transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 sm:px-10 pt-10 sm:pt-12 pb-8 sm:pb-10 custom-scrollbar">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-xl w-full"
                            >
                                {activeTab === "General" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: "var(--paper)" }}>
                                                General
                                            </h3>
                                            <div className="space-y-6">
                                                <SettingRow
                                                    icon={Palette}
                                                    title="Accent color"
                                                    desc="Change the color of the sidebar and other elements."
                                                >
                                                    <select className="bg-charcoal border border-[var(--border-medium)] rounded-lg px-3 py-1.5 text-sm text-paper outline-none focus:border-sage transition-all">
                                                        <option>Green</option>
                                                        <option>Blue</option>
                                                        <option>Red</option>
                                                        <option>Yellow</option>
                                                    </select>
                                                </SettingRow>
                                                <SettingRow
                                                    icon={isDarkMode ? Moon : Sun}
                                                    title="Dark mode"
                                                    desc="Toggle between light and dark themes."
                                                >
                                                    <div onClick={handleToggleTheme}>
                                                        <Toggle active={isDarkMode} />
                                                    </div>
                                                </SettingRow>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Data" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--paper)" }}>Data Controls</h3>
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-paper rounded-xl transition-all">
                                                    <div>Manage Chats</div>
                                                    <button 
                                                        onClick={() => setManageChatsOpen(true)}
                                                        className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-obsidian transition-all"
                                                    >
                                                        Manage
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-paper rounded-xl transition-all">
                                                    <div>Manage Projects</div>
                                                    <button 
                                                        onClick={() => setManageProjectsOpen(true)}
                                                        className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-obsidian transition-all"
                                                    >
                                                        Manage
                                                    </button>
                                                </div>
                                                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                                                    <div className="flex text-red-500 items-center justify-between gap-2 px-4 py-2 text-sm font-medium">
                                                        Delete all chats
                                                    </div>
                                                    <div
                                                        onClick={handleDeleteAllChats}
                                                        disabled={isUpdatingName}
                                                        className="flex text-red-300 cursor-pointer items-center justify-between gap-2 px-4 py-2 text-sm font-medium bg-red-500/10 border  hover:bg-red-500/20 hover:border-red-500 border-red-500/10 rounded-xl transition-all disabled:opacity-50"
                                                    >
                                                        {isUpdatingName ? "Deleting..." : "Delete all"}
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Account" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--paper)" }}>Account</h3>
                                            <div className="p-6 rounded-2xl mb-4">
                                                <p className="text-xs font-semibold uppercase tracking-widest text-txt-muted mb-4">Email Address</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-paper font-medium">{dbUser?.email || user?.email || "user@example.com"}</span>
                                                </div>
                                            </div>
                                            <div className="p-6 rounded-2xl mb-8">
                                                <p className="text-xs font-semibold uppercase tracking-widest text-txt-muted mb-4">Username</p>
                                                <div className="flex items-center justify-between">
                                                    {isEditingName ? (
                                                        <div className="flex flex-col flex-1 mr-4">
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    value={newName}
                                                                    onChange={e => setNewName(e.target.value)}
                                                                    className={`flex-1 bg-charcoal border ${errorMsg ? 'border-red-500/50' : 'border-sage/30'} rounded-lg px-3 py-1.5 text-sm text-paper outline-none focus:border-sage transition-all`}
                                                                    placeholder="Enter your name..."
                                                                    autoFocus
                                                                />
                                                                <button
                                                                    onClick={handleUpdateName}
                                                                    disabled={isUpdatingName}
                                                                    className="text-xs font-semibold text-sage hover:brightness-125 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                                >
                                                                    {isUpdatingName ? (
                                                                        <div className="w-3 h-3 border-2 border-sage/30 border-t-sage rounded-full animate-spin" />
                                                                    ) : "Save"}
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setIsEditingName(false);
                                                                        setNewName(dbUser?.username || dbUser?.name || "");
                                                                        setErrorMsg("");
                                                                    }}
                                                                    disabled={isUpdatingName}
                                                                    className="text-xs font-semibold text-txt-muted hover:text-paper disabled:opacity-50"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                            {errorMsg && (
                                                                <motion.p
                                                                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                                                    className="text-[10px] text-red-400 mt-1.5 ml-1 font-medium"
                                                                >
                                                                    {errorMsg}
                                                                </motion.p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className="text-paper font-medium">
                                                                {dbUser?.username || dbUser?.name || dbUser?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || "Not set"}
                                                            </span>
                                                            <button
                                                                onClick={() => setIsEditingName(true)}
                                                                className="text-xs font-semibold text-sage hover:underline"
                                                            >
                                                                Change
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => {
                                                    setActiveTab("Subscription");

                                                }}
                                                className="flex justify-start items-center gap-2 hover:text-green-500 cursor-pointer ">
                                                Manage Subscription <ExternalLink size={14} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Subscription" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--paper)" }}>Subscriptions</h3>
                                            <div className="relative p-6 rounded-3xl border border-sage/30 bg-sage/5 overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4">
                                                    <span className="bg-sage text-obsidian text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Current Plan</span>
                                                </div>
                                                <p className="text-sm font-semibold text-sage uppercase tracking-widest mb-1">Aura Core</p>
                                                <h4 className="text-3xl font-serif text-paper mb-4">$0 <span className="text-lg font-sans text-txt-muted">/ month</span></h4>

                                                <ul className="space-y-2 mb-6">
                                                    {features.map((feature)=>(
                                                            <li key={feature} className="flex items-center gap-2 text-sm text-txt-secondary"><Check size={14} className="text-sage" /> {feature}</li>
                                                        ))}
                                                </ul>

                                            </div>
                                            <button
                                                onClick={() => navigate("/plans")}
                                                className="w-full mt-6 group relative overflow-hidden rounded-2xl py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                {/* Gradient Background */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-sage via-[#a8c8ab] to-sage bg-[length:200%_100%] animate-gradient transition-all group-hover:brightness-110" />

                                                {/* Button Content */}
                                                <div className="relative flex items-center justify-center gap-3 text-obsidian font-bold uppercase tracking-widest text-xs">
                                                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                                                    Explore Premium Plans
                                                </div>

                                                {/* Inner Glow Overlay */}
                                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <ProjectmanageModel 
                isOpen={manageProjectsOpen}
                onClose={() => setManageProjectsOpen(false)}
                user={user}
                projects={projects}
                fetchProjects={fetchProjects}
            />

            <ChatManageModel 
                isOpen={manageChatsOpen}
                onClose={() => setManageChatsOpen(false)}
                user={user}
                chats={chats}
                fetchChats={fetchChats}
            />
        </AnimatePresence>
    );
}

function SettingRow({ icon: Icon, title, desc, children }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
                <div className="mt-1 p-2 rounded-lg bg-[var(--overlay-subtle)] text-sage">
                    <Icon size={18} />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-paper leading-tight mb-1">{title}</span>
                    <span className="text-[13px] text-txt-muted leading-relaxed pr-6">{desc}</span>
                </div>
            </div>
            <div className="shrink-0">
                {children}
            </div>
        </div>
    );
}

function Toggle({ active }) {
    return (
        <div
            className={`w-11 h-6 rounded-full p-1 transition-all duration-300 cursor-pointer flex items-center ${active ? 'bg-sage' : 'bg-charcoal border border-[var(--border-medium)]'}`}
        >
            <div className={`w-4 h-4 rounded-full shadow-sm transition-all duration-300 ${active ? 'translate-x-5 bg-obsidian' : 'bg-txt-muted'}`} />
        </div>
    );
}