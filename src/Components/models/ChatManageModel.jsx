import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import { 
    X, Search, Trash2, Edit3, Check, Square, 
    CheckSquare, MessageSquare, AlertCircle, Loader2,
    ChevronRight, MoreVertical
} from "lucide-react";

export default function ChatManageModel({ isOpen, onClose, user, fetchChats, chats: initialChats }) {
    const [chats, setChats] = useState(initialChats || []);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setChats(initialChats);
            setSelectedIds(new Set());
        }
    }, [isOpen, initialChats]);

    const filteredChats = chats.filter(c => 
        c.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSelect = (id) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredChats.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredChats.map(c => c.id)));
        }
    };

    const handleRename = async (id) => {
        if (!editValue.trim()) return;
        setLoading(true);
        const { error } = await supabase
            .from("chats")
            .update({ title: editValue.trim() })
            .eq("id", id);
        
        if (!error) {
            setChats(chats.map(c => c.id === id ? { ...c, title: editValue.trim() } : c));
            setEditingId(null);
            if (fetchChats) fetchChats();
        }
        setLoading(false);
    };

    const handleDeleteSingle = async (id) => {
        if (!window.confirm("Are you sure you want to delete this chat?")) return;
        setIsDeleting(true);
        const { error } = await supabase.from("chats").delete().eq("id", id);
        if (!error) {
            setChats(chats.filter(c => c.id !== id));
            if (fetchChats) fetchChats();
        }
        setIsDeleting(false);
    };

    const handleDeleteBulk = async () => {
        if (selectedIds.size === 0) return;
        if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} chats?`)) return;
        
        setIsDeleting(true);
        const { error } = await supabase
            .from("chats")
            .delete()
            .in("id", Array.from(selectedIds));
        
        if (!error) {
            setChats(chats.filter(c => !selectedIds.has(c.id)));
            setSelectedIds(new Set());
            if (fetchChats) fetchChats();
        }
        setIsDeleting(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl h-[600px] rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_32px_64px_rgba(0,0,0,0.5)] bg-[var(--obsidian)] border border-[var(--border-medium)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-8 pb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-serif text-paper">Manage Chats</h2>
                            <p className="text-sm text-txt-muted mt-1">{chats.length} total conversations</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-txt-muted hover:text-paper transition-all">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="px-8 mb-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted" size={18} />
                            <input 
                                type="text"
                                placeholder="Search conversations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-2xl pl-12 pr-4 py-3 text-sm text-paper outline-none focus:border-sage/50 transition-all"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button 
                                onClick={toggleSelectAll}
                                className="flex items-center gap-2 text-xs font-semibold text-txt-muted hover:text-paper transition-colors"
                            >
                                {selectedIds.size === filteredChats.length && filteredChats.length > 0 ? (
                                    <CheckSquare size={16} className="text-sage" />
                                ) : (
                                    <Square size={16} />
                                )}
                                {selectedIds.size > 0 ? `Selected ${selectedIds.size}` : "Select All"}
                            </button>

                            {selectedIds.size > 0 && (
                                <motion.button
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={handleDeleteBulk}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all"
                                >
                                    <Trash2 size={14} />
                                    Delete Selected
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
                        <div className="space-y-2">
                            {filteredChats.map((chat) => (
                                <motion.div
                                    key={chat.id}
                                    layout
                                    className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                                        selectedIds.has(chat.id) 
                                        ? 'bg-sage/5 border-sage/30' 
                                        : 'bg-white/[0.02] border-transparent hover:border-white/10 hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <button 
                                        onClick={() => toggleSelect(chat.id)}
                                        className="shrink-0 transition-colors"
                                    >
                                        {selectedIds.has(chat.id) ? (
                                            <CheckSquare size={18} className="text-sage" />
                                        ) : (
                                            <Square size={18} className="text-txt-muted group-hover:text-txt-secondary" />
                                        )}
                                    </button>

                                    <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                                        <MessageSquare size={18} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {editingId === chat.id ? (
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    autoFocus
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleRename(chat.id)}
                                                    className="flex-1 bg-black/20 border border-sage/30 rounded-lg px-2 py-1 text-sm text-paper outline-none"
                                                />
                                                <button onClick={() => handleRename(chat.id)} className="p-1 text-sage">
                                                    <Check size={16} />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="p-1 text-txt-muted">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-paper truncate">{chat.title}</span>
                                                <span className="text-[10px] text-txt-muted uppercase tracking-wider mt-0.5">
                                                    Last active {new Date(chat.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => { setEditingId(chat.id); setEditValue(chat.title); }}
                                            className="p-2 rounded-lg hover:bg-white/5 text-txt-muted hover:text-paper transition-all"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteSingle(chat.id)}
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-txt-muted hover:text-red-400 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}

                            {filteredChats.length === 0 && (
                                <div className="py-20 flex flex-col items-center text-center">
                                    <div className="p-4 rounded-full bg-white/5 text-txt-muted mb-4">
                                        <MessageSquare size={32} />
                                    </div>
                                    <p className="text-sm text-txt-muted">No conversations found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {isDeleting && (
                        <div className="absolute inset-0 bg-[var(--obsidian)]/80 backdrop-blur-sm z-50 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 size={32} className="text-sage animate-spin" />
                                <p className="text-sm font-medium tracking-widest uppercase">Syncing Database...</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}