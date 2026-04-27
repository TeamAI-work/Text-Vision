import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, BookOpen, User, CreditCard, Shield, ChevronDown, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HelpCenter() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFaq, setActiveFaq] = useState(null);

    const categories = [
        { icon: Sparkles, title: "Getting Started", count: "12 articles", color: "text-amber-400" },
        { icon: User, title: "Account & Profile", count: "8 articles", color: "text-blue-400" },
        { icon: CreditCard, title: "Billing & Plans", count: "6 articles", color: "text-emerald-400" },
        { icon: Shield, title: "Safety & Privacy", count: "10 articles", color: "text-purple-400" },
    ];

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

    const faqs = [
        {
            q: "How do I create a new project?",
            a: "To create a new project, click the '+' icon in the sidebar or use the keyboard shortcut 'Cmd/Ctrl + N'. You can then name your project and start adding files or chats."
        },
        {
            q: "Can I use Aura offline?",
            a: "Aura requires an internet connection for cloud-based models, but we offer local processing options for Pro users that allow for basic chat functionality without an active connection."
        },
        {
            q: "How do I export my data?",
            a: "You can export your chats and project data in Markdown or JSON format. Go to Settings > Data Controls and select 'Export Data' to generate a download link."
        },
        {
            q: "Is my data used for training?",
            a: "No, Aura Studio respects your privacy. We do not use your private chats or uploaded documents to train our base models unless you explicitly opt-in to our research program."
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--obsidian)] text-paper flex flex-col">
            {/* Header */}
            <header className="p-6 flex items-center justify-between border-b border-[var(--border-subtle)] sticky top-0 bg-[var(--obsidian)]/80 backdrop-blur-md z-30">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-txt-muted hover:text-paper transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className={`${fontSize.button} font-medium`}>Back</span>
                </button>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/contact-support')}
                        className={`${fontSize.link} font-semibold text-sage hover:underline`}
                    >
                        Contact Support
                    </button>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-txt-muted">Help Portal</span>
                </div>
            </header>

            <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${fontSize.title} mb-8`}
                    >
                        How can we help?
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative max-w-2xl mx-auto"
                    >
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-txt-muted" size={20} />
                        <input
                            type="text"
                            placeholder="Search for articles, guides, and more..."
                            className={`${fontSize.input} w-full bg-[var(--charcoal)] border border-[var(--border-medium)] rounded-[2rem] pl-14 pr-8 py-5 outline-none focus:border-sage/50 focus:ring-4 focus:ring-sage/5 transition-all shadow-xl`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </motion.div>
                </div>

                {/* Categories Grid */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2rem] bg-[var(--charcoal)] border border-[var(--border-medium)] hover:border-sage/30 hover:-translate-y-1 transition-all cursor-pointer group"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${cat.color} group-hover:scale-110 transition-transform`}>
                                <cat.icon size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                            <p className="text-sm text-txt-muted">{cat.count}</p>
                        </motion.div>
                    ))}
                </div> */}

                {/* FAQs Section */}
                <div className="max-w-3xl mx-auto mb-24">
                    <h2 className={`${fontSize.faq} mb-8 flex items-center gap-3`}>
                        <HelpCircle className="text-sage" /> Popular Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="rounded-2xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--overlay-subtle)]"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className={`${fontSize.faqAnswer} font-medium pr-8`}>{faq.q}</span>
                                    <ChevronDown 
                                        size={18} 
                                        className={`text-txt-muted transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} 
                                    />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`${fontSize.faqAnswer} p-6 pt-0 text-txt-secondary leading-relaxed border-t border-[var(--border-subtle)] bg-black/10`}>
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Support CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-12 rounded-[3rem] bg-gradient-to-br from-sage/10 via-obsidian to-sage/5 border border-sage/20 text-center relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MessageCircle size={120} />
                    </div>
                    <h2 className={`${fontSize.faq} mb-4`}>Still need help?</h2>
                    <p className={`${fontSize.text} text-txt-muted mb-8 max-w-md mx-auto`}>
                        Our support team is always ready to help you with anything you need.
                    </p>
                    <button 
                        onClick={() => navigate('/contact-support')}
                        className={`${fontSize.button} px-10 py-4 bg-sage text-obsidian font-bold rounded-2xl hover:scale-[1.05] active:scale-[0.95] transition-all shadow-xl shadow-sage/20`}
                    >
                        Chat with Support
                    </button>
                </motion.div>
            </main>

            <footer className="p-12 text-center text-txt-muted text-xs border-t border-[var(--border-subtle)]">
                {/* <div className="flex items-center justify-center gap-6 mb-6">
                    <span className="hover:text-paper cursor-pointer transition-colors">Documentation</span>
                    <span className="hover:text-paper cursor-pointer transition-colors">API Status</span>
                    <span className="hover:text-paper cursor-pointer transition-colors">Release Notes</span>
                </div> */}
                <p>&copy; 2026 Aura Studio. All rights reserved.</p>
            </footer>
        </div>
    );
}