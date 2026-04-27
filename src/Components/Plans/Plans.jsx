import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Zap, Sparkles, MessageSquare, Image, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Plans() {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState("monthly");

    const plans = [
        {
            id: "text",
            name: "Aura Core",
            price: billingCycle === "monthly" ? "0" : "0",
            desc: "The essential AI experience for thinkers and writers.",
            icon: MessageSquare,
            accent: "var(--sage)",
            features: [
                "Unlimited Text Model chats",
                "Advanced reasoning capabilities",
                "Code generation & debugging",
                "Basic document analysis",
                "Standard response speed",
                "Cloud-sync for 5 devices"
            ],
            buttonText: "Current Plan",
            isCurrent: true,
            premium: false
        },
        {
            id: "vision",
            name: "Aura Vision",
            price: billingCycle === "monthly" ? "20" : "190",
            desc: "The full potential of multi-modal intelligence.",
            icon: Sparkles,
            accent: "#6366f1",
            features: [
                "Everything in Aura Core",
                "Vision + Text multi-modal model",
                "High-res image analysis",
                "Chart & data extraction",
                "Priority high-speed responses",
                "Early access to new features",
                "Cloud-sync for unlimited devices",
                "Priority support channel"
            ],
            buttonText: "Upgrade to Vision",
            isCurrent: false,
            premium: true,
            tag: "Most Powerful"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--obsidian)] text-paper flex flex-col relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-sage/5 to-transparent pointer-events-none" />
            
            {/* Header */}
            <header className="p-6 flex items-center justify-between sticky top-0 bg-[var(--obsidian)]/80 backdrop-blur-md z-30 border-b border-[var(--border-subtle)]">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-txt-muted hover:text-paper transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back</span>
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-txt-muted">Membership Center</span>
                </div>
            </header>

            <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
                {/* Hero Section */}
                <div className="text-center mb-16 space-y-6">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif"
                    >
                        Choose your <span className="italic text-sage">Intelligence.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-txt-muted text-xl max-w-2xl mx-auto font-light"
                    >
                        Unlock more powerful models and specialized tools to accelerate your workflow.
                    </motion.p>

                    {/* Billing Toggle */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <span className={`text-sm ${billingCycle === 'monthly' ? 'text-paper' : 'text-txt-muted'}`}>Monthly</span>
                        <button 
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                            className="w-12 h-6 rounded-full bg-[var(--overlay-medium)] p-1 relative transition-colors border border-[var(--border-medium)]"
                        >
                            <motion.div 
                                animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                                className="w-4 h-4 rounded-full bg-sage shadow-sm"
                            />
                        </button>
                        <span className={`text-sm ${billingCycle === 'annual' ? 'text-paper' : 'text-txt-muted'}`}>
                            Annual <span className="text-sage text-[10px] ml-1 font-bold uppercase tracking-tighter">Save 20%</span>
                        </span>
                    </motion.div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className={`relative p-10 rounded-[3rem] border flex flex-col h-full overflow-hidden transition-all duration-500
                                ${plan.premium 
                                    ? 'bg-gradient-to-br from-indigo-500/[0.08] to-transparent border-indigo-500/30 shadow-[0_32px_64px_rgba(99,102,241,0.1)]' 
                                    : 'bg-[var(--charcoal)] border-[var(--border-medium)] shadow-2xl'}`}
                        >
                            {plan.tag && (
                                <div className="absolute top-0 right-0 p-8">
                                    <span className="bg-indigo-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20">
                                        {plan.tag}
                                    </span>
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6`}>
                                    <plan.icon size={28} style={{ color: plan.accent }} />
                                </div>
                                <h3 className="text-3xl font-serif mb-2">{plan.name}</h3>
                                <p className="text-txt-muted text-sm leading-relaxed">{plan.desc}</p>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-serif">${plan.price}</span>
                                    <span className="text-txt-muted text-sm font-sans">
                                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 mb-10">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-sm text-txt-secondary leading-tight">
                                        <div className="mt-0.5 p-0.5 rounded-full bg-sage/10 text-sage">
                                            <Check size={12} />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <button
                                disabled={plan.isCurrent}
                                className={`w-full py-5 rounded-[1.5rem] font-bold text-sm uppercase tracking-widest transition-all
                                    ${plan.isCurrent 
                                        ? 'bg-white/5 text-txt-muted border border-white/10 cursor-not-allowed' 
                                        : plan.premium 
                                            ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 active:scale-[0.98]' 
                                            : 'bg-paper text-obsidian hover:bg-white active:scale-[0.98]'}`}
                            >
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ / Trust Badges */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 w-full border-t border-[var(--border-subtle)] pt-16"
                >
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 mx-auto rounded-full bg-sage/10 text-sage flex items-center justify-center">
                            <Shield size={20} />
                        </div>
                        <h4 className="font-semibold">Secure Payments</h4>
                        <p className="text-xs text-txt-muted leading-relaxed">256-bit SSL encrypted transactions powered by Stripe.</p>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 mx-auto rounded-full bg-sage/10 text-sage flex items-center justify-center">
                            <Zap size={20} />
                        </div>
                        <h4 className="font-semibold">Instant Activation</h4>
                        <p className="text-xs text-txt-muted leading-relaxed">New features and models become available immediately.</p>
                    </div>
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 mx-auto rounded-full bg-sage/10 text-sage flex items-center justify-center">
                            <Globe size={20} />
                        </div>
                        <h4 className="font-semibold">Global Access</h4>
                        <p className="text-xs text-txt-muted leading-relaxed">Use your premium features anywhere in the world.</p>
                    </div>
                </motion.div>
            </main>

            <footer className="p-12 text-center text-txt-muted text-xs border-t border-[var(--border-subtle)]">
                <p>&copy; 2026 Aura Studio. All prices in USD. Tax may vary by region.</p>
            </footer>
        </div>
    );
}