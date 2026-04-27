import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Bugreport() {
    const navigate = useNavigate();

    const fontSize = {
        title: "font-serif text-2xl md:text-3xl lg:text-4xl",
        subtitle: "font-serif text-sm md:text-base lg:text-lg",
        text: "font-sans text-sm md:text-base lg:text-lg",
        button: "font-sans text-xs md:text-sm lg:text-base",
        link: "font-sans text-xs md:text-sm lg:text-base",
        input: "font-sans text-xs md:text-sm lg:text-base",
        faq: "font-serif text-xl md:text-2xl lg:text-3xl",
        faqAnswer: "font-sans text-xs md:text-sm lg:text-base"
    }

    const [formData, setFormData] = useState({
        title: "",
        category: "UI/UX",
        severity: "Low",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            navigate(-1);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[var(--obsidian)] text-paper selection:bg-sage selection:text-obsidian flex flex-col">
            {/* Navigation Header */}
            <header className="p-6 flex items-center justify-between border-b border-[var(--border-subtle)]">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-txt-muted hover:text-paper transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className={`${fontSize.button} font-medium`}>Back</span>
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-txt-muted">Direct Support Channel</span>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 pb-20">
                <div className="w-full max-w-2xl">
                    <div className="mb-12 text-center">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex p-4 rounded-3xl bg-red-500/10 text-red-400 mb-6"
                        >
                            <Bug size={32} />
                        </motion.div>
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`${fontSize.title} mb-4`}
                        >
                            Report a Bug
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`${fontSize.text} text-txt-muted`}
                        >
                            Found something broken? Let us know the details and our team will get on it.
                        </motion.p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="space-y-6 bg-[var(--charcoal)] p-8 rounded-3xl border border-[var(--border-medium)] shadow-2xl"
                            >
                                <div className="space-y-2">
                                    <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Issue Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Briefly describe the problem..."
                                        className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-xl px-4 py-4 text-paper focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 outline-none transition-all placeholder:text-txt-muted`}
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Category</label>
                                        <select
                                            className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-xl px-4 py-4 text-paper outline-none transition-all appearance-none cursor-pointer focus:border-red-500/50`}
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option className="bg-obsidian">UI/UX Issue</option>
                                            <option className="bg-obsidian">Performance</option>
                                            <option className="bg-obsidian">Functionality</option>
                                            <option className="bg-obsidian">Data Syncing</option>
                                            <option className="bg-obsidian">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Severity</label>
                                        <select
                                            className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-xl px-4 py-4 text-paper outline-none transition-all appearance-none cursor-pointer focus:border-red-500/50`}
                                            value={formData.severity}
                                            onChange={e => setFormData({ ...formData, severity: e.target.value })}
                                        >
                                            <option className="bg-obsidian">Low</option>
                                            <option className="bg-obsidian">Medium</option>
                                            <option className="bg-obsidian">High</option>
                                            <option className="bg-obsidian">Critical / Blocker</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Steps to Reproduce</label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder="1. Go to... 2. Click on... 3. See error..."
                                        className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-xl px-4 py-4 text-paper focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 outline-none transition-all placeholder:text-txt-muted resize-none`}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`${fontSize.button} w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'bg-red-500/50 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 active:scale-[0.99] shadow-xl shadow-red-500/20'} text-white`}
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Bug Report
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-20 flex flex-col items-center text-center bg-[var(--charcoal)] rounded-3xl border border-[var(--border-medium)]"
                            >
                                <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className={`${fontSize.faq} text-paper mb-4`}>Report Received</h3>
                                <p className={`${fontSize.text} text-txt-muted max-w-sm mx-auto mb-8 px-6`}>
                                    Thank you for your feedback. We've received your report and our engineering team will investigate.
                                </p>
                                <div className="w-48 h-1 bg-black/20 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "0%" }}
                                        transition={{ duration: 3 }}
                                        className="w-full h-full bg-green-500"
                                    />
                                </div>
                                <p className="text-[10px] text-txt-muted mt-4 uppercase tracking-widest font-bold">Redirecting back...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <footer className={`${fontSize.button} p-8 text-center text-txt-muted border-t border-[var(--border-subtle)]`}>
                &copy; 2026 Aura Studio. All rights reserved.
            </footer>
        </div>
    );
}