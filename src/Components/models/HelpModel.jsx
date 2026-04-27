import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, ShieldCheck, FileText, Bug, ExternalLink } from "lucide-react";

export default function HelpModel({ isOpen, onOptionClick }) {
    if (!isOpen) return null;

    const options = [
        { id: 'help', icon: HelpCircle, label: "Help Center", desc: "Guides and FAQs" },
        { id: 'privacy', icon: ShieldCheck, label: "Privacy Policy", desc: "How we handle data" },
        { id: 'terms', icon: FileText, label: "Terms & Services", desc: "Our usage terms" },
        { id: 'bug', icon: Bug, label: "Report a Bug", desc: "Help us improve", color: "text-red-400" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -5, scale: 0.95 }}
            className="absolute left-full -top-30 ml-3 w-56 rounded-2xl p-2 z-[60] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[var(--border-medium)] backdrop-blur-xl bg-[var(--charcoal)]"
        >
            <div className="space-y-1">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => onOptionClick?.(opt.id)}
                        className="w-full flex flex-col items-start p-2.5 rounded-xl transition-all hover:bg-[var(--overlay-subtle)] group text-left"
                    >
                        <div className="flex items-center gap-2.5 w-full">
                            <opt.icon size={16} className={`text-txt-muted group-hover:text-paper ${opt.color || ""}`} />
                            <span className="text-[13px] font-medium text-paper">{opt.label}</span>
                            <ExternalLink size={12} className="ml-auto text-txt-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[10px] text-txt-muted ml-[26px] mt-0.5">{opt.desc}</span>
                    </button>
                ))}
            </div>


        </motion.div>
    );
}