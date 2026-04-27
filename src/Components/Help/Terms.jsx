import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, ShieldCheck, Scale, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
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
            icon: Scale,
            title: "1. Acceptance of Terms",
            content: "By accessing or using Aura Studio, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
        },
        {
            icon: FileText,
            title: "2. Use License",
            content: "Permission is granted to temporarily use the services provided by Aura Studio for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials."
        },
        {
            icon: ShieldCheck,
            title: "3. User Data & Privacy",
            content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you agree to the collection and use of information in accordance with our policy."
        },
        {
            icon: AlertCircle,
            title: "4. Limitations",
            content: "In no event shall Aura Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Aura Studio's website."
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-txt-muted">Legal Documentation</span>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className={`${fontSize.title} mb-6`}>Terms of Service</h1>
                    <div className={`${fontSize.button} flex items-center gap-4 text-txt-muted`}>
                        <span>Last Updated: April 25, 2026</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--border-medium)]" />
                        <span>Version 1.0.4</span>
                    </div>
                </motion.div>

                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-start gap-6">
                                <div className="mt-1 p-3 rounded-2xl bg-[var(--overlay-subtle)] text-sage border border-[var(--border-subtle)] group-hover:border-sage/30 transition-colors">
                                    <section.icon size={24} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className={`${fontSize.subtitle} font-semibold text-paper`}>{section.title}</h2>
                                    <p className={`${fontSize.text} text-txt-secondary leading-relaxed`}>
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-3xl bg-[var(--overlay-subtle)] border border-[var(--border-subtle)] text-center"
                >
                    <h3 className={`${fontSize.subtitle} font-medium mb-4`}>Have questions about our terms?</h3>
                    <p className={`${fontSize.text} text-txt-muted mb-6`}>If you have any questions regarding these terms, please contact our legal team.</p>
                    <button 
                        onClick={() => navigate('/contact-support')}
                        className={`${fontSize.button} px-8 py-3 bg-paper text-obsidian font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all`}
                    >
                        Contact Support
                    </button>
                </motion.div>
            </main>

            <footer className={`${fontSize.button} p-12 text-center text-txt-muted border-t border-[var(--border-subtle)]`}>
                <p>&copy; 2026 Aura Studio. All rights reserved. Aura and the Aura logo are trademarks of Aura Studio.</p>
            </footer>
        </div>
    );
}