import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  { title: 'Local-First', desc: 'Privacy-centric processing. Your data never leaves your machine unless you choose to share it.',
    icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> },
  { title: 'Version History', desc: 'Time-travel through every edit. Branch, compare, and restore any generation with a single click.',
    icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
  { title: 'Vector Search', desc: 'Semantic memory of all your chats. Find anything by meaning, not just keywords.',
    icon: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></> },
  { title: 'Multi-Modal', desc: 'Seamless domain switching. Text and vision share context, memory, and creative intent.',
    icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></> },
  { title: 'Custom Themes', desc: 'Dark, Light, and "Nord" palettes. Craft the environment that sparks your best thinking.',
    icon: <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></> },
  // { title: 'Developer API', desc: 'Full programmatic access. Build custom integrations, automate workflows, extend everything.',
  //   icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></> },
];

export default function BentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative py-20 md:py-32 lg:py-40" id="features" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium text-sage tracking-[0.15em] uppercase mb-5">the engine</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-paper tracking-tight">Built for Power Users</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-[20px] overflow-hidden">
          {features.map((feature, i) => (
            <motion.div key={feature.title} className="bg-obsidian p-8 lg:p-10 relative group hover:bg-white/[0.02] flex-grow basis-[100%] sm:basis-[calc(50%-1px)] lg:basis-[calc(33.333%-1px)] max-w-full transition-all duration-500"
              id={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div className="w-9 h-9 text-sage mb-5"
                whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">{feature.icon}</svg>
              </motion.div>
              <h3 className="font-sans text-base font-medium text-paper mb-2.5 group-hover:text-sage transition-colors duration-300">{feature.title}</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
