import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Database, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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

    const sections = [
        {
            icon: Shield,
            title: "Data Protection",
            content: "We use industry-standard encryption and security protocols to ensure your data remains private and secure. Your personal information is stored on encrypted servers and is only accessible by authorized personnel."
        },
        {
            icon: Lock,
            title: "Access Control",
            content: "You have full control over your data. You can export, modify, or delete your account information at any time through your account settings. We do not sell your personal data to third parties."
        },
        {
            icon: Eye,
            title: "Transparency",
            content: "We are clear about what data we collect and why. We primarily collect usage data to improve our services and account information to provide you with a personalized experience."
        },
        {
            icon: Database,
            title: "Data Retention",
            content: "We only retain your data for as long as necessary to provide you with our services. If you choose to delete your account, all associated personal data will be permanently removed from our active databases."
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--obsidian)] text-paper flex flex-col">
            {/* Header */}
            <header className="p-6 flex items-center justify-between border-b border-[var(--border-subtle)] sticky top-0 bg-[var(--obsidian)]/80 backdrop-blur-md z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-txt-muted hover:text-paper transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className={`${fontSize.button} font-medium`}>Back</span>
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-txt-muted">Privacy Center</span>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20">
                        <Shield size={32} />
                    </div>
                    <h1 className={`${fontSize.title} mb-6`}>Privacy Policy</h1>
                    <div className={`${fontSize.button} flex flex-wrap items-center gap-4 text-txt-muted`}>
                        <span>Effective Date: April 25, 2026</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--border-medium)]" />
                        <span>Last Reviewed: Today</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--border-medium)]" />
                        <span className="text-blue-400 font-medium">GDPR Compliant</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-[var(--charcoal)] border border-[var(--border-medium)] hover:border-blue-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <section.icon size={24} />
                            </div>
                            <h2 className={`${fontSize.subtitle} font-semibold mb-4 text-paper`}>{section.title}</h2>
                            <p className={`${fontSize.text} text-txt-secondary leading-relaxed`}>
                                {section.content}
                            </p>
                        </motion.section>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-500/10 to-sage/10 border border-blue-500/20 rounded-[2.5rem] p-12 text-center"
                >
                    <Globe size={48} className="mx-auto mb-8 text-blue-400" />
                    <h2 className={`${fontSize.faq} mb-6`}>Your Privacy, Globally Protected</h2>
                    <p className={`${fontSize.text} text-txt-secondary max-w-2xl mx-auto mb-10`}>
                        Aura Studio adheres to international privacy standards, ensuring that no matter where you are located, your data is handled with the highest level of care and legal compliance.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => navigate('/contact-support')}
                            className={`${fontSize.button} px-8 py-4 bg-paper text-obsidian font-bold rounded-2xl hover:scale-[1.05] active:scale-[0.95] transition-all`}
                        >
                            Ask a Question
                        </button>
                    </div>
                </motion.div>
            </main>

            <footer className={`${fontSize.button} p-12 text-center text-txt-muted border-t border-[var(--border-subtle)] mt-auto`}>
                <p>Designed to protect your digital footprint. &copy; 2026 Aura Studio.</p>
            </footer>
        </div>
    );
}