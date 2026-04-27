import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { number: '01', title: 'Upload & Parse',
    desc: 'Drop any complex document, UI mockup, or architecture diagram into the workspace. The engine instantly processes its complete visual and semantic structure.',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></> },
  { number: '02', title: 'Interrogate Data',
    desc: 'Ask complex reasoning questions that bridge visuals and text. Point to specific regions of an image to extract targeted, raw data.',
    icon: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></> },
  { number: '03', title: 'Extract Insights',
    desc: 'Instantly convert unstructured visual information into structured JSON schemas, summarize key metrics, and integrate findings into your database.',
    icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></> },
];

export default function Working() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative py-20 md:py-32 lg:py-40" id="working" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium text-sage tracking-[0.15em] uppercase mb-5">the bridge</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-paper mb-4 tracking-tight">Analytical Workflow</h2>
          <p className="text-base text-txt-secondary">Text and vision, working together to understand your data.</p>
        </motion.div>

        <div className="relative max-w-[1000px] mx-auto">
          {/* Subtle horizontal connecting line on desktop */}
          {/* <div className="hidden lg:block absolute top-[64px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[var(--border-medium)] to-transparent z-0" /> */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 relative z-10">
            {steps.map((step, i) => (
              <motion.div key={step.number} 
                className="relative p-8 rounded-3xl border border-[var(--border-subtle)] bg-obsidian hover:bg-slate/40 transition-all duration-500 overflow-hidden group shadow-2xl shadow-[var(--shadow-color)]"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                // transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
              >
                {/* Background Number */}
                <div className="absolute -top-6 -right-4 text-[120px] font-serif font-bold leading-none text-white/[0.015] group-hover:text-[var(--sage-glow)] transition-colors duration-500 pointer-events-none select-none">
                  {step.number}
                </div>
                
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[var(--overlay-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-sage mb-8 group-hover:scale-110 group-hover:bg-sage/[0.08] transition-all duration-500 relative z-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">{step.icon}</svg>
                </div>

                <div className="relative z-10">
                  <h3 className="font-sans text-lg lg:text-xl font-medium text-paper mb-3">{step.title}</h3>
                  <p className="text-sm text-txt-secondary leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
