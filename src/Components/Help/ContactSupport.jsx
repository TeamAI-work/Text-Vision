import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, MessageCircle, Mail, Globe, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactSupport() {
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
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
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
            {/* Header */}
            <header className="p-6 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--obsidian)]/80 backdrop-blur-md sticky top-0 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-txt-muted hover:text-paper transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className={`${fontSize.button} font-medium`}>Back</span>
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-txt-muted">Support Center</span>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Side: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-12"
                >
                    <div>
                        <h1 className={`${fontSize.title} mb-6 leading-tight`}>How can we <br /><span className="text-sage">help you?</span></h1>
                        <p className={`${fontSize.text} text-txt-secondary leading-relaxed`}>
                            Our team of experts is here to assist you with any questions or technical issues you may encounter.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 rounded-2xl bg-sage/10 text-sage border border-sage/20 group-hover:bg-sage/20 transition-all">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className={`${fontSize.subtitle} font-semibold`}>Email us</h3>
                                <p className={`${fontSize.text} text-txt-muted`}>support@aurastudio.ai</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 rounded-2xl bg-sage/10 text-sage border border-sage/20 group-hover:bg-sage/20 transition-all">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h3 className={`${fontSize.subtitle} font-semibold`}>Live Chat</h3>
                                <p className={`${fontSize.text} text-txt-muted`}>Available Mon-Fri, 9am-6pm PST</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 rounded-2xl bg-sage/10 text-sage border border-sage/20 group-hover:bg-sage/20 transition-all">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className={`${fontSize.subtitle} font-semibold`}>Global Support</h3>
                                <p className={`${fontSize.text} text-txt-muted`}>Worldwide assistance in 12+ languages</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <form
                                key="form"
                                onSubmit={handleSubmit}
                                className="bg-[var(--charcoal)] p-10 rounded-[2.5rem] border border-[var(--border-medium)] shadow-2xl space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-paper focus:border-sage/50 focus:ring-1 focus:ring-sage/20 outline-none transition-all`}
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-paper focus:border-sage/50 focus:ring-1 focus:ring-sage/20 outline-none transition-all`}
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Subject</label>
                                    <select
                                        className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-paper outline-none transition-all appearance-none cursor-pointer focus:border-sage/50`}
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option className="bg-obsidian">General Inquiry</option>
                                        <option className="bg-obsidian">Technical Support</option>
                                        <option className="bg-obsidian">Billing & Subscription</option>
                                        <option className="bg-obsidian">Feature Request</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className={`${fontSize.button} font-semibold text-txt-secondary ml-1`}>Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="How can we help you today?"
                                        className={`${fontSize.input} w-full bg-black/20 border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-paper focus:border-sage/50 focus:ring-1 focus:ring-sage/20 outline-none transition-all resize-none`}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`${fontSize.button} w-full py-5 rounded-[1.25rem] font-bold flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'bg-sage/50 cursor-not-allowed' : 'bg-sage hover:bg-[#7a9a7d] active:scale-[0.99] shadow-xl shadow-sage/20'} text-obsidian`}
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[var(--charcoal)] p-12 rounded-[2.5rem] border border-[var(--border-medium)] text-center shadow-2xl"
                            >
                                <div className="w-24 h-24 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-8">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2 className={`${fontSize.faq} mb-4`}>Message Sent</h2>
                                <p className={`${fontSize.text} text-txt-secondary mb-8`}>
                                    We've received your inquiry and will get back to you within 24 hours.
                                </p>
                                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "0%" }}
                                        transition={{ duration: 3 }}
                                        className="w-full h-full bg-sage"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>

            <footer className={`${fontSize.button} p-8 text-center text-txt-muted border-t border-[var(--border-subtle)]`}>
                &copy; 2026 Aura Studio. All rights reserved.
            </footer>
        </div>
    );
}
