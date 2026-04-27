import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Sun, Moon, User, Settings as SettingsIcon, Shield, ChevronRight } from "lucide-react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HelpModel from "./HelpModel";
import Bugreport from "../Help/Bugreport";

export default function ProfileModel({ user, toggleTheme, onClose, onOpenSettings }) {
    const nav = useNavigate();
    const isLight = document.documentElement.classList.contains('light');
    const [showHelp, setShowHelp] = useState(false);

    const handleHelpOptionClick = (id) => {
        if (id === 'bug') {
            nav('/bug-report');
            onClose();
        } else if (id === 'terms') {
            nav('/terms');
            onClose();
        } else if (id === 'privacy') {
            nav('/privacy');
            onClose();
        } else if (id === 'help') {
            nav('/help-center');
            onClose();
        }
        // Handle other options if needed
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-0 mb-3 w-64 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-2 z-50 ml-4"
            style={{
                background: "var(--charcoal)",
                border: "1px solid var(--border-medium)",
                backdropFilter: "blur(20px)"
            }}
        >
            {/* User Header */}
            <div className="px-3 py-3 border-b border-[var(--border-subtle)] mb-1">
                <div className="flex items-center gap-3">
                    <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                        style={{ background: "rgba(139,168,142,0.15)", color: "#8BA88E", border: "1px solid rgba(139,168,142,0.2)" }}
                    >
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-medium truncate" style={{ color: "var(--paper)" }}>{user?.email}</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--txt-muted)" }}>Personal Workspace</span>
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-0.5">
                {/* <button
                    onClick={() => { toggleTheme(); }}
                    className="flex items-center justify-between w-full p-2.5 rounded-xl transition-all text-[13px] group"
                    style={{ color: "var(--paper)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                    <div className="flex items-center gap-2.5">
                        {isLight ? <Moon size={16} className="text-txt-muted group-hover:text-paper" /> : <Sun size={16} className="text-txt-muted group-hover:text-paper" />}
                        <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
                    </div>
                    <span className="text-[10px] text-txt-muted px-1.5 py-0.5 rounded-md border border-[var(--border-subtle)]">Shift + T</span>
                </button> */}

                <button
                    onClick={() => { onOpenSettings(); onClose(); }}
                    className="flex items-center gap-2.5 w-full p-2.5 rounded-xl transition-all text-[13px] group"
                    style={{ color: "var(--paper)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                    <User size={16} className="text-txt-muted group-hover:text-paper" />
                    <span>Account Settings</span>
                </button>

                <div 
                    className="relative"
                    onMouseEnter={() => setShowHelp(true)}
                    onMouseLeave={() => setShowHelp(false)}
                >
                    <button
                        className="flex items-center gap-2.5 w-full p-2.5 rounded-xl transition-all text-[13px] group"
                        style={{ color: "var(--paper)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                        <Shield size={16} className="text-txt-muted group-hover:text-paper" />
                        <span>Help Center</span>
                        <span className="text-[10px] text-txt-muted px-1.5 py-0.5 ml-auto"> <ChevronRight size={16} /> </span>
                    </button>
                    
                    <AnimatePresence>
                        {showHelp && (
                            <HelpModel 
                                isOpen={true} 
                                onOptionClick={handleHelpOptionClick}
                            />
                        )}
                    </AnimatePresence>
                </div>


            </div>

            {/* Footer / Sign Out */}
            <div className="mt-2 pt-2 border-t border-[var(--border-subtle)]">
                <button
                    onClick={() => { supabase.auth.signOut(); nav("/"); }}
                    className="flex items-center gap-2.5 w-full p-2.5 rounded-xl transition-all text-[13px] font-medium"
                    style={{ color: "#f87171" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </motion.div>
    );
}