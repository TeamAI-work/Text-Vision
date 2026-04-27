import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MessageSquare, Image, Sparkles, ArrowRight, Zap, Brain, Shield, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TransitionPage() {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);

    const models = [
        {
            id: "text",
            title: "Text Workspace",
            desc: "Optimized for deep analytical writing, coding, and creative storytelling.",
            icon: MessageSquare,
            accent: "#8BA88E",
            features: ["Advanced Reasoning", "Code Generation", "Document Analysis"],
            bg: "bg-gradient-to-br from-sage/30 via-sage/5 to-transparent",
            tag: "High Precision"
        },
        {
            id: "vision",
            title: "Vision Studio",
            desc: "Multi-modal intelligence that understands images, charts, and spatial data.",
            icon: Image,
            accent: "#a855f7",
            features: ["Visual Recognition", "Chart Extraction", "Scene Description"],
            bg: "bg-gradient-to-br from-purple-500/30 via-purple-500/5 to-transparent",
            tag: "Multi-Modal"
        }
    ];

    const handleSelect = async (id) => {
        setIsSelecting(true);
        localStorage.setItem("preferred_model", id);
        // Add a slight delay for the selecting animation
        await new Promise(resolve => setTimeout(resolve, 800));
        navigate("/chat");
    };

    return (
        <div className="min-h-screen bg-obsidian text-paper overflow-hidden flex flex-col relative">
            {/* Animated Background Beam */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-border-medium to-transparent opacity-20" />
                <motion.div 
                    animate={{ 
                        top: ["-100%", "200%"],
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[100px] bg-gradient-to-b from-transparent via-sage to-transparent"
                />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sage/20 blur-[140px] rounded-full" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[140px] rounded-full" 
                />
            </div>

            {/* Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <div className="max-w-7xl w-full">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-overlay-subtle border border-border-medium text-[11px] font-bold uppercase tracking-[0.3em] text-sage shadow-2xl backdrop-blur-md"
                        >
                            <Sparkles size={14} className="animate-pulse" /> Initialize Environment
                        </motion.div>
                        
                        <div className="space-y-4">
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl md:text-8xl font-serif leading-tight tracking-tight"
                            >
                                Define your <br />
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-paper via-paper/90 to-sage/40">Workflow.</span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-txt-muted max-w-2xl mx-auto text-xl font-light"
                            >
                                Seamlessly transition into a workspace tailored for your objectives. 
                                High-fidelity processing meets intuitive design.
                            </motion.p>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
                        {models.map((model, i) => (
                            <ModelCard 
                                key={model.id} 
                                model={model} 
                                index={i} 
                                isHovered={hoveredCard === model.id}
                                setHovered={() => setHoveredCard(model.id)}
                                clearHovered={() => setHoveredCard(null)}
                                onSelect={() => handleSelect(model.id)}
                                isSelecting={isSelecting}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer / Status */}
            <footer className="p-10 flex items-center justify-center relative z-10">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-12 text-[10px] uppercase tracking-[0.25em] text-txt-muted font-black"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_10px_#8BA88E]" />
                        Neural Link Established
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                        Ready for Deployment
                    </div>
                </motion.div>
            </footer>

            {/* Selection Overlay */}
            <AnimatePresence>
                {isSelecting && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-obsidian/80 backdrop-blur-xl flex items-center justify-center"
                    >
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="w-20 h-20 rounded-full border-4 border-sage/20 border-t-sage animate-spin" />
                            <h2 className="text-2xl font-serif tracking-widest uppercase">Calibrating Core</h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ModelCard({ model, index, isHovered, setHovered, clearHovered, onSelect, isSelecting }) {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        clearHovered();
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
                delay: 0.4 + index * 0.2, 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={setHovered}
            onMouseLeave={handleMouseLeave}
            onClick={onSelect}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative perspective-1000 group h-full"
        >
            <div 
                className={`relative h-full p-10 md:p-14 rounded-[3.5rem] border transition-all duration-700 overflow-hidden flex flex-col backdrop-blur-xl ${model.bg}
                    ${isHovered 
                        ? 'bg-overlay-medium border-border-medium shadow-[0_40px_80px_var(--shadow-color)]' 
                        : 'bg-overlay-subtle border-border-subtle shadow-none'}`}
                style={{ transform: "translateZ(50px)" }}
            >
                {/* Spotlight Background */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${model.accent}15, transparent 40%)`
                    }}
                />

                {/* Top Badge */}
                <div className="flex justify-between items-start mb-12">
                    <div className="w-20 h-20 rounded-3xl bg-overlay-subtle border border-border-subtle flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                        <model.icon size={40} style={{ color: model.accent }} />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase py-1.5 px-4 rounded-full border border-border-subtle bg-overlay-subtle text-txt-muted">
                        {model.tag}
                    </span>
                </div>

                {/* Content Area */}
                <div className="relative flex-1 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                        {model.title}
                    </h2>
                    
                    <p className="text-txt-muted text-lg leading-relaxed max-w-sm group-hover:text-paper transition-colors duration-500">
                        {model.desc}
                    </p>

                    <div className="pt-4 space-y-4">
                        {model.features.map((feature, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-4 text-sm text-txt-secondary"
                            >
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: model.accent }} />
                                {feature}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-12">
                    <div className={`w-full py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-700 flex items-center justify-center gap-4
                        ${isHovered 
                            ? 'bg-paper text-obsidian scale-[1.02]' 
                            : 'bg-overlay-subtle text-paper border border-border-subtle'}`}
                    >
                        {isHovered ? "Launch Workspace" : "Initialize"}
                        <Zap size={18} className={isHovered ? 'animate-bounce' : ''} />
                    </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Brain size={120} />
                </div>
            </div>

            {/* Outer Glow */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -inset-8 blur-[80px] rounded-full z-[-1] pointer-events-none"
                        style={{ background: `${model.accent}20` }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}