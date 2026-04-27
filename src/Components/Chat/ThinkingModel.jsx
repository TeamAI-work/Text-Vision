import React, { useState, useEffect, useRef } from "react";
import { BrainCircuit, X } from "lucide-react";
import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ThinkingModel({ text, isStreaming, onClose }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [text]);

    if (!text) return null;

    return (
        <div
            className="h-full w-full flex flex-col overflow-hidden relative"
            style={{ background: "var(--charcoal)" }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-4 shrink-0 backdrop-blur-xl z-10"
                style={{
                    borderBottom: "1px solid var(--border-subtle)",
                    background: "rgba(13,13,14,0.4)"
                }}
            >
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div
                            className="p-2 rounded-xl group-hover:scale-110 transition-transform"
                            style={{
                                background: "rgba(139,168,142,0.12)",
                                border: "1px solid rgba(139,168,142,0.25)"
                            }}
                        >
                            <BrainCircuit size={16} style={{ color: "#8BA88E" }} />
                        </div>
                        {isStreaming && (
                            <span
                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping"
                                style={{ background: "#8BA88E" }}
                            />
                        )}
                        {isStreaming && (
                            <span
                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                                style={{ background: "#8BA88E" }}
                            />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1
                                className="text-[13px] font-semibold tracking-wide"
                                style={{ color: "var(--paper)" }}
                            >
                                Thinking Process
                            </h1>
                            {isStreaming && (
                                <span className="flex gap-0.5">
                                    <span className="w-1 h-1 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ background: "#8BA88E" }} />
                                    <span className="w-1 h-1 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ background: "#8BA88E" }} />
                                    <span className="w-1 h-1 rounded-full animate-bounce" style={{ background: "#8BA88E" }} />
                                </span>
                            )}
                        </div>
                        <p
                            className="text-[10px] mt-0.5 tracking-widest"
                            style={{ color: "var(--txt-muted)" }}
                        >
                            {isStreaming ? "Synthesizing Response" : "Logical Path Completed"}
                        </p>
                    </div>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl transition-all"
                        style={{ color: "var(--txt-muted)", border: "1px solid var(--border-subtle)" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.background = "var(--overlay-subtle)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "var(--txt-muted)"; e.currentTarget.style.background = "transparent"; }}
                    >
                        <X size={15} />
                    </button>
                )}
            </div>

            {/* Scrollable Content */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 scroll-smooth"
                style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border-subtle) transparent" }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                >
                    <div
                        className="prose prose-sm max-w-none text-[13px] leading-[1.8] p-5 rounded-xl"
                        style={{
                            color: "var(--txt-secondary)",
                            background: "var(--overlay-subtle)",
                            border: "1px solid var(--border-subtle)"
                        }}
                    >
                        <MarkdownRenderer content={text} />
                        {isStreaming && (
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-[5px] h-[14px] ml-1.5 align-middle rounded-sm"
                                style={{ background: "rgba(139,168,142,0.7)" }}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
