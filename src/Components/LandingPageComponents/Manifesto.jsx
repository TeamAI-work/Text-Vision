import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const borderHeight = useTransform(scrollYProgress, [0.2, 0.5], ['0%', '100%']);

  return (
    <section className="relative py-20 md:py-32 lg:py-40 bg-slate" id="manifesto" ref={ref}>
      <div className="manifesto-divider" />
      <div className="max-w-[640px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.p className="text-xs font-medium text-sage tracking-[0.15em] uppercase mb-8"
          initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >an engineer's note</motion.p>

        <div className="relative">
          <motion.div className="absolute left-0 top-0 w-[2px] bg-sage" style={{ height: borderHeight }} />

          <motion.blockquote className="font-serif text-xl md:text-2xl lg:text-3xl leading-snug text-paper pl-8 mb-8"
            initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Built on optimized LLM orchestration and Diffusion-based rendering.
            Every interaction is routed through a context-aware pipeline that
            selects the right model, the right parameters, and the right moment to act.
          </motion.blockquote>

          <motion.p className="text-base text-txt-secondary leading-relaxed pl-[34px]"
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            We don't believe in one-model-fits-all. Aura's architecture dynamically routes between
            specialized models — a reasoning engine for complex thought, a diffusion pipeline for
            visual creation, and a vector store for persistent memory.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
